
/**
 * 获取消息链中所有被At的QQ
 * @param e oicq消息对象
 * @returns 消息对象中所有被At的QQ号(数组)
 */
NIL.TOOL.getAt = function(e){
    var at = [];
    for(i in e.message){
        switch(e.message[i].type){
            case "at":
                at.push(e.message[i].qq);
                break;
        }
    }
    return at;
};

/**
 * 按照Lang文件格式化消息
 * @param e oicq消息对象
 * @returns 格式化后的信息字符串
 */
NIL.TOOL.GetFormatText = function(e){
    var rt = '';
    for(i in e.message){
        //NIL.Logger.debug(e.message[i]);
        switch(e.message[i].type){
            case "at":
                if(e.message[i].qq.toString() == 'all'){
                    rt+=NIL.LANG.get("MESSAGE_AT_ALL");
                    continue;
                }
                rt+= NIL.LANG.get('MESSAGE_AT',NIL.XDB.wl_exsits(e.message[i].qq)?NIL.XDB.get_xboxid(e.message[i].qq):e.message[i].qq);
                break;
            case"image":
                rt+= NIL.LANG.get("MESSAGE_IMAGE");
                break;
            case"text":
                rt+= e.message[i].text;
                break;
        }
    }
    return rt;
}
/**
 * 获取消息中的纯文本
 * @param e oicq消息对象
 * @returns 纯文本
 */
NIL.TOOL.GetPlainText = function(e){
    var rt = '';
    for(i in e.message){
        switch(e.message[i].type){
            case"text":
                rt+= e.message[i].text;
                break;
        }
    }
    return rt;
}