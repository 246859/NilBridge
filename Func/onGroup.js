function group_main(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    const pt = NIL.TOOL.GetPlainText(e).split(' ');
    switch(pt[0]){
        case "查服":
            for(i in NIL.SERVERS){
                NIL.SERVERS[i].sendCMD('list',NIL.TOOL.GUID());
            }
            break;
        case "/cmd":
            if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id)==-1){
                e.reply(NIL.LANG.get('MEMBER_NOT_ADMIN'));
                return;
            }
            if(Object.keys(NIL.SERVERS).length == 1){
                for(i in NIL.SERVERS){
                    NIL.SERVERS[i].sendCMD(e.raw_message.substr(5));
                    e.reply(NIL.LANG.get("COMMAND_SENDTO_SERVER",e.raw_message.substr(5),i),true);
                }
            }
            else{
                if(pt.length > 2){
                    if(NIL.SERVERS[pt[1]] == undefined){
                        e.reply(`没有名为${pt[1]}的服务器`,true);
                        return;
                    }
                    NIL.SERVERS[pt[1]].sendCMD(e.raw_message.substr(`/cmd ${pt[1]} `.length));
                    e.reply(NIL.LANG.get("COMMAND_SENDTO_SERVER",e.raw_message.substr(`/cmd ${pt[1]} `.length),pt[1]),true);
                }else{
                    e.reply(NIL.LANG.get('COMMAND_OVERLOAD_NOTFIND'),true);
                }
            }
            break;
        case "/bind":
            if(pt.length<2){
                e.reply(NIL.LANG.get('COMMAND_OVERLOAD_NOTFIND'),true);
                return;
            }
            if(NIL.XDB.wl_exsis(e.sender.user_id)){
                e.reply(NIL.LANG.get('MEMBER_ALREADY_BIND'),true);
                break;
            }
            var xbox = e.raw_message.substr(6);
            if(NIL.XDB.xboxid_exsis(xbox)){
                e.reply(NIL.LANG.get('MEMBER_ALREADY_IN_WHITELIST'),true);
                break;
            }
            NIL.XDB.wl_add(e.sender.user_id,xbox);
            if(NIL.CONFIG.AUTO_RENAME_AFTER_BIND) e.member.setCard(xbox);
            e.reply(NIL.LANG.get('MEMBER_BIND_SUCCESS',xbox),true);
            break;
        case "/unbind":
            if(NIL.XDB.wl_exsis(e.sender.user_id)==false){
                e.reply(NIL.LANG.get('MEMBER_NOT_BIND'),true);
                break;
            }
            var xbox = NIL.XDB.get_xboxid(e.sender.user_id);
            //console.log(xbox);
            NIL.XDB.wl_remove(e.sender.user_id);
            e.reply(NIL.LANG.get('MEMBER_UNBIND'),true);
            NIL.TOOL.RunCMDAll(`whitelist remove "${xbox}"`);
            e.reply(NIL.LANG.get('REMOVE_WL_TO_SERVER',e.sender.user_id,xbox));
            break;
        case "wl+":
            if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id)==-1){
                e.reply(NIL.LANG.get('MEMBER_NOT_ADMIN'));
                return;
            }
            var at = NIL.TOOL.getAt(e);
            if(e.length!=0){
                at.forEach(element => {
                    if(NIL.XDB.wl_exsis(element)){
                        var xbox = NIL.XDB.get_xboxid(element);
                        NIL.TOOL.RunCMDAll(`whitelist add "${xbox}"`);
                        e.reply(NIL.LANG.get('ADD_WL_TO_SERVER',element,xbox));
                    }else{
                        e.reply(NIL.LANG.get('MEMBER_NOT_BIND_WHEN_REMOVE',element));
                    }

                });
            }
            break;
        case "wl-":
            if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id)==-1){
                e.reply(NIL.LANG.get('MEMBER_NOT_ADMIN'));
                return;
            }
            var at = NIL.TOOL.getAt(e);
            if(e.length!=0){
                at.forEach(element => {
                    if(!NIL.XDB.wl_exsis(element)){
                        e.reply(NIL.LANG.get('MEMBER_NOT_BIND_WHEN_REMOVE',element));
                    }else{
                        e.reply(NIL.LANG.get('REMOVE_WL_TO_SERVER',element,NIL.XDB.get_xboxid(element)));
                        NIL.TOOL.RunCMDAll(`whitelist remove "${NIL.XDB.get_xboxid(element)}"`);
                        NIL.XDB.wl_remove(element);
                    }
                });
            }
            break;
    }
}

function group_chat(e){
    if(e.group_id != NIL.CONFIG.GROUP_CHAT)return;
    //NIL.Logger.debug(NIL.TOOL.GetFormatText(e));
    NIL.TOOL.sendTextAll(NIL.LANG.get('GROUP_MEMBER_CHAT',e.sender.nickname,NIL.TOOL.GetFormatText(e)));
}

NIL.FUNC.NATIVE.GROUP.push(group_chat);
NIL.FUNC.NATIVE.GROUP.push(group_main);
/*
{
  post_type: 'message',
  message_id: 'MDTy4LBlZSUAAB62Yiac82GJK1IB',
  user_id: 2959435045,
  time: 1636379474,
  seq: 7862,
  rand: 1646697715,
  font: '宋体',
  message: [ { type: 'text', text: '/unbind' } ],
  raw_message: '/unbind',
  message_type: 'group',
  sender: {
    user_id: 2959435045,
    nickname: 'DreamLition',
    card: 'DreamLition',
    sex: 'male',
    age: 17,
    area: '',
    level: 1,
    role: 'admin',
    title: ''
  },
  group_id: 808776416,
  group_name: 'XBX/XB/KWO 交流群',
  block: false,
  sub_type: 'normal',
  anonymous: null,
  atme: false,
  atall: false,
  group: Group {},
  member: Member {},
  reply: [Function (anonymous)],
  recall: [Function (anonymous)],
  self_id: 2837945976
}
*/