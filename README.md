# NilBridge

 - QQ(安卓)协议基于Node.js的实现，支持最低node版本为 v14

 - 嵌入OICQ的MCBE服务器远控机器人框架

 - 提供基础类API用于二次开发

 - 整个项目只有一个人维护，所以某些API混乱不堪

 - 如果有能力可以提供PR，欢迎支持开源项目

## websocket服务端支持

注意：下面两个ws服务端装一个就可以

### [Nillauncher](https://www.minebbs.com/resources/nillauncher-ui-bds.2994/)

使用启动器开启服务器可以做到通过websocket开启、关闭服务器

不过需要额外的[插件](https://www.minebbs.com/resources/chat.2923/)获取聊天信息

### [LLWebsocketR](https://www.minebbs.com/resources/c-bdx-liteloader-bdswebsocketapi.2150/)

使用BDS原生插件可以更好的获取服务器返回信息

## Api Reference

将您编写的js插件放入`plugins`文件夹即可被加载

如果您没有头绪，可以查看[示例插件](https://github.com/XBridgeX/NilBridge/blob/main/plugins/CheckMe.js)

 - [日志模块](#Logger)
 - [OICQ模块](#OICQ)
 - [工具模块](#TOOL)
 - [语言文件模块](#LANG)
 - [服务器列表](#SERVER)
 - [玩家数据模块](#XDB)

 ### LISTEN

``` js

// 注册函数监听websocket收包
// 传入的数据是解密过的数据包
// 函数原型 func(ser,pack) ser为服务器名称,pack为解密过的数据包
NIL.FUNC.PLUGINS.WS.push(func)

// 注册函数监听群聊
// 函数原型 func(e) e为消息对象，来自OICQ
NIL.FUNC.PLUGINS.GROUP.push(func)

```

### Logger

|Method|Description|
|:-:|:-:|
|输出一条级别为调试的日志|NIL.Logger.debug(str)|
|输出一条级别为信息的日志|NIL.Logger.info(str)|
|输出一条级别为警告的日志|NIL.Logger.warn(str)|
|输出一条级别为错误的日志|NIL.Logger.error(str)|


### OICQ

|Method|Description|
|:-:|:-:|
|发送群消息|NIL.bot.sendGroupMessage(group_id,msg)|
|发送好友信息|NIL.bot.sendFriendMessage(friend_id,msg)|
|直接发送消息到主群|NIL.bot.sendMainMessage(msg)|
|直接发送消息到聊天群|NIL.bot.sendChatMessage(msg)|
|获取一个[群员对象](https://github.com/takayama-lily/oicq#class-member)|NIL.bot.getGroupMmeber(group_id,member_id)|



### TOOL

|Method|Description|
|:-:|:-:|
|[AES解密](https://github.com/XBridgeX/NilBridge/blob/main/Utils/AES.js#L12)|NIL.TOOL.AESdecrypt(key,iv,str)|
|[AES加密](https://github.com/XBridgeX/NilBridge/blob/main/Utils/AES.js#L27)|NIL.TOOL.AESdecrypt(key,iv,str)|
|MD5加密|NIL.TOOL.MD5(str)|
|获取[消息对象](https://github.com/takayama-lily/oicq#class-message)中所有被At的QQ号，返回数组|NIL.TOOL.getAt(e)|
|获取[消息对象](https://github.com/takayama-lily/oicq#class-message)中的纯文本，返回字符串|NIL.TOOL.getPlanText(e)|
|将[消息对象](https://github.com/takayama-lily/oicq#class-message)中的纯文本根据lang文件解析|NIL.TOOL.GetFormatText(e)|
|阻塞式HTTPGET请求，返回请求到的数据|NIL.TOOL.HttpGetSync(url)|
|异步HTTPGET请求，`callback`函数原型为function (err,data),请求成功`err`为null|NIL.TOOL.HttpGet(url,callback)|

### Lang

NilBridge启动时会加载`Data/.lang`文件

会把语言文件转换为`k`,`v`键值对

lang文件中以`#`开头的行会认定为注释

|Method|Description|
|:-:|:-:|
|添加lang字符串|NIL.LANG.set(k,v)|
|获取格式化lang字符串|NIL.LANG.get(str[,str1,str2...strn])|

使用方法如下

``` js
NIL.LANG.get('SERVER') //返回“SERVER”，因为lang文件没有这一项

NIL.LANG.get('SERVER_STOP') //返回“服务器{0}已关闭”

NIL.LANG.get('SERVER_STOP','生存') //返回“服务器生存已关闭”

NIL.LANG.get('MEMBER_LEFT','steve','生存') //返回“steve 离开了 生存”
```

### SERVER

NIL.SERVER 

直观一点表示就是
``` json
{
    "服务器A":{
        "url":"ws://xxxxxx:xxx/",
        "key":"QGU127IQBSD729HW",
        "iv":"ANSJ3842JSO28DN3",
        "name":"服务器A",
    }
}
```

|Property|Description|
|:-:|:-:|
|url|ws的地址|
|key|AES加密密匙|
|iv|AES加密偏移量|
|name|所连接的服务器名称|
|ws|[ws对象](#ws对象)|

#### ws对象

|Method|Description|
|:-:|:-:|
|sendCMD(cmd,id)|向服务器执行命令|
|sendText(text)|向服务器发送文本|
|sendStart()|请求开启服务器|
|sendStop()|请求关闭服务器|

### XDB

|Method|Description|
|:-:|:-:|
|查询该qq号是否绑定xbooxid|NIL.XDB.wl_exsis(qq)|
|添加玩家信息到玩家数据|NIL.XDB.wl_add(qq,xboxid)|
|移除玩家数据|NIL.XDB.wl_remove(qq)|
|获取qq所绑定的xboxid，没有绑定返回undefined|NIL.XDB.get_xboxid(qq)|
|获取xboxid对应的qq号，没有绑定返回0|NIL.XDB.get_qq(xboxid)|
|查询xboxid是否被绑定|NIL.XDB.xboxid_exsis(xboxid)|
|获取qq号对应的[玩家数据对象](#玩家数据对象)|NIL.XDB.get_player(qq)|
|修改玩家数据|NIL.XDB.add_time(xboxid,mode,time)|


#### 玩家数据对象
|Property|Description|
|:-:|:-:|
|xboxid|玩家绑定的xboxid|
|count.join|加入服务器次数|
|count.duration|游玩时间，单位分钟|

修改玩家数据示例

``` js
NIL.XDB.add_time('steve','join',1) //xboxid为steve的玩家加入服务器次数加一

NIL.XDB.add_time('steve','time',1) //xboxid为steve的玩家游玩时间加一分钟
```

## 更新日志


## v1.1.7
`2021-11-11`
 - 双十一快乐！大家是否在买买买呢
 - 修复退群移除白名单异常

## v1.1.3
`2021-11-10`

 - 群员绑定xboxid后会自动修改群名，可以在`property.js`中关闭

## v1.1.2
`2021-11-10`

 - 修改配置文件为根目录的`property.js`

## v1.1.0
`2021-11-10`

 - 添加正则表达式功能
 - 完善占位符

## v1.0.8
`2021-11-10`

 - 完善`wl-`，`wl+`命令
 - 更换文档图片

## v1.0.7v2
`2021-11-9`

 - 紧急修复一个不能扫码登录的错误

***

## v1.0.7
`2021-11-9`

 - 修复创建bot.json时缺项

 - 补充插件开发文档

***

## v1.0.5 
`2021-11-9`

 - 添加了退群自动撤销白名单功能

 - 对插件所注册的函数进行try处理

 - 提供热重载插件的命令，控制台执行`plreload`

***

## v1.0.3
`2021-11-8`

 - 对Nillauncher的初步支持

 - 在执行命令到不存在的服务器时不会再报错

***


## 更早版本

不再提供更早版本的更新日志