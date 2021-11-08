const fs = require('fs');

//全局变量 NIL
global.NIL = {};

NIL.SERVERS = {};
NIL.FUNC = {};
NIL.TOOL = {};
NIL.CLASS = {};
NIL.LANG = {};

//日志模块
require("./Utils/Logger");

NIL.Logger.info('[NIL]','正在启动...');

//AES模块
require("./Utils/AES");
//MD5模块
require("./Utils/MD5");
//websocket通信封装
require("./Utils/websocket");
//装载所有服务器
require("./Utils/initServers");
//websocket收包函数
require("./Func/onWSReceive");
//qq群聊解析函数
require('./Func/onGroup');
//lang还没写完，暂时不要引用
//require('./Utils/Lang');


for(i in NIL.SERVERS){
    NIL.Logger.info('[NIL]','loading server: '+i+`(${NIL.SERVERS[i].url})`);
}
NIL.Logger.info("[NIL]",`成功加载${Object.keys(NIL.SERVERS).length}个服务器`);

NIL.Logger.info("[OICQ]","准备登录QQ....");
NIL.Logger.info('[OICQ]',"扫码后回车即可登录");

//登录QQ
require('./Utils/Bot')


//控制台stop退出
process.stdin.on('data',(input)=>{
	if(input.toString('hex')=="73746f700d0a"){
		NIL.Logger.info('[NIL]','准备退出');
		setTimeout(function(){process.exit(0)},1000)
	}
});
