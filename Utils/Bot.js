"use strict" //oicq需要开启严格模式
const { createClient } = require("oicq");
const fs = require("fs");

try{
  fs.statSync('./Data/bot.json');
}catch{
  fs.writeFileSync('./Data/bot.json',JSON.stringify({botqq:114514,protocol:3,group:{main:114154,chat:114514},admin:[114514]},null,"\t"));
  NIL.Logger.info('[OICQ]','配置文件创建完成，请修改Data/bot.json');
  process.exit(0)
}

var cfg = JSON.parse(fs.readFileSync('./Data/bot.json','utf8'));

NIL.bot = {};
NIL.bot.config = cfg;
NIL.ADMIN = cfg.admin;
const account = cfg.botqq;
var usepwd = false;
var pwd = '';
try{
  fs.statSync('./Data/password.txt');
  usepwd = true;
  pwd = fs.readFileSync("./Data/password.txt",'utf8');
}catch{
}
const conf = {//机器人内部配置
    platform: cfg.protocol,//QQ登录协议。1:安卓手机 2:安卓平板 3:安卓手表 4:MacOS 5:iPad
    kickoff: false,
    ignore_self: true,
    resend: true,
    brief: true		
};
const client = createClient(account,conf);

if(usepwd){
  console.log(pwd);
  client.on('system.login.slider',function(e){
    process.stdin.once("data", (e) => {
      this.submitSlider(e.toString('utf8'));
    })
  }).login(pwd);
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
  if(e.group_id == NIL.bot.config.group.main){
    //MEMBER_LEFT_GROUP
    if(NIL.XDB.wl_exsis(e.user_id)){
      NIL.bot.sendMainMessage(NIL.LANG.get('MEMBER_LEFT_GROUP'))
      NIL.TOOL.RunCMDAll(`whitelist remove "${NIL.XDB.get_xboxid(e.user_id)}"`);
      NIL.XDB.wl_remove(e.user_id);
    }
  }
});
//#endregion
if(usepwd == false){
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
  NIL.bot.sendGroupMessage(cfg.group.main,msg);
}

NIL.bot.sendChatMessage = function(msg){
  NIL.bot.sendGroupMessage(cfg.group.chat,msg);
}