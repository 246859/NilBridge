const fs = require('fs');

NIL.FUNC.plload = function(){
    fs.readdirSync('./plugins/').forEach(p=>{
        try{
            require('../plugins/'+p);
            NIL.PLUGINS.push('../plugins/'+p);
        }catch(err){
            NIL.Logger.error('[PLoader]',err);
        }
    });
}


Array.prototype.indexOf = function(val) { 
    for (var i = 0; i < this.length; i++) { 
        if (this[i] == val) 
            return i; 
    } 
    return -1; 
};
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
 };
NIL.FUNC.clear = function(){
    NIL.PLUGINS.forEach(pl=>{
        delete require.cache[require.resolve(pl)];
    });
    NIL.PLUGINS = [];
    NIL.FUNC.PLUGINS.GROUP = [];
    NIL.FUNC.PLUGINS.WS = [];
}

NIL.Logger.info('[PLUGINS]','插件模块载入成功');