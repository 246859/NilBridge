const fs = require("fs");
NIL.Logger.info("INITS",'开始加载服务器列表...');

try{
    fs.statSync('./Data/servers.json')
  }catch{
    fs.mkdirSync('./Data/')
    NIL.Logger.info("INITS",'servers.json 不存在，自动创建...');
    fs.writeFileSync('./Data/servers.json',JSON.stringify({"生存服务器":{"url":"ws://127.0.0.1:8800/mc","pwd":"passwd"}},null,"\t"));
}
var cfg = JSON.parse(fs.readFileSync('./Data/servers.json','utf8'));

for(i in cfg){
  NIL.Logger.info('INITS',`loading server ${i}`);
    var tmp = new NIL.CLASS.ws_ser(i,cfg[i].url,NIL.TOOL.MD5(cfg[i].pwd).substr(0,16),NIL.TOOL.MD5(cfg[i].pwd).substr(16,32));
    tmp.setMax(10);
    tmp.setOnline([]);
    NIL.SERVERS[i] = tmp;

}

NIL.Logger.info("INITS",`成功加载${Object.keys(NIL.SERVERS).length}个服务器`);
NIL.Logger.info("INITS",'服务器列表加载完成');