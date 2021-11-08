const fs = require("fs");


var cfg = JSON.parse(fs.readFileSync('./Data/servers.json','utf8'));

for(i in cfg){
    var tmp = new NIL.CLASS.ws_ser(i,cfg[i].url,NIL.TOOL.MD5(cfg[i].pwd).substr(0,16),NIL.TOOL.MD5(cfg[i].pwd).substr(16,32));
    NIL.SERVERS[i] = tmp;
}


NIL.Logger.info("[INITS]",'服务器列表加载中...');