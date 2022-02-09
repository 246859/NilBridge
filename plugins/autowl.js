function autowl(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(e.raw_message == "申请白名单"){
        if(NIL.XDB.wl_exsits(e.sender.user_id)){
            for(var ser in NIL.SERVERS){
                NIL.SERVERS[ser].sendCMD(`whitelist add "${NIL.XDB.get_xboxid(e.sender.user_id)}"`)
            }
        }else{
            e.reply('你还没绑定xboxid!',true);
        }
    }
}


function onStart(){
    NIL.FUNC.PLUGINS.GROUP.push(autowl);
    NIL.Logger.info('AUTOWL','爷被加载辣');
    NIL.Logger.info('AUTOWL','在主群中发送 "申请白名单" 即可向所有服务器执行添加白名单命令');
}

function onStop(){
    NIL.Logger.info('AUTOWL','爷被卸载辣');
}

module.exports = {
    onStart,
    onStop
};