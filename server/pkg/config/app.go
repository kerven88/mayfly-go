package config

import "fmt"

const (
	AppName = "mayfly-go"
	Version = "v1.9.1"
)

func GetAppInfo() string {
	return fmt.Sprintf("[%s:%s]", AppName, Version)
}
