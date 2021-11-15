
var time = {};

function ws_onpack (ser,jsonstr){
    var server = NIL.SERVERS[ser];
    var pack = JSON.parse(jsonstr);
    var packtext = '';
    if(pack.type == 'encrypted'){
        try{
            packtext = NIL.TOOL.AESdecrypt(server.k,server.iv,pack.params.raw)
        }
        catch(err){
            NIL.Logger.error('WS',`与服务器[${ser}]的数据包解密失败：${err}！！！请检查密匙是否正确`);
            return;
        }
        ws_onpack_item(ser,packtext);
        NIL.FUNC.PLUGINS.WS.forEach(element => {
            try{
                //NIL.Logger.debug(str.utf8Data);
                element(ser,packtext);
            }catch(err){
                NIL.Logger.error('WS',err);
            }
        });
    }
    else if(pack.type == 'pack'){
        ws_onpack_item(ser,jsonstr);
    }
    else{
        NIL.Logger.error('WS',`接收到未知的数据包:${pack.type}`);
    }
}

function ws_onpack_item(ser,str){
    var pack = JSON.parse(str);
    NIL.Logger.info('WS',`[${ser}] 收信 <- ${pack.cause}`);
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
            send2Other(ser,'chat',pack.params.sender,pack.params.text);
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_CHAT',ser,pack.params.sender,pack.params.text));
            break;
        case "left":
            send2Other(ser,'left',pack.params.sender,'','');
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_LEFT',ser,pack.params.sender));
            if(time[pack.params.sender]!=undefined){
               NIL.XDB.add_time(pack.params.sender,'time', Math.ceil((new Date() - time[pack.params.sender])/6000));
               delete time[pack.params.sender];
            }
            break;
        case "join":
            var t = 0;
            if(NIL.XDB.xboxid_exsis(pack.params.sender)) t = NIL.XDB.get_player(NIL.XDB.get_qq(pack.params.sender)).count.join;
            send2Other(ser,'join',pack.params.sender,'','');
            NIL.bot.sendChatMessage(NIL.LANG.get('MEMBER_JOIN',ser,pack.params.sender,(t+1).toString()));
            NIL.XDB.add_time(pack.params.sender,'join',1);
            time[pack.params.sender] = new Date();
            break;
        default:
            NIL.Logger.warn('WS',`接收到未知的数据包:${pack.cause}`);
            //NIL.bot.sendMainMessage(`从服务器[${ser}]接收到未知的数据包：${pack.cause}`)
            break;
    }
}

function send2Other(ser,mode,pl,t){
    var txt = '';
    switch(mode){
        case "chat":
            txt = NIL.LANG.get('SERVER_MEMBER_CHAT',ser,pl,t);
            break;
        case "join":
            txt = NIL.LANG.get('SERVER_MEMBER_JOIN',ser,pl);
            break;
        case "left":
            txt = NIL.LANG.get('SERVER_MEMBER_LEFT',ser,pl);
            break;
    }
    for(i in NIL.SERVERS){
        if(i != ser)
            NIL.SERVERS[i].sendText(txt);
    }
}

NIL.FUNC.NATIVE.WS.push(ws_onpack);

NIL.Logger.info('WSR','WS通讯模块加载成功');