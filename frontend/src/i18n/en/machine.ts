export default {
    machine: {
        keywordPlaceholder: 'ip / Name / Code',
        acName: 'Credential',
        runningStat: 'Running Status',
        fs: 'Disk (mount point => available/total)',
        memberInfo: 'Memory (available/total)',
        cpuInfo: 'CPU (free)',
        file: 'File',
        directory: 'Directory',
        folder: 'Folder',
        script: 'Script',
        process: 'Process',
        terminalPlayback: 'Terminal Playback',
        createMachine: 'Create Machine',
        editMachine: 'Edit Machine',
        reConnTips: 'Are you sure to reconnect?',
        clickReConn: 'Click to reconnect',
        port: 'Port',
        sshTunnel: 'SSH Tunnel',
        newOpenTabTerminalTips: 'Hold down ctrl to open a new TAB',
        newTab: 'New TAB',
        openTerminal: 'Open Terminal',
        newTabOpenTerminal: 'Open Terminal(New TAB)',
        fileManage: 'File Manage',
        scriptManage: 'Script Manage',
        machineState: 'Machine State',
        remoteFileDesktopManage: 'Remote desktop file management', // Remote desktop file management
        remoteDesktop: 'Remote Desktop',
        protocol: 'Protocol',
        ipAndPort: 'ip and port',
        connSuccess: 'be connected successfully',
        noAcErrMsg: 'Please complete the voucher account information',
        ciphers: 'Ciphers',
        keyExchanges: 'Key Exchanges',
        multiValuePlaceholder: `multiple values are separated by ','`,

        // MachineRec
        playback: 'Playback',
        cmd: 'Command',
        execCmdRecord: 'Executive command record',
        execTime: 'Execution time',
        operator: 'Operator',
        beginTime: 'Begin Time',
        endTime: 'End Time',

        // MachineStats
        basicInfo: 'basic information',
        hostname: 'Hostname',
        runTime: 'Run Time',
        totalTask: 'Total Task',
        runningTask: 'Running Task',
        load: 'Load',
        disk: 'Disk',
        mountPoint: 'Mount Point',
        available: 'Available',
        used: 'Used',
        networkCard: 'Network Card',
        receive: 'Receive',
        send: 'Send',
        memory: 'Memory',
        cpuUsageRate: 'Cpu Usage Rate',

        // process
        processName: 'Process Name',
        selectSortType: 'Please select a sort type',
        selectProcessNum: 'Please select the number of processes',
        cpuDesc: 'CUP descending',
        memDesc: 'Memory descending',
        virtualMemory: 'Virtual Memory',
        fixedMemory: 'Fixed Memory',
        procState: 'process state',
        startTime: 'Start Time',
        procCpuRunTime: 'The actual CPU time used by the process',
        killProcConfirm: 'Are you sure to terminate the process?',
        kill: 'Kill',

        // script
        execute: 'Execute',
        scriptParam: 'Script Param',
        execResult: 'result of execution',
        execCompleted: 'execution is completed',
        scriptParamTips1: '1. You can use {{.model}} as a placeholder in the script content',
        scriptParamTips2: '2. When executing the script, you can enter the corresponding form content to replace the placeholder',
        scriptResultEnumResult: 'Have result',
        scriptResultEnumNoResult: 'No result',
        scriptResultEnumRealTime: 'Real-time',
        scriptTypeEnumPrivate: 'Private',
        scriptTypeEnumPublic: 'Public',

        // security
        cmdConfig: 'Command Config',
        filterCmds: 'Filter command',
        relateMachine: 'Associated machine',
        newCmd: 'New Command',
        cmdPlaceholder: 'Enter the command regular expression',

        // cronjob
        cronjob: 'Cronjob',
        machineCode: 'Machine Code',
        cronjobRunning: 'Running',
        cronjobNoRun: 'Not Run',
        cronjobRun: 'Execute',
        cronJobExecStatusEnumSuccess: 'Success',
        cronJobExecStatusEnumFail: 'Fail',
        cronjobExecResult: 'Execute Result',
        cronjobExecTime: 'Execute Time',
        cronjobExecRecord: 'Record of execution',
        runSuccess: 'Executed successfully',
        cronjobRunState: 'Run State',
        execResRecordType: 'Result record type',
        cronExpression: 'Cron Expression',
        noRecord: 'Not recorded',
        onErrorRecord: 'Record on error',
        record: 'Record',

        // file
        upload: 'Upload',
        download: 'Download',
        copy: 'Copy',
        move: 'Move',
        paste: 'Paste',
        fileNameFilterPlaceholder: 'Name: Input filterable',
        calculate: 'Calculate',
        modificationTime: 'Modify Time',
        attribute: 'Attribute',
        user: 'User',
        group: 'Group',
        renameTips: 'rename: Double-click the file name cell and then press Ente',
        fileDetail: 'File Details',
        createFile: 'Create File',
        pasteSuccess: 'Paste successfully',
        sameDirNoPaste: 'Can not paste in the same directory',
        renameSuccess: 'Rename successfully',
        newFileNameNotEmpty: 'he new name cannot be empty',
        fileTooLargeTips: 'The file is too large, please download and use it',
        uploadSuccess: 'Upload successfully',
        fileExceedsSysConf: 'The uploaded file exceeds the system configuration [{uploadMaxFileSize}]',
    },
};
