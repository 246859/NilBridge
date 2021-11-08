

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
    NIL.Logger.info('[WS]',`[${ser}]`,`收信 -> ${pack.cause}`);
    switch(pack.cause){
        case "server_start":
            NIL.bot.sendMainMessage(`[${ser}] 服务器已开启`)

    }
}



NIL.Logger.info('[WSR]','WS通讯模块加载成功');