# NilBridge

另一个基于Nodejs的机器人

## 基础api

### 日志模块

``` js

NIL.Logger.debug()
NIL.Logger.info()
NIL.Logger.warn()
NIL.Logger.error
```

### OICQ封装

``` js
// 发送群消息
NIL.bot.sendGroupMessage(1145141919,'哼哼 啊啊啊啊啊啊')

// 发送好友信息
NIL.bot.sendFriendMessage(1145141919,'哼哼 啊啊啊啊啊啊啊')

// 直接发送消息到主群
NIL.bot.sendMainMessage('哼哼 啊啊啊啊啊啊')

// 直接发送消息到聊天群
NIL.bot.sendChatMessage('哼哼 啊啊啊啊啊啊啊啊啊啊')

```

### 工具模块封装

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

### Lang模块

``` js

// 添加lang字符串
NIL.LAN.set('k','v')

// 格式化lang字符串，可以接受多个参数
NIL.LANG.get('str'[,'str1','str2'...'strn'])

// NIL.LANG.get('SERVER') 返回“SERVER”因为lang文件没有这一项
// NIL.LANG.get('SERVER_STOP') 返回“服务器{0}已关闭”
// NIL.LANG.get('SERVER_STOP','生存') 返回“服务器生存已关闭”
// NIL.LANG.get('MEMBER_LEFT','steve','生存') 返回“steve 离开了 生存”
```