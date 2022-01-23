const HTMLBuilder = require('./HTMLBuilder');
const CookieHelper = require("./cookie");
const express = require('express');
const path = require('path');
var app = express();
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'..', 'views'));
app.engine('html', require('ejs').__express);
var bodyParser = require('body-parser');/*post方法*/
var cookieParser = require("cookie-parser");
app.use(bodyParser.json());// 添加json解析
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//app.js文件

//指定更目录显示的内容
const ROOT = path.join(__dirname,'..','views');//path.join(__dirname),'..','public')
app.use(express.static(ROOT));

app.get('/',(req,res)=>{
  res.render('login.html',{});
});

app.get("/logout",(req,res)=>{
  CookieHelper.deleteCookie(req,res);
  res.redirect("/");
});

app.get('/plugins',(req,res)=>{
  if(CookieHelper.checkCookie(req)==false){res.redirect("/");return;}
  res.render('plugins.html',{
    PL_FROM:HTMLBuilder.get_plugins_form(),
    SIDEBAR : HTMLBuilder.get_sidebar()
  });
});

app.get('/panel',(req,res)=>{
  if(CookieHelper.checkCookie(req)==false){res.redirect("/");return;}
  res.render('main.html',{
    NB_INFO:HTMLBuilder.get_NB_info(),
    WL_FROM:HTMLBuilder.get_group_whitelist_from(),
    SERVERS_STATUS : HTMLBuilder.get_servers_online(),
    SIDEBAR : HTMLBuilder.get_sidebar(),
    MAIN_SERVERS : HTMLBuilder.get_main_server_status(),
    CHART : HTMLBuilder.get_Line_chart()
  });
});

app.get('/plugins',(req,res)=>{
  if(CookieHelper.checkCookie(req)==false){res.redirect("/");return;}
  res.render('members.html',{
    WL_FROM:HTMLBuilder.get_group_whitelist_from(),
    SIDEBAR : HTMLBuilder.get_sidebar()
  });
});

app.post('/api/:module',(req,res)=>{
  //console.log(req.params.module);
  console.log(req.body);
  var body = req.body;
  switch(req.params.module){
    case "login":
      if(body.user == NIL.CONFIG.PANEL.USER && body.pwd == NIL.CONFIG.PANEL.PWD){       
        CookieHelper.setCookie(res);
        res.json({code:200});
      }else
        res.json({code:404})
      break;
    case 'wladd':
      if(body.QQ == '' || body.xboxid == ''){res.json({code:333,msg:'输入信息格式不正确'});return;}
      if(NIL.XDB.wl_exsits(body.QQ)){res.json({code:333,msg:'此QQ已经绑定'});return;}
      if(NIL.XDB.xboxid_exsits(body.xboxid)){res.json({code:333,msg:'此XBOXID 已被绑定'});return;}   
      NIL.XDB.wl_add(body.QQ,body.xboxid);
      res.json({code:200,msg:"添加成功！"});

      break;
  }
});

app.get('/members',(req,res)=>{
  if(CookieHelper.checkCookie(req)==false){res.redirect("/");return;}
  res.render('members.html',{
    WL_FROM:HTMLBuilder.get_group_whitelist_from(),
    SIDEBAR : HTMLBuilder.get_sidebar()
  });
});

app.get('/server/:name',(req,res)=>{
  console.log(req.params.name);
  if(CookieHelper.checkCookie(req)==false){res.redirect("/");return;}
});

app.get('*',(req,res)=>{
  console.log(req.url);
  res.redirect('/panel');
});

app.listen(NIL.CONFIG.PANEL.PORT, () => {
  NIL.Logger.info('[WEBP]',`App listening at port ${NIL.CONFIG.PANEL.PORT}`);
  NIL.Logger.info('[WEBP]',`在浏览器中访问http://127.0.0.1:${NIL.CONFIG.PANEL.PORT}即可查看面板`);
});