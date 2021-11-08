NIL.TOOL.GUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/** 
* 执行命令数据包
* @param k 加密密匙
* @param iv 加密偏移量
* @param cmd 要执行的命令
*/
NIL.TOOL.GetRuncmdPack = function(k,iv,cmd){
    var p = {
        type : "pack",
        action : "runcmdrequest",
        params : {
            cmd : cmd,
            id : NIL.TOOL.GUID()
        }
    }
    return NIL.TOOL.GetEncryptPack(k,iv,JSON.stringify(p))
}
/** 
* 发送文本数据包
* @param k 加密密匙
* @param iv 加密偏移量
* @param text 发送到服务端的文本
*/
NIL.TOOL.GetSendTextPack = function(k,iv,text){
    var p = {
        type : "pack",
        action : "sendtext",
        params : {
            text : text,
            id : NIL.TOOL.GUID()
        }
    }
    return NIL.TOOL.GetEncryptPack(k,iv,JSON.stringify(p))
}

NIL.TOOL.GetEncryptPack = function(k,iv,pack){
    var p = {
        type : "encrypted",
        params : {
            mode : "aes_cbc_pck7padding",
            raw : NIL.TOOL.AESencrypt(k,iv,pack)
        }
    };
    return JSON.stringify(p);
}

NIL.Logger.info('[PH]','PACKHELPER 加载完成');