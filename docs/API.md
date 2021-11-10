# <center>API</center>

***

## 引言

NilBridge提供了插件加载功能使得您可以自行编写插件来完善NilBridge的功能

您可以监听websocket收信或者监听群聊

将编写好的js文件放入`plugins`来加载

***

## 设置处理函数
``` js

// 注册函数监听websocket收包
// 传入的数据是解密过的数据包
// 函数原型 func(ser,pack) ser为服务器名称,pack为解密过的数据包
NIL.FUNC.PLUGINS.WS.push(func)

// 注册函数监听群聊
// 函数原型 func(e) e为消息对象，来自OICQ
NIL.FUNC.PLUGINS.GROUP.push(func)

```

## 日志模块

``` js
// 输出一条级别为调试的日志
NIL.Logger.debug('str')

// 输出一条级别为信息的日志
NIL.Logger.info('str')

// 输出一条级别为警告的日志
NIL.Logger.warn('str')

// 输出一条级别为错误的日志
NIL.Logger.error('str')
```

## OICQ封装

``` js
// 发送群消息
NIL.bot.sendGroupMessage(group_id,'哼哼 啊啊啊啊啊啊')

// 发送好友信息
NIL.bot.sendFriendMessage(friend_id,'哼哼 啊啊啊啊啊啊啊')

// 直接发送消息到主群
NIL.bot.sendMainMessage('哼哼 啊啊啊啊啊啊')

// 直接发送消息到聊天群
NIL.bot.sendChatMessage('哼哼 啊啊啊啊啊啊啊啊啊啊')

```

## 工具模块封装

``` js

// AES解密
NIL.TOOL.AESdecrypt('key','iv','str')

// AES加密
NIL.TOOL.AESdecrypt('key','iv','str')

// MD5加密
NIL.TOOL.MD5('str')

// 获取消息对象中所有被At的QQ号，返回数组
NIL.TOOL.getAt('消息对象，来自OICQ')
```

## Lang模块

``` js

// 添加lang字符串
NIL.LAN.set('k','v')

// 格式化lang字符串，可以接受多个参数
NIL.LANG.get('str'[,'str1','str2'...'strn'])

NIL.LANG.get('SERVER') //返回“SERVER”，因为lang文件没有这一项

NIL.LANG.get('SERVER_STOP') //返回“服务器{0}已关闭”

NIL.LANG.get('SERVER_STOP','生存') //返回“服务器生存已关闭”

NIL.LANG.get('MEMBER_LEFT','steve','生存') //返回“steve 离开了 生存”

```

## 服务器列表

``` js

// 是一个object对象，里面有所有服务器
NIL.SERVER 

/*
每个服务器对象都有这些元素

url ws的地址

key AES加密密匙

iv AES加密偏移量

name 所连接的服务器名称

ws ws对象

每个ws对象有如下方法

sendCMD(cmd,id)  向服务器执行命令

sendText(text) 向服务器发送文本


*/
```

## Q群配置文件
``` js

// 一个object对象
NIL.bot.config

/*
含有如下元素

botqq 登录的QQ号

protocol 客户端协议

group.main 主群群号

group.chat 聊天群群号

*/

```

## 玩家数据

``` js

// 返回该qq号是否绑定xbooxid
NIL.XDB.wl_exsis(qq)

// 添加玩家信息到数据库
NIL.XDB.wl_add(qq,xboxid)

// 移除玩家数据
NIL.XDB.wl_remove(qq)

// 获取qq所绑定的xboxid，没有绑定返回undefined
NIL.XDB.get_xboxid(qq)

// 获取xboxid对应的qq号，没有绑定返回0
NIL.XDB.get_qq(xboxid)

// 查询xboxid是否被绑定
NIL.XDB.xboxid_exsis(xboxid)

// 获取qq号对应的玩家数据
NIL.XDB.get_player(qq)

/*
玩家数据对象有如下元素

xboxid 玩家绑定的xboxid

count.join 加入服务器次数

count.duration 游玩时间，单位分钟

*/

// 修改玩家数据
NIL.XDB.add_time(xboxid,mode,time)

NIL.XDB.add_time('steve','join',1) //xboxid为steve的玩家加入服务器次数加一

NIL.XDB.add_time('steve','time',1) //xboxid为steve的玩家游玩时间加一分钟

```
