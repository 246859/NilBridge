function wl(args){
    switch(args[0]){
        case "set":
            if(args[1]&&args[2]){
                if(!NIL.XDB.wl_exsits(args[1])){
                    NIL.XDB.wl_add(args[1],w1[2]);
                    return `已将玩家${args[2]}加入白名单列表`;
                }else{
                    return "玩家已存在于白名单列表之中";
                }
            }
            break;
        case "get":
            if(args[1]){
                if(NIL.XDB.wl_exsits(args[1])){
                    return NIL.XDB.get_xboxid(args[1]);
                }else if(NIL.XDB.xboxid_exsits(args[1])){
                    return NIL.XDB.get_qq(args[1]);
                }else{
                    return '玩家未找到';
                }
            }
            break;
        case "remove":
            if(args[1]){
                if(NIL.XDB.wl_exsits(args[1])){
                    NIL.XDB.wl_remove(args[1]);
                    return `QQ成员${args[1]}已从白名单列表移除`;
                }else if(NIL.XDB.xboxid_exsits(args[1])){
                    NIL.XDB.wl_remove(NIL.XDB.get_qq(args[1]));
                    return `XBOXID成员：${args[1]}已从白名单列表移除`;
                }else{
                    return '玩家未找到';
                }
            }
            break;
        default:
            return '没有这个重载：'+args[0];
    }
    return '指令参数错误';
}



function onStart(){
    NIL.NBCMD.regUserCmd('wl',wl);
    NIL.Logger.info('WLHelper','插件装载成功');
}

function onStop(){
    NIL.NBCMD.remUserCmd('wl');
    NIL.Logger.info('WLHelper','插件已卸载');
}

module.exports = {
    onStart,
    onStop
};
