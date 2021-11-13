"use strict" //oicq需要开启严格模式
const { createClient } = require("oicq");

NIL.bot = {};

const conf = {//机器人内部配置
    platform: NIL.CONFIG.LOGIN_PROTOCOL,//QQ登录协议。1:安卓手机 2:安卓平板 3:安卓手表 4:MacOS 5:iPad
    kickoff: false,
    ignore_self: true,
    resend: true,
    brief: true		
};

if(NIL.CONFIG.QQ == 114514){
  NIL.Logger.info('[OICQ]','请您修改property.js!');
  process.exit();
}
const client = createClient(NIL.CONFIG.QQ,conf);

if(!NIL.CONFIG.LOGIN_WITH_QRCODE){
  client.on('system.login.slider',function(e){
    process.stdin.once("data", (e) => {
      this.submitSlider(e.toString('utf8'));
    })
  }).login(NIL.CONFIG.PASSWORD);
}

client.on("system.online", () => NIL.Logger.info('[OICQ]',"登录成功!"));//登录成功提示

//#region 
client.on("message.group", e => {
  NIL.FUNC.NATIVE.GROUP.forEach(element=>{
    try{
      element(e);
    }catch(err){
      NIL.Logger.error('[OICQ]','[NATIVE]',err);
    }
  });
  NIL.FUNC.PLUGINS.GROUP.forEach(element=>{
    try{
      element(e);
    }catch(err){
      NIL.Logger.error('[OICQ]','[PLUGINS]',err);
    }
  });
});


client.on('notice.group.decrease',e=>{
  if(e.group_id == NIL.CONFIG.GROUP_MAIN){
    //MEMBER_LEFT_GROUP
    if(NIL.XDB.wl_exsis(e.user_id)){
      NIL.bot.sendMainMessage(NIL.LANG.get('MEMBER_LEFT_GROUP'))
      NIL.TOOL.RunCMDAll(`whitelist remove "${NIL.XDB.get_xboxid(e.user_id)}"`);
      NIL.XDB.wl_remove(e.user_id);
    }
  }
});
//#endregion
if(NIL.CONFIG.LOGIN_WITH_QRCODE){
  client.on("system.login.qrcode", function (e) {
    //扫码后按回车登录
    process.stdin.once("data", (e) => {
      this.login();
    })
  }).login();
}


NIL.bot.sendGroupMessage = function(group,msg){
    if(client.status != 11) {NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}//直接返回防止oicq崩溃
    client.pickGroup(group).sendMsg(msg);
}
NIL.bot.GetGroupMember = function(g,q){
  if(client.status != 11) {NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}
  return client.pickMember(g,q);
}

NIL.bot.sendFriendMessage = function(friend,msg){
    if(client.status != 11){ NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}
    client.pickFriend(friend).sendMsg(msg);
}

NIL.bot.sendMainMessage = function(msg){
  NIL.bot.sendGroupMessage(NIL.CONFIG.GROUP_MAIN,msg);
}

NIL.bot.sendChatMessage = function(msg){
  NIL.bot.sendGroupMessage(NIL.CONFIG.GROUP_CHAT,msg);
}