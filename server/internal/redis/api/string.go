package api

import (
	"context"
	"fmt"
	"mayfly-go/internal/redis/api/form"
	"mayfly-go/pkg/biz"
	"mayfly-go/pkg/ginx"
	"mayfly-go/pkg/req"
	"mayfly-go/pkg/utils/stringx"
	"time"
)

func (r *Redis) GetStringValue(rc *req.Ctx) {
	ri, key := r.checkKeyAndGetRedisIns(rc)
	str, err := ri.GetCmdable().Get(context.TODO(), key).Result()
	biz.ErrIsNilAppendErr(err, "获取字符串值失败: %s")
	rc.ResData = str
}

func (r *Redis) SetStringValue(rc *req.Ctx) {
	g := rc.GinCtx
	keyValue := new(form.StringValue)
	ginx.BindJsonAndValid(g, keyValue)

	ri := r.getRedisIns(rc)
	cmd := ri.GetCmdable()
	rc.ReqParam = fmt.Sprintf("%s -> %s", ri.Info.GetLogDesc(), stringx.AnyToStr(keyValue))

	str, err := cmd.Set(context.TODO(), keyValue.Key, keyValue.Value, time.Second*time.Duration(keyValue.Timed)).Result()
	biz.ErrIsNilAppendErr(err, "保存字符串值失败: %s")
	rc.ResData = str
}
