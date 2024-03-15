package persistence

import (
	"mayfly-go/internal/db/domain/entity"
	"mayfly-go/internal/db/domain/repository"
	"mayfly-go/pkg/base"
	"mayfly-go/pkg/gormx"
	"mayfly-go/pkg/model"
)

type dbTransferTaskRepoImpl struct {
	base.RepoImpl[*entity.DbTransferTask]
}

func newDbTransferTaskRepo() repository.DbTransferTask {
	return &dbTransferTaskRepoImpl{base.RepoImpl[*entity.DbTransferTask]{M: new(entity.DbTransferTask)}}
}

// 分页获取数据库信息列表
func (d *dbTransferTaskRepoImpl) GetTaskList(condition *entity.DbTransferTaskQuery, pageParam *model.PageParam, toEntity any, orderBy ...string) (*model.PageResult[any], error) {
	qd := gormx.NewQuery(new(entity.DbTransferTask))
	//Like("task_name", condition.Name).
	//Eq("status", condition.Status)
	return gormx.PageQuery(qd, pageParam, toEntity)
}

type dbTransferLogRepoImpl struct {
	base.RepoImpl[*entity.DbTransferLog]
}

// 分页获取数据库信息列表
func (d *dbTransferLogRepoImpl) GetTaskLogList(condition *entity.DbTransferLogQuery, pageParam *model.PageParam, toEntity any, orderBy ...string) (*model.PageResult[any], error) {
	qd := gormx.NewQuery(new(entity.DbTransferLog)).
		Eq("task_id", condition.TaskId)
	return gormx.PageQuery(qd, pageParam, toEntity)
}

func newDbTransferLogRepo() repository.DbTransferLog {
	return &dbTransferLogRepoImpl{base.RepoImpl[*entity.DbTransferLog]{M: new(entity.DbTransferLog)}}
}
