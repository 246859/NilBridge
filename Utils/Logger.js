var sd = require('silly-datetime');
const signale = require('signale');
const colors = require('colors');

NIL.Logger = {};

NIL.Logger.info = (moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'INFO'.green+']',`[${moudle}]`,msg);
};

NIL.Logger.error = (moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'ERROR'.red+']',`moudle ${moudle} throw a Error!!!`);
  signale.fatal(new Error(msg));
};

NIL.Logger.warn = (moudle,msg)=>{
  console.log(sd.format(new Date(), '[YYYY-MM-DD HH:mm:ss]'),'['+'WARN'.yellow+']',`[${moudle}]`,msg);
};
NIL.Logger.info('LOGGER','模块加载成功');