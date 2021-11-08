const WebSocketClient = require('websocket').client;

NIL.CLASS.ws_ser = class{
    static k;
    static iv;
    static ws;
    static name;
    constructor(name,url,key,iv){
        this.k = key;
        this.iv = iv;
        this.name = name;
        this.url =  url;
        this.ws = new WebSocketClient();
        this.ws.on('connect',(con)=>{
            NIL.Logger.info('[WS]',`[${this.name}]`,'连接成功');
            con.on('close',(code,desc)=>{
                NIL.Logger.warn('[WS]',`[${this.name}]`,`连接断开(${code})：${desc}`);
                NIL.Logger.info('[WS]',`[${this.name}]`,'准备5秒后自动重连');
                setTimeout(()=>{
                    this.ws.connect(this.url);
                },5000);
            });
            con.on('message',(str)=>{
                try{
                    NIL.Logger.debug(str.utf8Data);
                    NIL.FUNC.ws_onpack(this.name,str.utf8Data);
                }catch(err){
                    NIL.Logger.error('[WS]',`[${this.name}]`,err);
                }
            });
            con.on('error',(err)=>{
                NIL.Logger.error('[WS]',`[${this.name}]`,`连接出错：${err}`);
            });
        });
        this.ws.on('connectFailed',(err)=>{
            NIL.Logger.warn('[WS]',`[${this.name}]`,`连接失败：${err}`);
            NIL.Logger.info('[WS]',`[${this.name}]`,'准备5秒后自动重连');
            setTimeout(()=>{
                this.ws.connect(this.url);
            },5000);
        });
        this.ws.connect(this.url);
    }
}