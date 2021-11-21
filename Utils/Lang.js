const readline = require('readline');
const fs = require('fs');

var lang = {};

/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
	return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function(args) {
	var result = this;
	if (arguments.length < 1) {
		return result;
	}
	var data = arguments; // 如果模板参数是数组
	if (arguments.length == 1 && typeof (args) == "object") {
		// 如果模板参数是对象
		data = args;
	}
	for ( var key in data) {
		var value = data[key];
		if (undefined != value) {
			result = result.replaceAll("\\{" + key + "\\}", value);
		}
	}
	return result;
}

function isNullorEmpty(str){
    if(str.trim() == "") return true;
    if(str == null) return true;
    return false;
}

/**
 * 设置语言文件
 * @param k 键
 * @param v 值
 */
NIL.LANG.set = function(k,v){
    lang[k] = v;
}

/**
 * 获取格式化的语言字符串
 */
NIL.LANG.get = function(){
    if(lang[arguments[0]] == undefined) return arguments[0];
    var gs = {};
    for(i=1;i<arguments.length;i++){
        gs[(i-1).toString()] = arguments[i];
    }
    if(Object.keys(gs).length ==0) return lang[arguments[0]];
    return lang[arguments[0]].format(gs);
}
/**
 * 装载Lang文件
 */
function init(){
    const newpath = './Data/.lang';
    const oldpath = './core/.lang';
    try{
        fs.statSync(newpath);
    }catch{
        NIL.Logger.info('LANG','.lang 文件不存在，自动创建...');
        fs.copyFileSync(oldpath,newpath);
    }
    let input = fs.createReadStream(newpath,{encoding:"utf8"});
    const rl = readline.createInterface({
      input: input
    });
    rl.on('line', (line) => {
      try{
        if(line.startsWith("#")) return;
        if(!isNullorEmpty(line)){
            var l = line.split('=');
            lang[l[0]] = l[1];
        }
      }catch(err){
          NIL.Logger.error(err);
      }
    });
    rl.on('close',()=>{
        NIL.Logger.info("LANG",'Lang文件读取完毕');
    });
}

init()
NIL.Logger.info("LANG","LANG 模块加载成功")