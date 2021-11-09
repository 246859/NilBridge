const {Signale} = require('signale');
var sd = require('silly-datetime');

// 禁用console.log
console.log = (e)=>{
  NIL.Logger.warn('[NIL]','console.log 已被禁用，请用NIL.Logger输出');
};

const options = {
  //disabled: false,
  //interactive: false,
  scope: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + " NilBridge",
  //secrets: [],
  //stream: process.stdout,
  types: {
    info:{
        color : 'green' ,
        label : 'INFO'
    },
    warn: {
      color: 'yellow',
      label: 'WARN'
    },
    error: {
      color: 'red',
      label: 'ERROR'
    },
    debug:{
        color : 'magenta',
        label : 'DEBUG'
    }
  }
};

NIL.Logger = new Signale(options);

NIL.Logger.info('[LOGGER]','模块加载成功');