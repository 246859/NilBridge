function start_and_stop(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id)== -1)return;
    var pt = e.raw_message.split(' ');
    switch(pt[0]){
        case "开服":
            if(pt.lenght <2) return;
            if(NIL.SERVERS[pt[1]] == undefined){
                e.reply(`没有名为${pt[1]}的服务器`,true);
                return;
            }
            NIL.SERVERS[pt[1]].sendStart();
            e.reply(`正在尝试开启[${pt[1]}]`);
            break;
        case "关服":
            if(pt.lenght <2) return;
            if(NIL.SERVERS[pt[1]] == undefined){
                e.reply(`没有名为${pt[1]}的服务器`,true);
                return;
            }
            NIL.SERVERS[pt[1]].sendStop();
            e.reply(`正在尝试关闭[${pt[1]}]`);
            break;
    }
}

function log(msg) {
    NIL.Logger.info('start_and_stop', msg);
}

function onStart(){
    log('加载成功');
    log('如果想正常使用本插件功能请用Nillauncher启动服务端');
    NIL.FUNC.PLUGINS.GROUP.push(start_and_stop);
}
function onStop(){
    log('插件已卸载');
}
module.exports = {
    onStart,
    onStop
};
