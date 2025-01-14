package api

import (
	"mayfly-go/internal/sys/api/form"
	"mayfly-go/internal/sys/application"
	"mayfly-go/internal/sys/domain/entity"
	"mayfly-go/pkg/biz"
	"mayfly-go/pkg/ginx"
	"mayfly-go/pkg/req"
)

type Config struct {
	ConfigApp application.Config
}

func (c *Config) Configs(rc *req.Ctx) {
	g := rc.GinCtx
	condition := &entity.Config{Key: g.Query("key")}
	rc.ResData = c.ConfigApp.GetPageList(condition, ginx.GetPageParam(g), new([]entity.Config))
}

func (c *Config) GetConfigValueByKey(rc *req.Ctx) {
	key := rc.GinCtx.Query("key")
	biz.NotEmpty(key, "key不能为空")
	rc.ResData = c.ConfigApp.GetConfig(key).Value
}

func (c *Config) SaveConfig(rc *req.Ctx) {
	form := &form.ConfigForm{}
	config := ginx.BindJsonAndCopyTo(rc.GinCtx, form, new(entity.Config))
	rc.ReqParam = form
	config.SetBaseInfo(rc.LoginAccount)
	c.ConfigApp.Save(config)
}
