"use strict" //oicq需要开启严格模式
const { createClient } = require("oicq");
const fs = require("fs");

try{
  fs.statSync('./Data/bot.json')
}catch{
  fs.writeFileSync('./Data/bot.json',JSON.stringify({botqq:114514,protocol:3,group:{main:114154,chat:114514}},null,"\t"));
}

var cfg = JSON.parse(fs.readFileSync('./Data/bot.json','utf8'));

NIL.bot = {};
NIL.bot.config = cfg;
const account = cfg.botqq;
const conf = {//机器人内部配置
    platform: cfg.protocol,//QQ登录协议。1:安卓手机 2:安卓平板 3:安卓手表 4:MacOS 5:iPad
    kickoff: false,
    ignore_self: true,
    resend: true,
    brief: true		
};
const client = createClient(account,conf);

client.on("system.online", () => NIL.Logger.info('[OICQ]',"登录成功!"));//登录成功提示


client.on("message.group", e => {
    try{
      NIL.FUNC.qq_ongroup_main(e);
    }catch(err){
      NIL.Logger.error('[OICQ]',err);
    }
});

client.on("system.login.qrcode", function (e) {
  //扫码后按回车登录
  process.stdin.once("data", () => {
    this.login();
  })
}).login();

NIL.bot.sendGroupMessage = function(group,msg){
    if(client.status != 11) {NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}//直接返回防止oicq崩溃
    client.pickGroup(group).sendMsg(msg);
}

NIL.bot.sendFriendMessage = function(friend,msg){
    if(client.status != 11){ NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}
    client.pickFriend(friend).sendMsg(msg);
}

NIL.bot.sendMainMessage = function(msg){
  if(client.status != 11){ NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}
    client.pickGroup(cfg.group.main).sendMsg(msg);
}

NIL.bot.sendChatMessage = function(msg){
  if(client.status != 11){ NIL.Logger.warn('[OICQ]','插件在QQ未登录时调用了API'); return;}
  client.pickGroup(cfg.group.chat).sendMsg(msg);
}