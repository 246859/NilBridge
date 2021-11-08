global.NIL = {};

NIL.SERVERS = {}
NIL.FUNC = {}
NIL.TOOL = {}
NIL.CLASS = {}

require("./Utils/Logger");

NIL.Logger.info('[NIL]','正在启动...');

require("./Utils/AES");
require("./Utils/MD5");
require("./Utils/class");
require("./Utils/initServers");
require("./Func/onWSReceive");

for(i in NIL.SERVERS){
    NIL.Logger.info('[NIL]','loading server: '+i+`(${NIL.SERVERS[i].url})`);
}
NIL.Logger.info("[NIL]",`成功加载${Object.keys(NIL.SERVERS).length}个服务器`);

NIL.Logger.info("[OICQ]","准备登录QQ....");
NIL.Logger.info('[OICQ]',"扫码后回车即可登录")

require('./Utils/Bot')



process.stdin.on('data',(input)=>{
	if(input.toString('hex')=="73746f700d0a"){//歪比歪比？
		NIL.Logger.info('[NIL]','准备退出');
		setTimeout(function(){process.exit(0)},1000)
	}
});
