const pm = require('./PluginManager');
const regex = require('./Regex');
var user_cmds = new Map();
var console_cmds = new Map();

function run_cmd(cmd,callback){
    const args = cmd.split(' ');
    if(user_cmds.has(args[0])){
        try{
            callback(null,user_cmds.get(args[0])(args.slice(1,args.length)));
        }catch(err){
            callback(err);
        }
    }else{
        callback('没有这个命令：'+args[0]);
    }
}

function run_console_cmd(cmd){
    const args = cmd.split(' ');
    if(console_cmds.has(args[0])){
        try{
            console_cmds.get(args[0])(args.slice(1,args.length));
        }catch(err){
            console.warn(err);
        }
    }else{
        NIL.Logger.warn('NBCMD','没有这个命令：'+args[0]);
    }
}

function regUserCmd(key,callback){
    if(user_cmds.has(key))return false;
    user_cmds.set(key,callback);
    return true;
}

function remUserCmd(key){
    if(user_cmds.has(key)){
        user_cmds.delete(key);
        return true;
    }
    return false;
}

function regConsoleCmd(key,callback){
    if(console_cmds.has(key))return false;
    console_cmds.set(key,callback);
    return true;
}

function remConsoleCmd(key){
    if(console_cmds.has(key)){
        console_cmds.delete(key);
        return true;
    }
    return false;
}

NIL.NBCMD = {
    regUserCmd,
    remUserCmd,
    regConsoleCmd,
    remConsoleCmd,
    run_cmd,
    run_console_cmd
}

regConsoleCmd('stop',(args)=>{
    NIL.Logger.info('NIL','正在保存数据..');
	NIL.XDB.save();
	NIL.Logger.info('NIL','正在卸载插件..');
	pm.clear();
	NIL.Logger.info('NIL','准备退出');
	NIL.bot.logout();
	setTimeout(function(){process.exit(0)},1000)
});

regConsoleCmd('plreload',(args)=>{
    NIL.Logger.info('NIL','正在重载插件');
	pm.clear();
	pm.loadAll();
});

regConsoleCmd('regreload',(arg)=>{
    NIL.Logger.info('NIL','正在重载正则表达式文件..');
    regex.loadFile();
});