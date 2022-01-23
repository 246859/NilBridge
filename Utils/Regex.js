const fs = require('fs');
const phelper = require("./PackHelper");
var sd = require('silly-datetime');
var regexs = [];

/**
 * 加载文件
 */
function loadFile(){
    try{
        fs.statSync('Data/regex.json');
        regexs = JSON.parse(fs.readFileSync('Data/regex.json','utf8'));
        NIL.Logger.info('REGEX','正则表达式重载完成');
    }catch(err){
        NIL.Logger.warn('REGEX','error when load file :'+err);
        fs.writeFileSync('Data/regex.json','[]','utf8');
    }
}

String.prototype.replaceall = function(s1,s2) {
    var rt = this;
	while (rt.indexOf(s1)!=-1) {
		rt = rt.replace(s1,s2);
	}
	return rt;
}


function buildString(str,reg){
    var i = 0;
    reg.forEach(s=>{
        str = str.replaceall(`\$${i}`,s);
        i++
    });
    return str;
}

function format(str,member,e){
    if(NIL.XDB.wl_exsits(member)) str = str.replaceall('%MEMBER_XBOXID%',NIL.XDB.get_xboxid(member));
    if(str.indexOf('MEMBER')!=-1){
        const mb = NIL.bot.GetGroupMember(e.group_id,member);
        str = str.replaceall("%MEMBER_QQ_NICK%",mb.card);
        str = str.replaceall("%MEMBER_QQ_ID%",member);
    }
    var ats = NIL.TOOL.getAt(e);
    if(ats.length != 0){
        str = str.replaceall("%AT_QQ_ID%",ats[0]);
        if(NIL.XDB.wl_exsits(ats[0])) str = str.replaceall('%AT_MEMBER_XBOXID%',NIL.XDB.get_xboxid(ats[0]));
    }
    if(str.indexOf("COMPUTER") !=-1){
        str = str.replaceall('%COMPUTER_CPU_PERCENT%',NIL.TOOL.COMPUTER.CPU_PERCENT);
        str = str.replaceall('%COMPUTER_RAM_LESS%',NIL.TOOL.COMPUTER.RAM_FREE);
        str = str.replaceall('%COMPUTER_RAM_TOTAL%',NIL.TOOL.COMPUTER.RAM_TOTAL);
        str = str.replaceall('%COMPUTER_RAM_PERCENT%',NIL.TOOL.COMPUTER.RAM_PERCENT );
        str = str.replaceall('%COMPUTER_RAM_USED%',NIL.TOOL.COMPUTER.RAM_USED);
    }
    if(str.indexOf("SERVER") != -1){
        for(var i in NIL.SERVERS){
            str = str.replaceall(`%SERVER_ONLINE_COUNT_${i}%`,NIL.SERVERS[i].getOnline().length);
            str = str.replaceall(`%SERVER_MAXPLAYER_${i}%`,NIL.SERVERS[i].maxplayer);
        }
    }
    if(str.indexOf("DATETIME") != -1){
        var d = new Date();
        str = str.replaceall('%DATETIME_NOW%',sd.format(d));
        str = str.replaceall('%DATETIME_NOW_DATE%',sd.format(d,'YYYY-MM-DD'));
        str = str.replaceall('%DATETIME_NOW_TIME%',sd.format(d,'HH:mm:ss'));
        str = str.replaceall("%DATETIME_NOW_YEAR%",sd.format(d,'YYYY'));
        str = str.replaceall("%DATETIME_NOW_MONTH%",sd.format(d,'MM'));
        if(/%DATETIME_NOW_PARSE_(.*)%/.test(str)){
            var et = /%DATETIME_NOW_PARSE_(.*)%/.exec(str)
            str = str.replaceall(`%DATETIME_NOW_PARSE_${et[1]}%`,sd.format(d,et[1]));
        }
    }
    return str.toString();
}

function Regex(e){
    const raw = NIL.TOOL.GetPlainText(e);
    regexs.forEach(re => {
        if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id) ==-1 && re.permission == 1)return;
        re.out.forEach(it=>{
            var cs = raw.match(re.Regex);
            if(cs==null) return;
            var text = format(buildString(it.text,cs),e.sender.user_id,e);
            switch(it.type){
                case "runcmdall":
                    phelper.RunCMDAll(text);
                    break;
                case "group":
                    e.reply(text);
                    break;
                case "group_quote":
                    e.reply(text,true);
                    break;
                case "textall":
                    phelper.sendTextAll(text);
                    break;
                case "http_get":
                    NIL.TOOL.HttpGet(text,(err,dt)=>{
                        if(err == null) e.reply(dt);
                    });
                    break;
                case "run_code":
                    try{
                        eval(text);
                    }catch(err){
                        e.reply(err.toString());
                    }
                    break;
                case "nb_cmd":
                    NIL.NBCMD.run_cmd(text,(err,res)=>{
                        if(err){
                            e.reply(`执行出错：${err}`);
                        }else{
                            e.reply(res);
                        }
                    });
                    break;
                default:
                    NIL.Logger.warn('[REGEX]',`未定义的执行模式:${it.type}`);
                    break;
            }
        });
    });
}

NIL.FUNC.NATIVE.GROUP.push(Regex);

module.exports = {
    loadFile
};

loadFile();

NIL.Logger.info("REGEX",'正则表达式模块加载完毕');