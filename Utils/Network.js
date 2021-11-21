var requestSync = require('sync-request');  //https://www.npmjs.com/package/sync-request
const request = require('request');
  

/** 
* 非阻塞式HTTP_GET请求
* @param url 请求地址
* @param callback 回调函数
*/
NIL.TOOL.HttpGet = function (url,callback){
    request(url, { json: true }, (err, res, body) => {
        try{callback(err,body) }catch(erro){NIL.Logger.error(erro);}
    });
}


/** 
* 阻塞式HTTP_GET请求
* @param url 请求地址
* @return GET到的数据
*/
NIL.TOOL.HttpGetSync = function(url){
    try{
        var res = requestSync('GET', url);
        return res.getBody('utf8');
    }catch(err){
        NIL.Logger.warn('NETWORK',err);
        return null;
    }
}

NIL.Logger.info('NTWORK','网络请求模块加载完毕');