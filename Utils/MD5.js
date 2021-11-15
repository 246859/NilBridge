const md5 = require("md5-node");

NIL.TOOL.MD5 = function(str){
  return md5(str).toUpperCase();
}

NIL.Logger.info('MD5','模块加载成功');