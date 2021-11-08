NIL.FUNC.qq_ongroup = function(e){
    console.log(e);
    if(e.group_id != NIL.bot.config.group.main)return;
    if(e.raw_message == "查服"){
        for(i in NIL.SERVERS){
            NIL.SERVERS[i].sendCMD('list',NIL.TOOL.GUID());
        }
    }
}