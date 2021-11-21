const ping = require('mcpe-ping');
function on_ping(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(e.raw_message.startsWith("!motdpe")){
        if(e.raw_message.split(' ').length == 1){e.reply('请指定一个motdpe地址！',true);return};
        var target = e.raw_message.substr(8);
        var host = target;
        var port = 19132;
        if(target.indexOf(':') != -1){
            port = Number(target.split(':')[1]);
            host = target.split(':')[0];
        }
        ping(host,port,(err,dt)=>{
            try{
                if(err != null){
                    e.reply('服务器离线',true);
                    return;
                }
                var inf = dt.advertise.split(';');
                var str = `[MCBE服务器信息]\n协议版本：${inf[2]}\n游戏版本：${dt.version}\n描述文本：${dt.cleanName}\n在线人数：${dt.currentPlayers}/${dt.maxPlayers}\n存档名称：${inf[7]}\n游戏模式：${inf[8]}`
                e.reply(str);
            }catch(err){
                e.reply('motd出错：'+err);
            }
            
        });
    }
}
function onStart(){
    NIL.FUNC.PLUGINS.GROUP.push(on_ping);
    NIL.Logger.info('MOTDPE','服务器查询插件装载成功');
    NIL.Logger.info('MOTDPE','在主群中发送 "!motdpe xxxx:xxx" 即可查询服务器信息');
}

function onStop(){
    NIL.Logger.info('MOTDPE','插件已卸载');
}

module.exports = {
    onStart,
    onStop
};