

exports.get_NB_info = () => {
    return `
    <div class="span8">
        <div class="row-fluid">
            <div class="span12">
            <a href="#" class="btn-box small span4"><i class="icon-save"></i><b>总内存使用：${NIL.TOOL.COMPUTER.RAM_PERCENT + "%"}</b></a>
            <a href="#" class="btn-box small span4"><i class="icon-group"></i><b>累计绑定：${Object.keys(NIL.XDB.get_all()).length}</b></a>
            <a href="#" class="btn-box small span4"><i class="icon-exchange"></i><b>插件数量：${Object.keys(NIL.PLUGINS).length}</b></a>
            </div>
        </div>
</div>`
}

`<ul class="widget widget-menu unstyled">
<li><a href="ui-button-icon.html"><i class="menu-icon icon-bold"></i> Buttons </a></li>
<li><a href="ui-typography.html"><i class="menu-icon icon-book"></i>Typography </a></li>
<li><a href="form.html"><i class="menu-icon icon-paste"></i>Forms </a></li>
<li><a href="table.html"><i class="menu-icon icon-table"></i>Tables </a></li>
<li><a href="charts.html"><i class="menu-icon icon-bar-chart"></i>Charts </a></li>
</ul>`

exports.get_main_server_status = ()=>{
    var t = '';
    for(var i in NIL.SERVERS){
        try{
            t+=` <tr>
            <td>${i}</td><td>${NIL.SERVERS[i]._connected?'<font color="green">在线</font>':'<font color="red">离线</font>'}</td><td>${NIL.SERVERS[i]._onlineCount}</td>
          </tr>`
        }catch{
            t+=` <tr>
            <td>${i}</td><td>离线</td><td></td>
          </tr>`
        }
        
    }
    return `<div class="module">
    <div class="module-head">
        <h3>服务器状态</h3>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>服务器名称</th>
          <th>在线状态</th>
          <th>在线人数</th>
        </tr>
      </thead>
      <tbody>
    ${t}
      </tbody>
    </table></div>`
};

exports.get_plugins_form = ()=>{
    var t = '';
    for(var i in NIL.PLUGINS){
        t+=` <tr>
            <td>${i}</td><td>${NIL.PLUGINS[i]}</td><td>
          </tr>`
    }
    return `<div class="module">
    <div class="module-head">
        <h3>插件列表</h3>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>名称</th>
          <th>路径</th>
        </tr>
      </thead>
      <tbody>
    ${t}
      </tbody>
    </table></div>`
}

exports.get_sidebar = ()=>{
    var s = '';
    for(var i in NIL.SERVERS){s+=`<li><a href="${`/server/`+i}"><i class="icon-inbox"></i>${i}</a></li>`}
    return `<ul class="widget widget-menu unstyled">
    <li class="active">
    <a href="/panel"><i class="menu-icon icon-dashboard"></i>仪表盘</a></li>
    <li><a href="/news"><i class="menu-icon icon-bullhorn"></i>更新快讯</a></li>
    <li><a href="/members"><i class="menu-icon icon-inbox"></i>玩家管理</a></li>
    <li><a href="/QQ"><i class="menu-icon icon-tasks"></i>QQ管理</a></li>
    <li><a href="/plugins"><i class="menu-icon icon-table"></i>插件管理</a></li>
</ul>
<ul class="widget widget-menu unstyled">
    <li><a class="collapsed" data-toggle="collapse" href="#togglePages"><i class="menu-icon icon-cog">
    </i><i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right">
        </i>服务器列表</a>
            <ul id="togglePages" class="collapse unstyled">
                ${s}
            </ul>
        </li>
    <li><a href="/logout"><i class="menu-icon icon-signout"></i>登出</a></li>
</ul>
`
}


exports.get_Line_chart = ()=>{
    return ` <div class="module">
    <div class="module-head">
        <h3>
            近期玩家活跃数据</h3>
    </div>
    <div class="module-body">
        <div class="chart">
            <div id="placeholder" class="graph">
            </div>
        </div>
    </div>
</div>`
}

exports.get_group_whitelist_from = () => {
    var rt = `
<div class="module">
<div class="module-head"><h3>白名单管理</h3></div>
<div class="module-body table">
<table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display"width="100%">
<thead><tr><th>QQ</th><th>XBOXID</th><th>加入</th><th>死亡</th><th>总计时间</th></tr></thead><tbody>`
    var dt = NIL.XDB.get_all();
    for(var i in dt){
        var tmp = dt[i];
        rt+=`
        <tr class="odd gradeX">
            <td>${i}</td>
            <td> ${tmp.xboxid}</td>
            <td> ${tmp.count.join}</td>
            <td class="center">${tmp.count.death}</td>
            <td class="center">${tmp.count.duration}</td>
        </tr>
        `
    }
    rt+=` </tbody></table></div></div>`
return rt;
}

exports.get_servers_online = ()=>{
    var ml = "";
    for (var s in NIL.SERVERS){
        var tmp = NIL.SERVERS[s];
        var b = Math.ceil(Number(tmp._onlineCount/tmp.maxplayer)*100).toFixed(0);
        ml += `
        <li>
        <p>
            <strong>${s}</strong> <span
                class="pull-right small muted">${tmp._onlineCount+'/'+tmp.maxplayer}</span>
        </p>
        <div class="progress tight">
            <div class="bar" style="width: ${b}%;">
            </div>
        </div>
    </li>`
    }
    return ` <ul class="widget widget-usage unstyled span4">
   ${ml}
</ul>`
}