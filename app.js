"use strict" //oicq需要开启严格模式

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


//全局变量 NIL
global.NIL = {};

//logo输出
const LOGO_FILE_PATH = './core/logo.txt';
let data = fs.readFileSync(LOGO_FILE_PATH, 'utf-8');
console.log(data);

//日志模块
require("./Utils/Logger");
NIL.Logger.info('NIL','正在启动...');


const cfgoldpath = './core/property.js';
const cfgnewpath = './property.js';
try{
    fs.statSync(cfgnewpath);
	}catch{
    NIL.Logger.info('NIL','property.js文件不存在，自动创建...');
    fs.copyFileSync(cfgoldpath,cfgnewpath);
}
NIL.RUNCMDID = {};
NIL.CONFIG = {};
require('./property');
NIL.PLUGINS = [];
NIL.ADMIN = [];
NIL.SERVERS = {};
NIL.FUNC = {
	NATIVE : {
		WS :[],
		GROUP:[]
	},
	PLUGINS : {
		WS :[],
		GROUP:[]
	}
}
NIL.TOOL = {};
NIL.TOOL.COMPUTER = {};
NIL.CLASS = {};
NIL.LANG = {};
NIL.XDB = {};


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
//lang模块
require('./Utils/Lang');
//数据包模块
require('./Utils/PackHelper');
//XDB-玩家数据
require("./Utils/XDB");
//解析消息函数
require('./Utils/Message');
//http库
require("./Utils/Network");
//正则表达式模块
const regex =  require("./Utils/Regex");
// computer
require('./Utils/ComputerInfo');
//加载插件
// pm:PluginsManager
const pm =  require('./Utils/initPlugins');

//登录QQ
require('./Utils/Bot');

pm.load();
regex.load();

//控制台stop退出
rl.on('line',(input)=>{
	switch(input){
		case "stop":
			NIL.Logger.info('NIL','正在保存数据..');
			NIL.XDB.save();
			NIL.Logger.info('NIL','正在卸载插件..');
			pm.clear();
			NIL.Logger.info('NIL','准备退出');
			NIL.bot.logout();
			setTimeout(function(){process.exit(0)},1000)
			break;
		case "plreload":
			NIL.Logger.info('NIL','正在重载插件');
			pm.clear();
			pm.load();
			break;
		case "regreload":
			NIL.Logger.info('NIL','正在重载正则表达式文件..');
			regex.load();
			break;
	}
});

process.on('unhandledRejection', (reason, promise) => {
	NIL.Logger.error('Unhandled Rejection:', reason)
});