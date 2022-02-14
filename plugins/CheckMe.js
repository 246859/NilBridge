function checkme(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(e.raw_message == '我的统计'){
        if(NIL.XDB.wl_exsits(e.sender.user_id)){
            var pl = NIL.XDB.get_player(e.sender.user_id);
            var str = `玩家名: ${pl.xboxid}\n进服次数: ${pl.count.join}\n游玩时间: ${timeFormat(pl.count.duration)} 小时`;
            e.reply(str);
        }else{
            e.reply('你还没绑定xboxid!',true);
        }
    }
}

function timeFormat(dur){
    if (dur!==0){
        let hour=3600*10000;
        return (dur/hour).toFixed(2);
    }
    return 0;
}

function onStart(){
    NIL.FUNC.PLUGINS.GROUP.push(checkme);
    NIL.Logger.info('CHECKME','爷被加载辣');
    NIL.Logger.info('CHECKME','在主群中发送 "我的统计" 即可查看统计数据');
}

function onStop(){
    NIL.Logger.info('CHECKME','爷被卸载辣');
}

module.exports = {
    onStart,
    onStop
};