# <center>文件</center>

***

## 文件结构
```
NilBridge
├── core  - 无论发生什么，都不要动core文件夹！
│   └── logo.txt  - 开启时输出的LOGO
│   └── .lang  - 语言文件备份，请不要修改这里
│   └── property.js  - 配置文件文件备份，请不要修改这里
├── Func
│   └── onGroup.js  - 处理群聊的函数
│   └── onWSReceive.js  - 处理websocket收包的函数
├── Data  -  注意此文件夹是运行时生成的，原包里不会附带，请定时备份来保证数据安全
│   └── playerdata.xdb  - 玩家数据文件
│   └── servers.json  - 服务器配置文件
│   └── password.txt*  - 不必要文件，使用密码登录时会需要此文件
│   └── .lang 语言文件，请修改此文件来自定义消息内容
├── node_modules  - 运行库，不要动此文件夹，否则可能会造成启动失败
├── Plugins  - 插件文件夹，存放自定义插件
├── site  - 本地文档站
├── Utils  - 工具函数
├── property.js  - 配置文件文件
└── app.js  - 主文件，勿动

```
## 主要配置文件

此配置文件位于根目录的`property.js`

``` js

// 机器人的账号
NIL.CONFIG.QQ = 114514

// 是否使用扫码登录
// 可填： true/false
NIL.CONFIG.LOGIN_WITH_QRCODE = true


// 机器人登录协议
// 1 手机
// 2 pad
// 3 手表
// 4 MacOS
// 5 ipad
NIL.CONFIG.LOGIN_PROTOCOL = 3

// 机器人登录密码
// 如果使用扫码登录可以忽略此项
NIL.CONFIG.PASSWORD = '114514'

// 是否启用本地文档服务器
NIL.CONFIG.LOACL_WEBSITE = true

// 文档服务器监听端口
// 开启只会您可以访问127.0.0.1:端口 来查看文档
NIL.CONFIG.LOACL_WEBSITE_PORT = 3000

// 全局管理员，可以在群聊中执行命令
// 示例 [1111] 或者 [111,222]
NIL.CONFIG.ADMIN = []

// 主要群聊
// 用来执行命令和获取白名单
NIL.CONFIG.GROUP_MAIN = 123456789

// 聊天群
// 用来与服务器聊天
// 与主群可以是同一个
NIL.CONFIG.GROUP_CHAT = 123456789
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