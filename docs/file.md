# <center>文件</center>

***

## 文件结构
```
NilBridge
├── core  - 无论发生什么，都不要动core文件夹！
│   └── logo.txt  - 开启时输出的LOGO
│   └── .lang  - 语言文件备份，请不要修改这里
├── Func
│   └── onGroup.js  - 处理群聊的函数
│   └── onWSReceive.js  - 处理websocket收包的函数
├── Data  -  注意此文件夹是运行时生成的，原包里不会附带，请定时备份来保证数据安全
│   └── playerdata.xdb  - 玩家数据文件
│   └── bot.json  - 机器人文件
│   └── servers.json  - 服务器配置文件
│   └── password.txt*  - 不必要文件，使用密码登录时会需要此文件
│   └── .lang 语言文件，请修改此文件来自定义消息内容
├── node_modules  - 运行库，不要动此文件夹，否则可能会造成启动失败
├── Plugins  - 插件文件夹，存放自定义插件
├── site  - 本地文档站
├── Utils  - 工具函数
└── app.js  - 主文件，勿动

```
## Q群配置文件

此配置文件位于`Data/bot.json`

``` json
{
	"botqq":2837945976,  //你要登录的qq号
	"protocol":3,  //登录协议，1为手机，2为排版，3为手表
	"group":{
		"main":808776416,  //主群，用于执行命令和绑定白名单
		"chat":808776416  //聊天群，用于与服务器聊天
	},
	"admin":[  //管理员，可以写多个，用英文逗号分隔
		114514
	]
}
```

# 服务器配置文件

此文件位于`Data/servers.json`

``` json
{
    "生存服务器":{  //服务器名称
        "url":"ws://127.0.0.1:8123/mc",  //llws连接地址
        "pwd":"passwd"   //llws连接密匙
    }
}
```

如果你要连接多个服务器，参照下面这个格式

``` json
{
    "生存服务器1":{  //服务器名称
        "url":"ws://127.0.0.1:8123/mc",  //llws连接地址
        "pwd":"passwd"   //llws连接密匙
    },
    "生存服务器2":{  //服务器名称
        "url":"ws://127.0.0.1:8124/mc",  //llws连接地址
        "pwd":"passwd"   //llws连接密匙
    }
}
```