const fs = require("fs");

const dbkey ={k: NIL.TOOL.MD5("20040614").substring(0,16),iv:NIL.TOOL.MD5("20040614").substring(16,32)}

var db = {};

try{
  fs.statSync('./Data/playerdata.xdb')
}catch{
  fs.writeFileSync('./Data/playerdata.xdb',NIL.TOOL.AESencrypt(dbkey.k,dbkey.iv,"{}"));
}

db = JSON.parse(NIL.TOOL.AESdecrypt(dbkey.k,dbkey.iv,fs.readFileSync('./Data/playerdata.xdb','utf8')));


NIL.XDB.wl_exsits = function(qq){
    return db[qq] != undefined;
}

NIL.XDB.wl_add = function(qq,id){
    if(this.wl_exsits(qq)) return false;
    db[qq] = {xboxid:id,count:{join:0,death:0,duration:0}};
    NIL.XDB.save();
    return true;
};

NIL.XDB.wl_remove = function(qq){
    if(NIL.XDB.wl_exsits(qq)) {
        delete db[qq];
        NIL.XDB.save();
    }
};

NIL.XDB.get_xboxid = function(id){
    if(NIL.XDB.wl_exsits(id))
        return db[id].xboxid;
}

NIL.XDB.get_qq = function(id){
    for(i in db){
        if(db[i].xboxid == id)
            return i;
    }
    return 0;
}

NIL.XDB.xboxid_exsits = function(id){
    for(i in db){
        if(db[i].xboxid == id)
            return true;
    }
    return false;
}

NIL.XDB.get_player = function(qq){
    if(NIL.XDB.wl_exsits(qq))
        return db[qq];
}

NIL.XDB.get_all = function(){
    return db;
}

NIL.XDB.add_time = function(pl,mode,t){
    if(NIL.XDB.xboxid_exsits(pl)==false)return;
    switch(mode){
        case "join":
            db[NIL.XDB.get_qq(pl)].count.join +=t;
            break;
        case "death":
            db[NIL.XDB.get_qq(pl)].count.death +=t;
            break;
        case "time":
            db[NIL.XDB.get_qq(pl)].count.duration +=t;
            break;
    }
    NIL.XDB.save();
}

NIL.XDB.save = function(){
    NIL.Logger.info("XDB",'saving...')
    fs.writeFileSync('./Data/playerdata.xdb',NIL.TOOL.AESencrypt(dbkey.k,dbkey.iv,JSON.stringify(db)));
}


NIL.Logger.info('XDB','玩家数据加载成功');