"use strict" //oicq需要开启严格模式
const helper = require('./PackHelper');
const { createClient ,segment , Message} = require("oicq");

NIL.bot = {};
NIL.Logger.info("OICQ", "准备登录QQ....");
const conf = {//机器人内部配置
  platform: NIL.CONFIG.LOGIN_PROTOCOL,//QQ登录协议。1:安卓手机 2:安卓平板 3:安卓手表 4:MacOS 5:iPad
  kickoff: false,
  ignore_self: true,
  resend: true,
  brief: true
};

if (NIL.CONFIG.QQ == 114514) {
  NIL.Logger.info('[OICQ]', '请您修改property.js!');
  process.exit();
}
const client = createClient(NIL.CONFIG.QQ, conf);

if (!NIL.CONFIG.LOGIN_WITH_QRCODE) {
  client.login(NIL.CONFIG.PASSWORD);
}

client.on('system.login.slider',(url,phone)=>{
  rl.once('line',(input)=>{client.submitSlider(input);});
})

client.on("system.online", () => NIL.Logger.info('OICQ', "登录成功!"));//登录成功提示

//#region 
client.on("message.group", e => {
  NIL.FUNC.NATIVE.GROUP.forEach(element => {
    try {
      element(e);
    } catch (err) {
      NIL.Logger.error('OICQ -> '+element.name, err);
    }
  });
  NIL.FUNC.PLUGINS.GROUP.forEach(element => {
    try {
      element(e);
    } catch (err) {
      NIL.Logger.error('OICQ -> '+element.name, err);
    }
  });
});


client.on('notice.group.decrease', e => {
  if (e.group_id == NIL.CONFIG.GROUP_MAIN) {
    //MEMBER_LEFT_GROUP
    if (NIL.XDB.wl_exsits(e.user_id)) {
      NIL.bot.sendMainMessage(NIL.LANG.get('MEMBER_LEFT_GROUP', NIL.XDB.get_xboxid(e.user_id)))
      helper.RunCMDAll(`whitelist remove "${NIL.XDB.get_xboxid(e.user_id)}"`);
      NIL.XDB.wl_remove(e.user_id);
    }
  }
});
//#endregion
if (NIL.CONFIG.LOGIN_WITH_QRCODE) {
  client.on("system.login.qrcode", function (e) {
    //扫码后按回车登录
    NIL.Logger.info('OICQ', "扫码后回车即可登录");
    process.stdin.once("data", (e) => {
      this.login();
    })
  }).login();
}

/**
 * 发送群聊消息
 * @param group 群号
 * @param msg   要发送的消息
 */
NIL.bot.sendGroupMessage = function (group, msg) {
  if (client.status != 11) { NIL.Logger.warn('OICQ', '插件在QQ未登录时调用了API'); return; }//直接返回防止oicq崩溃
  if (msg == "#") return;
  if (group == undefined || msg == undefined) { NIL.Logger.error('OICQ', '数据为空！！！'); return; }
  client.sendGroupMsg(group, msg);
}

/**
 * 获取群员对象
 * @param g 群号
 * @param q 成员QQ号
 * @returns 成员对象
 */
NIL.bot.GetGroupMember = function (g, q) {
  if (client.status != 11) { NIL.Logger.warn('OICQ', '插件在QQ未登录时调用了API'); return; }
  return client.pickMember(g, q);
}
/**
 * 发送私聊消息
 * @param friend 好友QQ号
 * @param msg   要发送的消息
 */
NIL.bot.sendFriendMessage = function (friend, msg) {
  if (client.status != 11) { NIL.Logger.warn('OICQ', '插件在QQ未登录时调用了API'); return; }
  if (friend == undefined || msg == undefined) { NIL.Logger.error('OICQ', '数据为空！！！'); return; }
  client.sendPrivateMsg(friend, msg);
}

/**
 * 发消息到主群(GROUP_MAIN)
 * @param msg   要发送的消息
 */
NIL.bot.sendMainMessage = function (msg) {
  NIL.bot.sendGroupMessage(NIL.CONFIG.GROUP_MAIN, msg);
}

/**
 * 发消息到聊天群(GROUP_CHAT)
 * @param msg   要发送的消息
 */
NIL.bot.sendChatMessage = function (msg) {
  NIL.bot.sendGroupMessage(NIL.CONFIG.GROUP_CHAT, msg);
}

/**
 * 获取群列表
 */
NIL.bot.getGroupList = function () {
  if (client.status != 11) { NIL.Logger.warn('OICQ', '插件在QQ未登录时调用了API'); return; }
  return client.getGroupList();
}

/**
 * 获取好友列表
 */
NIL.bot.getFriendList = function () {
  if (client.status != 11) { NIL.Logger.warn('OICQ', '插件在QQ未登录时调用了API'); return; }
  return client.getFriendList();
}

/**
 * 下线机器人
 */
NIL.bot.logout = function () {
  client.logout(false);
}


/**
 * 直接监听事件
 * @param eventkey 事件名称
 * @param callback 回调函数
 */
NIL.bot.listen = function(eventkey, callback){
  client.on(eventkey, (e) => {
    try {
      callback(null,e);
    } catch (err) {
      callback(err);
    }
  });
}
