
var time = {};

NIL.FUNC.ws_onpack = function(ser,jsonstr){
    var server = NIL.SERVERS[ser];
    var pack = JSON.parse(jsonstr);
    if(pack.type == 'encrypted'){
        NIL.FUNC.ws_onpack_item(ser,NIL.TOOL.AESdecrypt(server.k,server.iv,pack.params.raw));
    }
    else if(pack.type == 'pack'){
        NIL.FUNC.ws_onpack_item(ser,jsonstr);
    }
    else{
        NIL.Logger.error('[WS]',`接收到未知的数据包:${pack.type}`);
    }
}

NIL.FUNC.ws_onpack_item = function(ser,str){
    var pack = JSON.parse(str);
    NIL.Logger.info('[WS]',`[${ser}]`,`收信 <- ${pack.cause}`);
    switch(pack.cause){
        case "server_start":
            NIL.bot.sendMainMessage(NIL.LANG.get("SERVER_START",ser));
            break;
        case "server_stop":
            NIL.bot.sendMainMessage(NIL.LANG.get("SERVER_STOP",ser));
            break;
        case "runcmdfeedback":
            NIL.bot.sendMainMessage(NIL.LANG.get("CMD_FEEDBACK",ser,pack.params.result));
            break;
        case "decodefailed":
            NIL.bot.sendMainMessage(NIL.LANG.get("WSPACK_RECEIVE_ERROR",ser,pack.params.msg));
            break;
        case "chat":
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_CHAT',ser,pack.params.sender,pack.params.text));
            break;
        case "left":
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_LEFT',ser,pack.params.sender));
            if(time[pack.params.sender]!=undefined){
               NIL.XDB.add_time(pack.params.sender,'time', Math.ceil((new Date() - time[pack.params.sender])/1000));
               delete time[pack.params.sender];
            }
            break;
        case "join":
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_JOIN',ser,pack.params.sender));
            NIL.XDB.add_time(pack.params.sender,'join',1);
            tmie[pack.params.sender] = new Date();
            break;
    }
}

NIL.Logger.info('[WSR]','WS通讯模块加载成功');