const fs = require("fs");

try{
    fs.statSync('./Data/servers.json')
  }catch{
    fs.mkdirSync('./Data/');
    fs.writeFileSync('./Data/servers.json',JSON.stringify({"生存服务器":{"url":"ws://127.0.0.1:8800/mc","pwd":"passwd"}},null,"\t"));
  }
var cfg = JSON.parse(fs.readFileSync('./Data/servers.json','utf8'));

for(i in cfg){
    var tmp = new NIL.CLASS.ws_ser(i,cfg[i].url,NIL.TOOL.MD5(cfg[i].pwd).substr(0,16),NIL.TOOL.MD5(cfg[i].pwd).substr(16,32));
    NIL.SERVERS[i] = tmp;
}


NIL.Logger.info("[INITS]",'服务器列表加载中...');