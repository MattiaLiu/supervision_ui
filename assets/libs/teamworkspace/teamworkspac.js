	var  teamworkspaceRequest=null;
	var  setTeamworkspaceHeader=function(url,paramObj,iid){
	if(paramObj);else paramObj={stamp:(new Date().getTime())};
	return (iid?url.replace("{id}",iid):url)+"?"+(paramObj?$.param($.extend({},teamworkspaceRequest.header,paramObj)):$.param(supervisionRequest.header));
}
function renderBody(){
	window.userLogin={
		userid:getCookie("userid"),
		username:getCookie("username")
	};
	teamworkspaceRequest=window.interfaceSettings.teamworkspaceRequest;
	var url=null;
	if ($("#pageType").text() == "owner") {
	    //我管理的协作空间
            url = setTeamworkspaceHeader(teamworkspaceRequest.api.managedSpaces,null,window.userLogin.userid);
        } else if ($("#pageType").text() == "follow") {
            //我加入的协作空间
            url =setTeamworkspaceHeader(teamworkspaceRequest.api.followedSpaces,null,window.userLogin.userid); 
        } else if ($("#pageType").text() == "public") {
            //公共协作空间
            url =setTeamworkspaceHeader(teamworkspaceRequest.api.publicSpaces); 
        }
        $.ajax({
            type: "get",
	            dataType: "json",
	            url: url,
	            success: function success(data, state, jqxhr) {
	                var jsonArray = data;
	                var strHtml = "";
	                for (var i = 0; i < jsonArray.length; i++) {
	                    strHtml = strHtml + "<tr style='bordered: 0; vertical-align: middle;'>" 
	                    + "<td style='border: 0;'><img src='" + jsonArray[i].imgpath 
	                    + "' style='min-width: 1.5rem; min-height: 1.5rem; width:90%;' /></td>" 
	                    + "<td style='border: 0; vertical-align: middle;'><a href='jsonArray[i].collspaceid' target='_blank'>" 
	                    + jsonArray[i].collspacename + "</a></td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                    + jsonArray[i].member + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                    + jsonArray[i].createtime + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                    + jsonArray[i].createusername + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                    + jsonArray[i].updatetime + "</td></tr>";
	                }
	                $("#tdbodys").html(strHtml);
	                $('#listTable').dataTable({
	                 "oLanguage": {
			                "sProcessing":   "处理中...",
			                "sLengthMenu":   "_MENU_ 记录/页",
			                "sZeroRecords":  "没有匹配的记录",
			                "sInfo":         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
			                "sInfoEmpty":    "显示第 0 至 0 项记录，共 0 项",
			                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
			                "sInfoPostFix":  "",
			                "sSearch":       "过滤:",
			                "sUrl":          "",
			                "oPaginate": {
			                    "sFirst":    "首页",
			                    "sPrevious": "上页",
			                    "sNext":     "下页",
			                    "sLast":     "末页"
			                }
			            }
	                });
	            },
	            error: function error(err) {
	                console.log(err);
	            }
	});
}
	function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
	