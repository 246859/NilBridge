const fs = require('fs');
const path = require('path');

var pls = {};

var mods = {};
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


/**
 * 装载所有插件
 */
function loadAll(){
    var cfg = {};
    fs.readdirSync('./plugins/').forEach(p=>{
        try{
            var pt = path.join(__dirname,'../plugins',p);
            if(fs.statSync(pt).isFile() &&  p != 'config.json'){ 
                if(pls[p] == false){ cfg[p]=false; return};
                NIL.Logger.info('PLoader','loading '+p);
                var part = require(pt);
                mods[pt] = part;
                part.onStart();
                NIL.PLUGINS[p] = pt;
                cfg[p] = true
            }
        }catch(err){
            NIL.Logger.error('PLoader -> '+p,err);
        }
    });
    fs.writeFileSync('./plugins/config.json',JSON.stringify(cfg,null,'\t'),'utf8');
}

Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};

function unload(name){
    var pt = path.join(__dirname,'../plugins',name);
    try{mods[pt].onStop();}catch{}
    delete NIL.PLUGINS[name];
    delete mods[pt];
    delete require.cache[require.resolve(pt)];
}

/**
 * 卸载所有插件
 * 并清空插件注册的监听函数
 */
function clear(){
    Object.keys(NIL.PLUGINS).forEach(pl=>{
        delete require.cache[require.resolve(NIL.PLUGINS[pl])];
    });
    Object.keys(mods).forEach(p=>{
        try{
            mods[p].onStop();
        }catch(err){
            NIL.Logger.error('PLoader',err);
        }
    });
    mods = [];
    NIL.PLUGINS = [];
    NIL.FUNC.PLUGINS.GROUP = [];
    NIL.FUNC.PLUGINS.WS = [];
}


module.exports = {
    clear,
    unload,
    loadAll
};

NIL.Logger.info('PLoader','插件模块载入成功');