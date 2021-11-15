function checkme(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(e.raw_message == '我的统计'){
        if(NIL.XDB.wl_exsis(e.sender.user_id)){
            var pl = NIL.XDB.get_player(e.sender.user_id);
            var str = `[${pl.xboxid}]\n加入次数：${pl.count.join}\n游玩时间：${pl.count.duration}`;
            e.reply(str);
        }else{
            e.reply('你还没绑定xboxid!',true);
        }
    }
}
NIL.FUNC.PLUGINS.GROUP.push(checkme);
NIL.Logger.info('CHECKME','爷被加载辣');
NIL.Logger.info('CHECKME','在主群中发送 "我的统计" 即可查看统计数据');