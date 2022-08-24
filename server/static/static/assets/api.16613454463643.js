import{A as e}from"./Api.1661345446364.js";const c={list:e.create("/machines","get"),getMachinePwd:e.create("/machines/{id}/pwd","get"),info:e.create("/machines/{id}/sysinfo","get"),stats:e.create("/machines/{id}/stats","get"),process:e.create("/machines/{id}/process","get"),killProcess:e.create("/machines/{id}/process","delete"),closeCli:e.create("/machines/{id}/close-cli","delete"),saveMachine:e.create("/machines","post"),changeStatus:e.create("/machines/{id}/{status}","put"),del:e.create("/machines/{id}","delete"),scripts:e.create("/machines/{machineId}/scripts","get"),runScript:e.create("/machines/{machineId}/scripts/{scriptId}/run","get"),saveScript:e.create("/machines/{machineId}/scripts","post"),deleteScript:e.create("/machines/{machineId}/scripts/{scriptId}","delete"),files:e.create("/machines/{id}/files","get"),lsFile:e.create("/machines/{machineId}/files/{fileId}/read-dir","get"),rmFile:e.create("/machines/{machineId}/files/{fileId}/remove","delete"),uploadFile:e.create("/machines/{machineId}/files/{fileId}/upload?token={token}","post"),fileContent:e.create("/machines/{machineId}/files/{fileId}/read","get"),createFile:e.create("/machines/{machineId}/files/{id}/create-file","post"),updateFileContent:e.create("/machines/{machineId}/files/{id}/write","post"),addConf:e.create("/machines/{machineId}/files","post"),delConf:e.create("/machines/{machineId}/files/{id}","delete"),terminal:e.create("/api/machines/{id}/terminal","get")};export{c as m};
