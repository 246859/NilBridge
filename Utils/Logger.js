const {Signale} = require('signale');
var sd = require('silly-datetime');

const options = {
  disabled: false,
  interactive: false,
  scope: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + " NilBridge",
  //secrets: [],
  stream: process.stdout,
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

NIL.Logger.info('[Logger]','模块加载成功');