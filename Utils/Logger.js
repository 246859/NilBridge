var sd = require('silly-datetime');
const signale = require('signale');
const colors = require('colors');

NIL.Logger = {};


/**
 * 输出一条日志
 * @param moudle 模块名称
 * @param msg 日志信息
 */
NIL.Logger.info = (moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'INFO'.green+']',`[${moudle}]`,msg);
};

/**
 * 输出一条等级为错误的日志
 * @param moudle 模块名称
 * @param msg 日志信息
 */
NIL.Logger.error = signale.fatal;/*(moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'ERROR'.red+']',`moudle ${moudle} throw a Error!!!`);
  //signale.fatal(new Error(msg));
  console.log(msg);
};
*/


/**
 * 输出一条等级为警告的日志
 * @param moudle 模块名称
 * @param msg 日志信息
 */
NIL.Logger.warn = (moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'WARN'.yellow+']',`[${moudle}]`,msg);
};
NIL.Logger.info('LOGGER','模块加载成功');