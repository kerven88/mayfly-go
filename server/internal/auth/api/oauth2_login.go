package api

import (
	"encoding/json"
	"fmt"
	"io"
	"mayfly-go/internal/auth/api/vo"
	"mayfly-go/internal/auth/application"
	"mayfly-go/internal/auth/domain/entity"
	msgapp "mayfly-go/internal/msg/application"
	sysapp "mayfly-go/internal/sys/application"
	sysentity "mayfly-go/internal/sys/domain/entity"
	"mayfly-go/pkg/biz"
	"mayfly-go/pkg/cache"
	"mayfly-go/pkg/model"
	"mayfly-go/pkg/req"
	"mayfly-go/pkg/utils/jsonx"
	"mayfly-go/pkg/utils/stringx"
	"net/http"
	"strconv"
	"strings"
	"time"

	"golang.org/x/oauth2"
)

type Oauth2Login struct {
	Oauth2App  application.Oauth2
	ConfigApp  sysapp.Config
	AccountApp sysapp.Account
	MsgApp     msgapp.Msg
}

func (a *Oauth2Login) OAuth2Login(rc *req.Ctx) {
	client, _ := a.getOAuthClient()
	state := stringx.Rand(32)
	cache.SetStr("oauth2:state:"+state, "login", 5*time.Minute)
	rc.GinCtx.Redirect(http.StatusFound, client.AuthCodeURL(state))
}

func (a *Oauth2Login) OAuth2Bind(rc *req.Ctx) {
	client, _ := a.getOAuthClient()
	state := stringx.Rand(32)
	cache.SetStr("oauth2:state:"+state, "bind:"+strconv.FormatUint(rc.LoginAccount.Id, 10),
		5*time.Minute)
	rc.GinCtx.Redirect(http.StatusFound, client.AuthCodeURL(state))
}

func (a *Oauth2Login) OAuth2Callback(rc *req.Ctx) {
	client, oauth := a.getOAuthClient()

	code := rc.GinCtx.Query("code")
	biz.NotEmpty(code, "code不能为空")

	state := rc.GinCtx.Query("state")
	biz.NotEmpty(state, "state不能为空")

	stateAction := cache.GetStr("oauth2:state:" + state)
	biz.NotEmpty(stateAction, "state已过期, 请重新登录")

	token, err := client.Exchange(rc.GinCtx, code)
	biz.ErrIsNilAppendErr(err, "获取token失败: %s")

	// 获取用户信息
	httpCli := client.Client(rc.GinCtx.Request.Context(), token)
	resp, err := httpCli.Get(oauth.ResourceURL)
	biz.ErrIsNilAppendErr(err, "获取用户信息失败: %s")
	defer resp.Body.Close()

	b, err := io.ReadAll(resp.Body)
	biz.ErrIsNilAppendErr(err, "读取响应的用户信息失败: %s")

	// UserIdentifier格式为 type:fieldPath。如：string:user.username 或 number:user.id
	userIdTypeAndFieldPath := strings.Split(oauth.UserIdentifier, ":")
	biz.IsTrue(len(userIdTypeAndFieldPath) == 2, "oauth2配置属性'UserIdentifier'不符合规则")

	// 解析用户唯一标识
	userIdFieldPath := userIdTypeAndFieldPath[1]
	userId := ""
	if userIdTypeAndFieldPath[0] == "string" {
		userId, err = jsonx.GetStringByBytes(b, userIdFieldPath)
		biz.ErrIsNilAppendErr(err, "解析用户唯一标识失败: %s")
	} else {
		intUserId, err := jsonx.GetIntByBytes(b, userIdFieldPath)
		biz.ErrIsNilAppendErr(err, "解析用户唯一标识失败: %s")
		userId = fmt.Sprintf("%d", intUserId)
	}
	biz.NotBlank(userId, "用户唯一标识字段值不能为空")

	// 判断是登录还是绑定
	if stateAction == "login" {
		a.doLoginAction(rc, userId, oauth)
	} else if sAccountId, ok := strings.CutPrefix(stateAction, "bind:"); ok {
		// 绑定
		accountId, err := strconv.ParseUint(sAccountId, 10, 64)
		biz.ErrIsNilAppendErr(err, "绑定用户失败: %s")

		account := new(sysentity.Account)
		account.Id = accountId
		err = a.AccountApp.GetAccount(account, "username")
		biz.ErrIsNilAppendErr(err, "该账号不存在")
		rc.ReqParam = fmt.Sprintf("oauth2 bind username: %s", account.Username)

		err = a.Oauth2App.GetOAuthAccount(&entity.Oauth2Account{
			AccountId: accountId,
		}, "account_id", "identity")
		biz.IsTrue(err != nil, "该账号已被绑定")

		now := time.Now()
		err = a.Oauth2App.BindOAuthAccount(&entity.Oauth2Account{
			AccountId:  accountId,
			Identity:   userId,
			CreateTime: &now,
			UpdateTime: &now,
		})
		biz.ErrIsNilAppendErr(err, "绑定用户失败: %s")
		res := map[string]any{
			"action": "oauthBind",
			"bind":   true,
		}
		b, err = json.Marshal(res)
		biz.ErrIsNil(err, "数据序列化失败")
		rc.GinCtx.Header("Content-Type", "text/html; charset=utf-8")
		rc.GinCtx.Writer.WriteHeader(http.StatusOK)
		_, _ = rc.GinCtx.Writer.WriteString("<html>" +
			"<script>top.opener.postMessage(" + string(b) + ")</script>" +
			"</html>")
	} else {
		panic(biz.NewBizErr("state不合法"))
	}
}

// 指定登录操作
func (a *Oauth2Login) doLoginAction(rc *req.Ctx, userId string, oauth *sysentity.ConfigOauth2Login) {
	clientIp := getIpAndRegion(rc)
	rc.ReqParam = fmt.Sprintf("oauth2 login username: %s | ip: %s", userId, clientIp)

	// 查询用户是否存在
	oauthAccount := &entity.Oauth2Account{Identity: userId}
	err := a.Oauth2App.GetOAuthAccount(oauthAccount, "account_id", "identity")

	var accountId uint64
	// 不存在,进行注册
	if err != nil {
		biz.IsTrue(oauth.AutoRegister, "系统未开启自动注册, 请先让管理员添加对应账号")
		now := time.Now()
		account := &sysentity.Account{
			Model: model.Model{
				CreateTime: &now,
				CreatorId:  0,
				Creator:    "oauth2",
				UpdateTime: &now,
			},
			Name:     userId,
			Username: userId,
		}
		a.AccountApp.Create(account)
		// 绑定
		err := a.Oauth2App.BindOAuthAccount(&entity.Oauth2Account{
			AccountId:  account.Id,
			Identity:   oauthAccount.Identity,
			CreateTime: &now,
			UpdateTime: &now,
		})
		biz.ErrIsNilAppendErr(err, "绑定用户失败: %s")
		accountId = account.Id
	} else {
		accountId = oauthAccount.AccountId
	}

	// 进行登录
	account := &sysentity.Account{
		Model: model.Model{DeletedModel: model.DeletedModel{Id: accountId}},
	}
	err = a.AccountApp.GetAccount(account, "Id", "Name", "Username", "Password", "Status", "LastLoginTime", "LastLoginIp", "OtpSecret")
	biz.ErrIsNilAppendErr(err, "获取用户信息失败: %s")

	res := LastLoginCheck(account, a.ConfigApp.GetConfig(sysentity.ConfigKeyAccountLoginSecurity).ToAccountLoginSecurity(), clientIp)
	res["action"] = "oauthLogin"
	b, err := json.Marshal(res)
	biz.ErrIsNil(err, "数据序列化失败")
	rc.GinCtx.Header("Content-Type", "text/html; charset=utf-8")
	rc.GinCtx.Writer.WriteHeader(http.StatusOK)
	_, _ = rc.GinCtx.Writer.WriteString("<html>" +
		"<script>top.opener.postMessage(" + string(b) + ")</script>" +
		"</html>")
}

func (a *Oauth2Login) getOAuthClient() (*oauth2.Config, *sysentity.ConfigOauth2Login) {
	oath2LoginConfig := a.ConfigApp.GetConfig(sysentity.ConfigKeyOauth2Login).ToOauth2Login()
	biz.IsTrue(oath2LoginConfig.Enable, "请先配置oauth2或启用oauth2登录")
	biz.IsTrue(oath2LoginConfig.ClientId != "", "oauth2 clientId不能为空")

	client := &oauth2.Config{
		ClientID:     oath2LoginConfig.ClientId,
		ClientSecret: oath2LoginConfig.ClientSecret,
		Endpoint: oauth2.Endpoint{
			AuthURL:  oath2LoginConfig.AuthorizationURL,
			TokenURL: oath2LoginConfig.AccessTokenURL,
		},
		RedirectURL: oath2LoginConfig.RedirectURL + "/api/auth/oauth2/callback",
		Scopes:      strings.Split(oath2LoginConfig.Scopes, ","),
	}
	return client, oath2LoginConfig
}

func (a *Oauth2Login) Oauth2Status(ctx *req.Ctx) {
	res := &vo.Oauth2Status{}
	oauth2LoginConfig := a.ConfigApp.GetConfig(sysentity.ConfigKeyOauth2Login).ToOauth2Login()
	res.Enable = oauth2LoginConfig.Enable
	if res.Enable {
		err := a.Oauth2App.GetOAuthAccount(&entity.Oauth2Account{
			AccountId: ctx.LoginAccount.Id,
		}, "account_id", "identity")
		res.Bind = err == nil
	}

	ctx.ResData = res
}