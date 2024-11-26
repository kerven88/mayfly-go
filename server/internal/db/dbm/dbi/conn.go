package dbi

import (
	"context"
	"database/sql"
	"fmt"
	"mayfly-go/internal/machine/mcm"
	"mayfly-go/pkg/errorx"
	"mayfly-go/pkg/logx"
)

// 游标遍历查询结果集处理函数
type WalkQueryRowsFunc func(row map[string]any, columns []*QueryColumn) error

// db实例连接信息
type DbConn struct {
	Id   string
	Info *DbInfo

	db *sql.DB
}

// 执行数据库查询返回的列信息
type QueryColumn struct {
	Name string `json:"name"` // 列名
	Type string `json:"type"` // 类型

	SqlColType *sql.ColumnType `json:"-"`
}

func NewQueryColumn(colName string, col *sql.ColumnType) *QueryColumn {
	return &QueryColumn{
		Name:       col.Name(),
		Type:       col.DatabaseTypeName(),
		SqlColType: col,
	}
}

func (d *DbConn) GetDb() *sql.DB {
	return d.db
}

// 执行查询语句
// 依次返回 列信息数组(顺序)，结果map，错误
func (d *DbConn) Query(querySql string, args ...any) ([]*QueryColumn, []map[string]any, error) {
	return d.QueryContext(context.Background(), querySql, args...)
}

// 执行查询语句
// 依次返回 列信息数组(顺序)，结果map，错误
func (d *DbConn) QueryContext(ctx context.Context, querySql string, args ...any) ([]*QueryColumn, []map[string]any, error) {
	result := make([]map[string]any, 0, 16)
	cols, err := d.WalkQueryRows(ctx, querySql, func(row map[string]any, columns []*QueryColumn) error {
		result = append(result, row)
		return nil
	}, args...)

	if err != nil {
		return nil, nil, wrapSqlError(err)
	}

	return cols, result, nil
}

// 将查询结果映射至struct，可具体参考sqlx库
func (d *DbConn) Query2Struct(execSql string, dest any) error {
	rows, err := d.db.Query(execSql)
	if err != nil {
		return err
	}
	// rows对象一定要close掉，如果出错，不关掉则会很迅速的达到设置最大连接数，
	// 后面的链接过来直接报错或拒绝，实际上也没有起效果
	defer func() {
		if rows != nil {
			rows.Close()
		}
	}()
	return scanAll(rows, dest, false)
}

// WalkQueryRows 游标方式遍历查询结果集, walkFn返回error不为nil, 则跳出遍历并取消查询
func (d *DbConn) WalkQueryRows(ctx context.Context, querySql string, walkFn WalkQueryRowsFunc, args ...any) ([]*QueryColumn, error) {
	return walkQueryRows(ctx, d.GetDialect(), d.db, querySql, walkFn, args...)
}

// WalkTableRows 游标方式遍历指定表的结果集, walkFn返回error不为nil, 则跳出遍历并取消查询
func (d *DbConn) WalkTableRows(ctx context.Context, tableName string, walkFn WalkQueryRowsFunc) ([]*QueryColumn, error) {
	return d.WalkQueryRows(ctx, fmt.Sprintf("SELECT * FROM %s", tableName), walkFn)
}

// 执行 update, insert, delete，建表等sql
// 返回影响条数和错误
func (d *DbConn) Exec(sql string, args ...any) (int64, error) {
	return d.ExecContext(context.Background(), sql, args...)
}

// 事务执行 update, insert, delete，建表等sql，若tx == nil，则不使用事务
// 返回影响条数和错误
func (d *DbConn) TxExec(tx *sql.Tx, execSql string, args ...any) (int64, error) {
	return d.TxExecContext(context.Background(), tx, execSql, args...)
}

// 执行 update, insert, delete，建表等sql
// 返回影响条数和错误
func (d *DbConn) ExecContext(ctx context.Context, execSql string, args ...any) (int64, error) {
	return d.TxExecContext(ctx, nil, execSql, args...)
}

// 事务执行 update, insert, delete，建表等sql，若tx == nil，则不适用事务
// 返回影响条数和错误
func (d *DbConn) TxExecContext(ctx context.Context, tx *sql.Tx, execSql string, args ...any) (int64, error) {
	var res sql.Result
	var err error
	if tx != nil {
		res, err = tx.ExecContext(ctx, execSql, args...)
	} else {
		res, err = d.db.ExecContext(ctx, execSql, args...)
	}

	if err != nil {
		return 0, wrapSqlError(err)
	}
	return res.RowsAffected()
}

// Begin 开启事务
func (d *DbConn) Begin() (*sql.Tx, error) {
	return d.db.Begin()
}

// GetDialect 获取数据库dialect实现接口
func (d *DbConn) GetDialect() Dialect {
	return d.Info.Meta.GetDialect(d)
}

// GetMetadata 获取数据库MetaData
func (d *DbConn) GetMetadata() Metadata {
	return d.Info.Meta.GetMetadata(d)
}

// Stats 返回数据库连接状态
func (d *DbConn) Stats(ctx context.Context, execSql string, args ...any) sql.DBStats {
	return d.db.Stats()
}

// 关闭连接
func (d *DbConn) Close() {
	if d.db != nil {
		if err := d.db.Close(); err != nil {
			logx.Errorf("关闭数据库实例[%s]连接失败: %s", d.Id, err.Error())
		}
		// 如果是达梦并且使用了ssh隧道，则需要手动将其关闭
		if d.Info.Type == DbTypeDM && d.Info.SshTunnelMachineId > 0 {
			mcm.CloseSshTunnelMachine(d.Info.SshTunnelMachineId, fmt.Sprintf("db:%d", d.Info.Id))
		}
		d.db = nil
	}
}

// 游标方式遍历查询rows, walkFn error不为nil, 则跳出遍历
func walkQueryRows(ctx context.Context, dialect Dialect, db *sql.DB, selectSql string, walkFn WalkQueryRowsFunc, args ...any) ([]*QueryColumn, error) {
	cancelCtx, cancelFunc := context.WithCancel(ctx)
	defer cancelFunc()

	rows, err := db.QueryContext(cancelCtx, selectSql, args...)
	if err != nil {
		return nil, err
	}
	// rows对象一定要close掉，如果出错，不关掉则会很迅速的达到设置最大连接数，
	// 后面的链接过来直接报错或拒绝，实际上也没有起效果
	defer rows.Close()

	columnHelper := dialect.GetColumnHelper()

	colTypes, err := rows.ColumnTypes()
	if err != nil {
		return nil, err
	}
	lenCols := len(colTypes)
	// 列名用于前端表头名称按照数据库与查询字段顺序显示
	cols := make([]*QueryColumn, lenCols)
	// 这里表示一行填充数据
	scans := make([]any, lenCols)
	// 这里表示一行所有列的值，用[]byte表示
	for k, colType := range colTypes {
		// 处理字段名，如果为空，则命名为匿名列
		colName := colType.Name()
		if colName == "" {
			colName = fmt.Sprintf("<anonymous%d>", k+1)
		}
		qc := NewQueryColumn(colName, colType)
		cols[k] = qc
		scans[k] = columnHelper.GetScanDestPtr(qc)
	}

	for rows.Next() {
		// 不Scan也会导致等待，该链接实际处于未工作的状态，然后也会导致连接数迅速达到最大
		if err := rows.Scan(scans...); err != nil {
			return cols, err
		}
		// 每行数据
		rowData := make(map[string]any, lenCols)
		// 把values中的数据复制到row中
		for i, v := range scans {
			rowData[cols[i].Name] = columnHelper.ConvertScanDestValue(v, cols[i])
		}
		if err = walkFn(rowData, cols); err != nil {
			logx.ErrorfContext(ctx, "[%s] cursor traversal query result set error, exit traversal: %s", selectSql, err.Error())
			cancelFunc()
			return cols, err
		}
	}

	return cols, nil
}

// 包装sql执行相关错误
func wrapSqlError(err error) error {
	if err == context.Canceled {
		return errorx.NewBiz("execution cancel")
	}
	if err == context.DeadlineExceeded {
		return errorx.NewBiz("execution timeout")
	}
	return err
}
