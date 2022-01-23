const WebSocketClient = require('websocket').client;
const helper = require("./PackHelper")

NIL.CLASS.ws_ser = class{
    constructor(name,url,key,iv){
        this.k = key;
        this.iv = iv;
        this.name = name;
        this.url =  url;
        this._online = [];
        this._maxplayer = 0;
        this._onlineplayer = 0;
        this._ifConnect = false;
        this.ws = new WebSocketClient();
        this.ws.on('connect',(con)=>{
            this.con = con;
            this._ifConnect = true;
            NIL.Logger.info('WS',`[${this.name}]`+' 连接成功');
            con.on('close',(code,desc)=>{
                NIL.Logger.warn('WS',`[${this.name}] 连接断开(${code})：${desc}`);
                NIL.Logger.info('WS',`[${this.name}]`+' 准备5秒后自动重连');
                this._ifConnect = false;
                setTimeout(()=>{
                    this.ws.connect(this.url);
                },5000);
            });
            con.on('message',(str)=>{
                NIL.FUNC.NATIVE.WS.forEach(element => {
                    try{
                        //NIL.Logger.debug(str.utf8Data);
                        element(this.name,str.utf8Data);
                    }catch(err){
                        NIL.Logger.error('WS -> '+element.name,`[${this.name}]`);
                        console.log(err);
                    }
                });
            });
            con.on('error',(err)=>{
                NIL.Logger.warn('WS',`[${this.name}] 连接出错：${err}`);
            });
        });
        this.ws.on('connectFailed',(err)=>{
            this._ifConnect = true;
            NIL.Logger.warn('WS',`[${this.name}] 连接失败：${err}`);
            NIL.Logger.info('WS',`[${this.name}]`+' 准备5秒后自动重连');
            setTimeout(()=>{
                this.ws.connect(this.url);
            },5000);
        });
        this.ws.connect(this.url);
    }
    sendCMD(str,ifback = true){
        try{
            NIL.Logger.info('WS',`[${this.name}]`+' 发信 -> runcmdrequest');
            this.con.sendUTF(helper.GetRuncmdPack(this.k,this.iv,str,ifback));
        }catch(err){
            NIL.Logger.error('WS',err);
        }
    }
    sendText(str){
        try{
            NIL.Logger.info('WS',`[${this.name}]`+' 发信 -> sendtext');
            this.con.sendUTF(helper.GetSendTextPack(this.k,this.iv,str));
        }catch(err){
            NIL.Logger.error('WS',err);
        }
    }
    sendStart(){
        try{
            NIL.Logger.info('WS',`[${this.name}]`+' 发信 -> startrequest');
            this.con.sendUTF(helper.GetStartPack(this.k,this.iv));
        }catch(err){
            NIL.Logger.error('WS',err);
        }
    }
    sendStop(){
        try{
            NIL.Logger.info('WS',`[${this.name}]`+' 发信 -> startrequest');
            this.con.sendUTF(helper.GetStopPack(this.k,this.iv));
        }catch(err){
            NIL.Logger.error('WS',err);
        }
    }
    getOnline(){
        return this._online;
    }
    addOnline(pl){
        if(this._online.indexOf(pl) == -1)
            this._online.push(pl);
    }
    removeOnline(pl){
        if(this._online.indexOf(pl) != -1){
            this._online.splice(this._online.indexOf(pl),1);
        }
    }
    setOnline(ol){
        if(Array.isArray(ol))
            this._online = ol;
    }
    setOnlineInt(num){
        this._onlineplayer = Number(num);
    }

    setMax(i){
        this._maxplayer = Number(i);
    }
    get maxplayer(){
        return this._maxplayer;
    }
    get _onlineCount(){
        return this._onlineplayer;
    }
    get _connected(){
        return this._ifConnect;
    }
}

NIL.Logger.info('WSC','websocket模块加载完毕');