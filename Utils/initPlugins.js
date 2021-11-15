const fs = require('fs');
const path = require('path');
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

NIL.FUNC.plload = function(){
    fs.readdirSync('./plugins/').forEach(p=>{
        try{
            var pt = path.join(__dirname,'../plugins',p);
            if(fs.statSync(pt).isFile()){ 
                NIL.Logger.info('PLoader','loading '+p);
                require(pt);
                NIL.PLUGINS.push(pt);
            }
        }catch(err){
            NIL.Logger.error('PLoader',err);
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

NIL.Logger.info('PLUGINS','插件模块载入成功');