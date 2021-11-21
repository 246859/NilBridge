
const express = require('express');
const path = require('path');
//app.js文件
var app = express();
//指定更目录显示的内容
const ROOT = path.join(__dirname,'..','public');//path.join(__dirname),'..','public')
app.use(express.static(ROOT));

if(true){
  app.listen(3390, () => {
    NIL.Logger.info('[WEB]',`App listening at port 3000`);
    NIL.Logger.info('[WEB]',`在浏览器中访问http://127.0.0.1:3000即可查看文档`);
  });
}
