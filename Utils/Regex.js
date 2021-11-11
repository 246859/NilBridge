const fs = require('fs');

var regexs = [];

try{
    fs.statSync('Data/regex.json');
    regexs = JSON.parse(fs.readFileSync('Data/regex.json','utf8'));
}catch(err){
    NIL.Logger.warn('[REGEX]','error when load file :'+err);
    fs.writeFileSync('Data/regex.json','[]','utf8');
}

function buildString(str,reg){
    var i = 0;
    reg.forEach(s=>{
        str = str.replace('$'+i,s);
        i++
    });
    return str;
}

function format(str,member,e){
    if(NIL.XDB.wl_exsis(member)) str = str.replace('%MEMBER_XBOXID%',NIL.XDB.get_xboxid(member));
    if(str.indexOf('MEMBER')!=-1){
        const mb = NIL.bot.GetGroupMember(e.group_id,member);
        str = str.replace("%MEMBER_QQ_NICK%",mb.card);
        str = str.replace("%MEMBER_QQ_ID%",member);
    }
    var ats = NIL.TOOL.getAt(e);
    if(ats.length != 0){
        str = str.replace("%AT_QQ_ID%",ats[0]);
        if(NIL.XDB.wl_exsis(ats[0])) str = str.replace('%AT_MEMBER_XBOXID%',NIL.XDB.get_xboxid(ats[0]));
    }
    if(str.indexOf("COMPUTER") !=-1){
        str = str.replace('%COMPUTER_CPU_PERCENT%',NIL.TOOL.COMPUTER.CPU_PERCENT);
        str = str.replace('%COMPUTER_RAM_LESS%',NIL.TOOL.COMPUTER.RAM_FREE);
        str = str.replace('%COMPUTER_RAM_TOTAL%',NIL.TOOL.COMPUTER.RAM_TOTAL);
        str = str.replace('%COMPUTER_RAM_PERCENT%',NIL.TOOL.COMPUTER.RAM_PERCENT );
        str = str.replace('%COMPUTER_RAM_USED%',NIL.TOOL.COMPUTER.RAM_USED);
    }
    return str;
}

function Regex(e){
    const raw = NIL.TOOL.GetPlainText(e);
    regexs.forEach(re => {
        if(!NIL.CONFIG.ADMIN.indexOf(e.sender.user_id) && re.permission == 1)return;
        re.out.forEach(it=>{
            var cs = raw.match(re.Regex);
            if(cs==null) return;
            var text = format(buildString(it.text,cs),e.sender.user_id,e);
            switch(it.type){
                case "rucmdall":
                    NIL.TOOL.RunCMDAll(text);
                    break;
                case "group":
                    e.reply(text);
                    break;
                case "textall":
                    NIL.TOOL.sendTextAll(text);
                    break;
                case "http_get":
                    NIL.TOOL.HttpGet(text,(err,dt)=>{
                        if(err != null) e.reply(dt);
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

NIL.Logger.info("[REGEX]",'正则表达式模块加载完毕');