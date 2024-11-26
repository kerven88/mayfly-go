export default {
    system: {
        menu: {
            filterPlaceholder: 'Input keyword filter (right click operation)',
            opTips: 'Red and orange fonts indicate disabled status (right click on the resource to operate)',
            info: 'Information',
            menu: 'Menu',
            permission: 'Permission',
            icon: 'Icon',
            routerName: 'Router Name',
            componentPath: 'Component Path',
            isCache: 'Cache or not',
            isHide: 'Whether to hide',
            tagIsDelete: 'Tag cannot be deleted',
            externalLink: 'External Link',
            yes: 'Yes',
            no: 'No',
            addSubResource: 'Adding subresources',
            enable: 'Enable',
            disable: 'Disable',
            tips: 'Tips',
            addTopMenu: 'Add a top-level menu',
            addChildrenMenuTitle: 'Adds `{parentName}` subresources',
            updateMenu: 'Change `{name}`',
            success: 'Success',
            menuCodeTips: `The menu type is the access path (if the menu path does not begin with '/', the access address will automatically concatenate the parent menu path), otherwise it is the unique code of the resource`,
            menuCodePlaceholder: `A menu that does not begin with '/' will automatically concatenate the parent menu path`,
            routerNameTips: 'For component caching to work, match the vue component name, such as ResourceLis',
            componentPathTips: 'Access path components, such as: ` system/resource/ResourceList `, default in ` views ` directory',
            isCacheTips: `If yes is selected, it will be 'keepalive' cached (reentering the page without refreshing the page and requesting data again), and needs the route name to match the vue component name`,
            isHideTips:
                'Select Hide and the route will not appear in the menu bar, but it will still be accessible. Disabled will not be able to access and operate',
            externalLinkTips: 'Inline: displayed as an iframe, external link: opened in a new TAB',
            inline: 'Embedded',
            linkAddress: 'Link Address',
            linkPlaceholder: 'External/embedded links (http://xxx.com)',
            menuNameRuleMsg: 'Please enter a resource name',
            routeNameNotEmpty: 'Route names cannot be empty',
            resourceCodePatternErrMsg: 'Only 1-32 uppercase letters, numbers, and -.: characters are allowed',
            assignedRole: 'Assigned Role',
        },
        account: {
            roleAllocation: 'Role Allocation',
            resetOtp: 'Reset OTP',
            roleName: 'Role Name',
            assigner: 'Assigner',
            allocateTime: 'Allocate Time',
            name: 'Name',
            lastLoginTime: 'Last Login Time',
            usernamePlacholder: '5-16 uppercase letters, numbers, -.: characters',
            random: 'Random',
            usernamePatternErrMsg: 'Only 5-16 uppercase letters, numbers, and -.: characters are allowed',
            accountSearchPlaceholder: 'Enter account fuzzy search and select',
            accountInfo: 'Account Information',
            allocateRoleTitle: 'Allocate the `{name}` role',
            allocated: 'Allocated',
            undistributed: 'Undistributed',
            menuAndPermission: 'Menu & Permission',
            remove: 'Remove',
            allocation: 'Allocation',
            roleCode: 'Role Code',
            roleStatus: 'Role Status',
            userMenuTitle: '`{name}` menus and permissions',
            statusEnable: 'Enable',
            statusDisable: 'Disable',
        },
        role: {
            permissionDetail: 'Permission',
            permissionAllocate: 'Permission Alloctate',
            userManage: 'User',
            roleName: 'Role Name',
            roleCode: 'Role Code',
            rolePermissionTitle: '`{name}` menus and permissions',
            roleCodePlaceholder: 'COMMON begins with the role shared by all accounts',
            statusEnable: 'Enable',
            statusDisable: 'Disable',
            allocateMenuTitle: 'Allocate permissions to `{roleName}`',
            allocateAccountTitle: 'Account associated with `{roleName}`',
            addAccount: 'Adding an account',
            userStatus: 'User Status',
            assigner: 'Assigner',
            allocateTime: 'Allocate Time',
            permissionInfo: 'Permission assignment information',
        },
        sysconf: {
            confItem: 'Config Item',
            confKey: ' Config Key',
            permission: 'Permission',
            permissionPlaceholder: 'Please enter account fuzzy search and select',
            conf: 'Config',
            confItemSetting: 'Config Item Setting',
            confValue: 'Config Value',

            fileConf: 'File Config',
            fileConfRemark: 'System file config',
            basePath: 'Base path',
            baesPathPlaceholder: 'The default is ./file in the directory corresponding to the executable file',

            dbmsConf: 'DBMS Config',
            dbmsConfRemark: 'DBMS Config',
            recordQuerySql: 'Record Query Sql',
            recordQuerySqlPlaceholder: 'Whether to record queries sql',
            maxResultSet: 'Max Result Set',
            maxResultSetPlaceholder: 'Maximum number of result sets allowed for sql queries. Note: 0= no limit',
            sqlExecLimt: 'sql execution time limit',
            sqlExecLimtPlaceholder: 'After that time (in seconds), the execution is aborted',

            machineConf: 'Machine Config',
            machineConfRemark: 'Machine related configuration, such as the number of days terminal operation records are kept',
            uploadMaxFileSize: 'Upload file size limit',
            uploadMaxFileSizePlaceholder: 'Maximum file size allowed to upload (1MB, 2GB, etc.)',
            termOpSaveDays: 'Terminal records the retention time',
            termOpSaveDaysPlaceholder: 'Unit day, after which the terminal operation record will be deleted',
            guacdHost: 'guacd server ip',
            guacdHostPlaceholder: 'guacd server ip, default 127.0.0.1',
            guacdPort: 'guacd server port',
            guacdPortPlaceholder: 'guacd server port, default 4822',
            guacdFilePath: 'guacd server file path',
            guacdFilePathPlaceholder: 'guacd serves the file storage location for mounting the RDP folder',

            systemConf: 'System-wide styling',
            systemConfRemark: 'Configuration of system icon, title, watermark information, etc',
            logoIcon: 'Logo Icon',
            logoIconPlaceholder: 'System logo icon (base64 encoded, svg format recommended, no more than 10k)',
            title: 'Menu bar title',
            titlePlaceholder: 'System menu bar title display',
            viceTitle: 'Login page title',
            viceTitlePlaceholder: 'The login page title is displayed',
            useWatermark: 'Watermarking',
            useWatermarkPlaceholder: 'Whether system watermarking is enabled',
            watermarkContent: 'Watermark information',
            watermarkContentPlaceholder: 'Watermark supplementary information, such as company name, etc',

            ldapLoginConf: 'LDAP Login Config',
            ldapLoginConfRemark: 'LDAP Login Config',
            ldapEnable: 'Enable',
            dapEnablePlaceholder: 'Whether ldap login is enabled',
            host: 'host',
            port: 'port',
            bindDN: 'bindDN',
            bindDnPlaceholder: 'admin account for the LDAP service, for example: "cn=admin,dc=example,dc=com"',
            bindPwd: 'bindPwd',
            bindPwdPlaceholder: 'The administrator password for the LDAP service',
            baseDN: 'baseDN',
            baseDnPlaceholder: 'The user\'s base DN, for example: "ou=users,dc=example,dc=com"',
            userFilter: 'userFilter',
            userFilerPlaceholder: 'How to filter users, such as "(uid=%s), (&(objectClass=organizationalPerson)(uid=%s))"',
            uidMap: 'uidMap',
            uidMapPlaceholder: 'Mapping between user id and LDAP field name, such as: cn',
            udnMap: 'udnMap',
            udnMapPlaceholder: 'mapping between user name (dispalyName) and LDAP field name, such as displayName',
            emailMap: 'emailMap',
            emailMapPlaceholder: 'Mapping between user email and LDAP field name',
            skipTlsVerfify: 'skipTlsVerfify',
            skipTlsVerfifyPlaceholder: 'Whether the client skips TLS certificate validation',
            securityProtocol: 'security protocol',
            securityProtocolPlaceholder: 'Security protocol (Null does not use security protocol), such as StartTLS, LDAPS',

            oauth2LoginConf: 'OAuth2 Login Config',
            oauth2LoginConfRemark: 'OAuth2 Login Config',
            oauth2Enable: 'Enable',
            oauth2EnablePlaceholder: 'Whether oauth2 login is enabled or not',
            name: 'Name',
            namePlaceholder: 'oauth2 name',
            clientId: 'Client ID',
            clientIdPlaceholder: 'oauth2 Client ID',
            clientSecret: 'Client Secret',
            clientSecretPlaceholder: 'oauth2 Client Secret',
            authorizationUrl: 'Authorization URL',
            authorizationUrlPlaceholder: 'oauth2 Authorization url',
            accessTokenUrl: 'Access Token URL',
            accessTokenUrlPlaceholder: 'oauth2 gets the token url',
            redirectUrl: 'Redirect URL',
            redirectUrlPlaceholder: 'This system url',
            scope: 'Scopes',
            scopePlaceholder: 'oauth2 Scopes',
            resourceUrl: 'Resource URL',
            resourceUrlPlaceholder: 'Get the user information resource url',
            userId: 'User ID',
            userIdPlaceholder: 'User unique identification field The format is type:fieldPath(string:username)',
            autoRegister: 'Automatic registration',

            accountLoginConf: 'Login Security Settings',
            accountLoginConfRemark: 'Account Login Security Settings',
            useCaptcha: 'Login verification code',
            useCaptchaPlaceholder: 'Whether to enable the login CAPTCHA',
            useOtp: 'OTP',
            useOtpPlaceholder: 'Whether two-factor (OTP) validation is enabled',
            otpIssuer: 'OTP Issuer',
            loginFailCount: 'Number of login failures',
            loginFailCountPlaceholder: 'Disable login after n failed login attempts',
            loginFainMin: 'Prohibited login time',
            loginFailMinPlaceholder: 'After a specified number of login failures, re-login is prohibited within m minutes',
        },
        syslog: {
            operator: 'Operator',
            operatorPlaceholder: 'Please enter and select an account number',
            operatingResult: 'Operating Result',
            description: 'Description',
            operatingTime: 'Operating Time',
            operatingInfo: 'Operating Information',
            result: 'Result',
            response: 'Response',
            resultSuccess: 'Success',
            resultFail: 'Fail',
            resultRunning: 'Running',
        },
        oauth: {
            authSuccess: 'Authorization succeeded',
        },
    },
};