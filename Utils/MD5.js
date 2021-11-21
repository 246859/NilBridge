const md5 = require("md5-node");


/**
 * MD5加密
 * @param moudle 要加密的字符串
 * @returns 加密过的字符串
 */
NIL.TOOL.MD5 = function(str){
  return md5(str).toUpperCase();
}

NIL.Logger.info('MD5','模块加载成功');