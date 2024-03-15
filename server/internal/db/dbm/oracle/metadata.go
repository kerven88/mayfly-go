package oracle

import (
	"fmt"
	"mayfly-go/internal/db/dbm/dbi"
	"mayfly-go/pkg/errorx"
	"mayfly-go/pkg/utils/anyx"
	"mayfly-go/pkg/utils/collx"
	"regexp"
	"strings"
	"time"
)

// ---------------------------------- DM元数据 -----------------------------------
const (
	ORACLE_META_FILE               = "metasql/oracle_meta.sql"
	ORACLE_DB_SCHEMAS              = "ORACLE_DB_SCHEMAS"
	ORACLE_TABLE_INFO_KEY          = "ORACLE_TABLE_INFO"
	ORACLE_TABLE_INFO_BY_NAMES_KEY = "ORACLE_TABLE_INFO_BY_NAMES"
	ORACLE_INDEX_INFO_KEY          = "ORACLE_INDEX_INFO"
	ORACLE_COLUMN_MA_KEY           = "ORACLE_COLUMN_MA"
)

type OracleMetaData struct {
	dbi.DefaultMetaData

	dc *dbi.DbConn
}

func (od *OracleMetaData) GetDbServer() (*dbi.DbServer, error) {
	_, res, err := od.dc.Query("select * from v$instance")
	if err != nil {
		return nil, err
	}
	ds := &dbi.DbServer{
		Version: anyx.ConvString(res[0]["VERSION"]),
	}
	return ds, nil
}

func (od *OracleMetaData) GetDbNames() ([]string, error) {
	_, res, err := od.dc.Query("SELECT name AS DBNAME FROM v$database")
	if err != nil {
		return nil, err
	}

	databases := make([]string, 0)
	for _, re := range res {
		databases = append(databases, anyx.ConvString(re["DBNAME"]))
	}

	return databases, nil
}

func (od *OracleMetaData) GetTables(tableNames ...string) ([]dbi.Table, error) {
	meta := od.dc.GetMetaData()
	names := strings.Join(collx.ArrayMap[string, string](tableNames, func(val string) string {
		return fmt.Sprintf("'%s'", meta.RemoveQuote(val))
	}), ",")

	var res []map[string]any
	var err error

	if tableNames != nil || len(tableNames) > 0 {
		_, res, err = od.dc.Query(fmt.Sprintf(dbi.GetLocalSql(ORACLE_META_FILE, ORACLE_TABLE_INFO_BY_NAMES_KEY), names))
	} else {
		_, res, err = od.dc.Query(dbi.GetLocalSql(ORACLE_META_FILE, ORACLE_TABLE_INFO_KEY))
	}
	if err != nil {
		return nil, err
	}

	tables := make([]dbi.Table, 0)
	for _, re := range res {
		tables = append(tables, dbi.Table{
			TableName:    anyx.ConvString(re["TABLE_NAME"]),
			TableComment: anyx.ConvString(re["TABLE_COMMENT"]),
			CreateTime:   anyx.ConvString(re["CREATE_TIME"]),
			TableRows:    anyx.ConvInt(re["TABLE_ROWS"]),
			DataLength:   anyx.ConvInt64(re["DATA_LENGTH"]),
			IndexLength:  anyx.ConvInt64(re["INDEX_LENGTH"]),
		})
	}
	return tables, nil
}

// 获取列元信息, 如列名等
func (od *OracleMetaData) GetColumns(tableNames ...string) ([]dbi.Column, error) {
	meta := od.dc.GetMetaData()
	tableName := strings.Join(collx.ArrayMap[string, string](tableNames, func(val string) string {
		return fmt.Sprintf("'%s'", meta.RemoveQuote(val))
	}), ",")

	// 如果表数量超过了1000，需要分批查询
	if len(tableNames) > 1000 {
		columns := make([]dbi.Column, 0)
		for i := 0; i < len(tableNames); i += 1000 {
			end := i + 1000
			if end > len(tableNames) {
				end = len(tableNames)
			}
			tables := tableNames[i:end]
			cols, err := od.GetColumns(tables...)
			if err != nil {
				return nil, err
			}
			columns = append(columns, cols...)
		}
		return columns, nil
	}

	_, res, err := od.dc.Query(fmt.Sprintf(dbi.GetLocalSql(ORACLE_META_FILE, ORACLE_COLUMN_MA_KEY), tableName))
	if err != nil {
		return nil, err
	}

	columns := make([]dbi.Column, 0)
	for _, re := range res {
		defaultVal := anyx.ConvString(re["COLUMN_DEFAULT"])
		// 如果默认值包含.nextval，说明是序列，默认值为null
		if strings.Contains(defaultVal, ".nextval") {
			defaultVal = ""
		}
		columns = append(columns, dbi.Column{
			TableName:     anyx.ConvString(re["TABLE_NAME"]),
			ColumnName:    anyx.ConvString(re["COLUMN_NAME"]),
			ColumnType:    anyx.ConvString(re["COLUMN_TYPE"]),
			ColumnComment: anyx.ConvString(re["COLUMN_COMMENT"]),
			Nullable:      anyx.ConvString(re["NULLABLE"]),
			IsPrimaryKey:  anyx.ConvInt(re["IS_PRIMARY_KEY"]) == 1,
			IsIdentity:    anyx.ConvInt(re["IS_IDENTITY"]) == 1,
			ColumnDefault: defaultVal,
			NumScale:      anyx.ConvString(re["NUM_SCALE"]),
		})
	}
	return columns, nil
}

func (od *OracleMetaData) GetPrimaryKey(tablename string) (string, error) {
	columns, err := od.GetColumns(tablename)
	if err != nil {
		return "", err
	}
	if len(columns) == 0 {
		return "", errorx.NewBiz("[%s] 表不存在", tablename)
	}
	for _, v := range columns {
		if v.IsPrimaryKey {
			return v.ColumnName, nil
		}
	}

	return columns[0].ColumnName, nil
}

// 获取表索引信息
func (od *OracleMetaData) GetTableIndex(tableName string) ([]dbi.Index, error) {
	_, res, err := od.dc.Query(fmt.Sprintf(dbi.GetLocalSql(ORACLE_META_FILE, ORACLE_INDEX_INFO_KEY), tableName))
	if err != nil {
		return nil, err
	}

	indexs := make([]dbi.Index, 0)
	for _, re := range res {
		indexs = append(indexs, dbi.Index{
			IndexName:    anyx.ConvString(re["INDEX_NAME"]),
			ColumnName:   anyx.ConvString(re["COLUMN_NAME"]),
			IndexType:    anyx.ConvString(re["INDEX_TYPE"]),
			IndexComment: anyx.ConvString(re["INDEX_COMMENT"]),
			IsUnique:     anyx.ConvInt(re["IS_UNIQUE"]) == 1,
			SeqInIndex:   anyx.ConvInt(re["SEQ_IN_INDEX"]),
		})
	}
	// 把查询结果以索引名分组，索引字段以逗号连接
	result := make([]dbi.Index, 0)
	key := ""
	for _, v := range indexs {
		// 当前的索引名
		in := v.IndexName
		if key == in {
			// 索引字段已根据名称和顺序排序，故取最后一个即可
			i := len(result) - 1
			// 同索引字段以逗号连接
			result[i].ColumnName = result[i].ColumnName + "," + v.ColumnName
		} else {
			key = in
			result = append(result, v)
		}
	}
	return result, nil
}

// 获取建表ddl
func (od *OracleMetaData) GetTableDDL(tableName string) (string, error) {
	ddlSql := fmt.Sprintf("SELECT DBMS_METADATA.GET_DDL('TABLE', '%s', (SELECT sys_context('USERENV', 'CURRENT_SCHEMA') FROM dual)) AS TABLE_DDL FROM DUAL", tableName)
	_, res, err := od.dc.Query(ddlSql)
	if err != nil {
		return "", err
	}
	// 建表ddl
	var builder strings.Builder
	for _, re := range res {
		builder.WriteString(anyx.ConvString(re["TABLE_DDL"]))
	}

	// 表注释
	_, res, err = od.dc.Query(fmt.Sprintf(`
			select OWNER, COMMENTS from ALL_TAB_COMMENTS where TABLE_TYPE='TABLE' and TABLE_NAME = '%s'
		    and owner = (SELECT sys_context('USERENV', 'CURRENT_SCHEMA') FROM dual) `, tableName))
	if err != nil {
		return "", err
	}
	for _, re := range res {
		// COMMENT ON TABLE "SYS_MENU" IS '菜单表';
		if re["COMMENTS"] != nil {
			tableComment := fmt.Sprintf("\n\nCOMMENT ON TABLE \"%s\".\"%s\" IS '%s';", re["OWNER"].(string), tableName, re["COMMENTS"].(string))
			builder.WriteString(tableComment)
		}
	}

	// 字段注释
	fieldSql := fmt.Sprintf(`
		SELECT OWNER, COLUMN_NAME, COMMENTS
		FROM ALL_COL_COMMENTS
		WHERE OWNER = (SELECT sys_context('USERENV', 'CURRENT_SCHEMA') FROM dual)
		  AND TABLE_NAME = '%s'
		`, tableName)
	_, res, err = od.dc.Query(fieldSql)
	if err != nil {
		return "", err
	}

	builder.WriteString("\n")
	for _, re := range res {
		// COMMENT ON COLUMN "SYS_MENU"."BIZ_CODE" IS '业务编码，应用编码1';
		if re["COMMENTS"] != nil {
			fieldComment := fmt.Sprintf("\nCOMMENT ON COLUMN \"%s\".\"%s\".\"%s\" IS '%s';", re["OWNER"].(string), tableName, re["COLUMN_NAME"].(string), re["COMMENTS"].(string))
			builder.WriteString(fieldComment)
		}
	}

	// 索引信息
	indexSql := fmt.Sprintf(`
		select DBMS_METADATA.GET_DDL('INDEX', a.INDEX_NAME, a.OWNER) AS INDEX_DEF from ALL_INDEXES a
		join ALL_objects b on a.owner = b.owner and b.object_name = a.index_name and b.object_type = 'INDEX'
		where a.owner = (SELECT sys_context('USERENV', 'CURRENT_SCHEMA') FROM dual)
		and a.table_name = '%s' 
	`, tableName)
	_, res, err = od.dc.Query(indexSql)
	if err != nil {
		return "", err
	}
	for _, re := range res {
		builder.WriteString("\n\n" + anyx.ConvString(re["INDEX_DEF"]))
	}

	return builder.String(), nil
}

// 获取DM当前连接的库可访问的schemaNames
func (od *OracleMetaData) GetSchemas() ([]string, error) {
	sql := dbi.GetLocalSql(ORACLE_META_FILE, ORACLE_DB_SCHEMAS)
	_, res, err := od.dc.Query(sql)
	if err != nil {
		return nil, err
	}
	schemaNames := make([]string, 0)
	for _, re := range res {
		schemaNames = append(schemaNames, anyx.ConvString(re["USERNAME"]))
	}
	return schemaNames, nil
}

func (od *OracleMetaData) GetDataConverter() dbi.DataConverter {
	return converter
}

var (
	// 数字类型
	numberTypeRegexp = regexp.MustCompile(`(?i)int|double|float|number|decimal|byte|bit`)
	// 日期时间类型
	datetimeTypeRegexp = regexp.MustCompile(`(?i)date|timestamp`)

	bracketsRegexp = regexp.MustCompile(`\((\d+)\)`)

	converter = new(DataConverter)

	// oracle数据类型 映射 公共数据类型
	commonColumnTypeMap = map[string]string{
		"CHAR":          dbi.CommonTypeChar,
		"NCHAR":         dbi.CommonTypeChar,
		"VARCHAR2":      dbi.CommonTypeVarchar,
		"NVARCHAR2":     dbi.CommonTypeVarchar,
		"NUMBER":        dbi.CommonTypeNumber,
		"INTEGER":       dbi.CommonTypeInt,
		"INT":           dbi.CommonTypeInt,
		"DECIMAL":       dbi.CommonTypeNumber,
		"FLOAT":         dbi.CommonTypeNumber,
		"REAL":          dbi.CommonTypeNumber,
		"BINARY_FLOAT":  dbi.CommonTypeNumber,
		"BINARY_DOUBLE": dbi.CommonTypeNumber,
		"DATE":          dbi.CommonTypeDate,
		"TIMESTAMP":     dbi.CommonTypeDatetime,
		"LONG":          dbi.CommonTypeLongtext,
		"BLOB":          dbi.CommonTypeLongtext,
		"CLOB":          dbi.CommonTypeLongtext,
		"NCLOB":         dbi.CommonTypeLongtext,
		"BFILE":         dbi.CommonTypeBinary,
	}

	// 公共数据类型 映射 oracle数据类型
	oracleColumnTypeMap = map[string]string{
		dbi.CommonTypeVarchar:    "NVARCHAR2",
		dbi.CommonTypeChar:       "NCHAR",
		dbi.CommonTypeText:       "CLOB",
		dbi.CommonTypeBlob:       "CLOB",
		dbi.CommonTypeLongblob:   "CLOB",
		dbi.CommonTypeLongtext:   "CLOB",
		dbi.CommonTypeBinary:     "BFILE",
		dbi.CommonTypeMediumblob: "CLOB",
		dbi.CommonTypeMediumtext: "CLOB",
		dbi.CommonTypeVarbinary:  "BFILE",
		dbi.CommonTypeInt:        "INT",
		dbi.CommonTypeSmallint:   "INT",
		dbi.CommonTypeTinyint:    "INT",
		dbi.CommonTypeNumber:     "NUMBER",
		dbi.CommonTypeBigint:     "NUMBER",
		dbi.CommonTypeDatetime:   "DATE",
		dbi.CommonTypeDate:       "DATE",
		dbi.CommonTypeTime:       "DATE",
		dbi.CommonTypeTimestamp:  "TIMESTAMP",
		dbi.CommonTypeEnum:       "CLOB",
		dbi.CommonTypeJSON:       "CLOB",
	}
)

type DataConverter struct {
}

func (dc *DataConverter) GetDataType(dbColumnType string) dbi.DataType {
	if numberTypeRegexp.MatchString(dbColumnType) {
		return dbi.DataTypeNumber
	}
	// 日期时间类型
	if datetimeTypeRegexp.MatchString(dbColumnType) {
		return dbi.DataTypeDateTime
	}
	return dbi.DataTypeString
}

func (dc *DataConverter) FormatData(dbColumnValue any, dataType dbi.DataType) string {
	str := anyx.ToString(dbColumnValue)
	switch dataType {
	// oracle把日期类型数据格式化输出
	case dbi.DataTypeDateTime: // "2024-01-02T22:08:22.275697+08:00"
		res, _ := time.Parse(time.RFC3339, str)
		return res.Format(time.DateTime)
	}
	return str
}

func (dc *DataConverter) ParseData(dbColumnValue any, dataType dbi.DataType) any {
	// oracle把日期类型的数据转化为time类型
	if dataType == dbi.DataTypeDateTime {
		res, _ := time.Parse(time.RFC3339, anyx.ConvString(dbColumnValue))
		return res
	}
	return dbColumnValue
}
