
var cks = new Map();

function GUID() {
    return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.checkCookie = (req) => {
    var ck = req.cookies.lid ;
    if (ck == undefined) return false;
    if (cks.has(ck) == false) {
        return false;
    }
    else {
        cks.set(ck,cks.get(ck) + 1000 * 60 * 10);
        return true;
    }
}

exports.setCookie = (res, time = 1000 * 60 * 10) => {
    var id = GUID();
    res.cookie("lid", id, { maxAge: time, httpOnly: true });
    cks.set(id, new Date() + time);
} 

exports.deleteCookie=(req,res)=>{
    if(req.cookies.lid == undefined)return;
    var ck = req.cookies.lid ;
    if(cks.has(ck)){
        cks.delete(ck);
        res.cookie("lid",null);
    }
}

setInterval(()=>{
    var now = new Date();
    cks.forEach((v,k)=>{
        if(now < v){
           
            NIL.Logger.info("WEBP",`cookie [${k}] 已过期，清除记录`);
            cks.delete(k);
        }
    })
},1000);