
/**
 * 获取消息链中所有被At的QQ
 * @param e oicq消息对象
 * @returns 消息对象中所有被At的QQ号
 */
NIL.TOOL.getAt = function(e){
    var at = [];
    for(i in e.message){
        switch(i.tyep){
            case "'at":
                at.pop(i.qq);
        }
    }
    return at;
};