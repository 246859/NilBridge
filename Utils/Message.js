
/**
 * 获取消息链中所有被At的QQ
 * @param e oicq消息对象
 * @returns 消息对象中所有被At的QQ号
 */
NIL.TOOL.getAt = function(e){
    var at = [];
    for(i in e.message){
        switch(e.message[i].type){
            case "'at":
                at.pop(e.message[i].qq);
        }
    }
    return at;
};

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
                rt+= NIL.LANG.get('MESSAGE_AT',e.message[i].qq);
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