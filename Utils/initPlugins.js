const fs = require('fs');
const path = require('path');

var pls = {};

var mods = [];
/*
let components = []
const files = fs.readdirSync('./plugins')
files.forEach(function (item, index) {
    let stat = fs.lstatSync("./plugins/" + item)
    if (stat.isDirectory() === true) { 
      components.push(item)
    }
})

console.log(components);
*/

try{
    fs.statSync('./plugins/config.json')
  }catch{
    fs.writeFileSync('./plugins/config.json','{}','utf8');
}

var pls = JSON.parse(fs.readFileSync('./plugins/config.json','utf8'));

NIL.FUNC.plload = function(){
    var cfg = {};
    fs.readdirSync('./plugins/').forEach(p=>{
        try{
            var pt = path.join(__dirname,'../plugins',p);
            if(fs.statSync(pt).isFile() &&  p != 'config.json'){ 
                if(pls[p] == false) return;
                NIL.Logger.info('PLoader','loading '+p);
                var part = require(pt);
                mods.push(part);
                part.onStart();
                NIL.PLUGINS.push(pt);
                cfg[p] = true
            }
        }catch(err){
            NIL.Logger.error('PLoader',err);
        }
    });
    fs.writeFileSync('./plugins/config.json',JSON.stringify(cfg,null,'\t'),'utf8');
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
    mods.forEach(p=>{
        try{
            p.onStop();
        }catch(err){
            NIL.Logger.error('PLoader',err);
        }
    });
    mods = [];
    NIL.PLUGINS = [];
    NIL.FUNC.PLUGINS.GROUP = [];
    NIL.FUNC.PLUGINS.WS = [];
}

NIL.Logger.info('PLoader','插件模块载入成功');