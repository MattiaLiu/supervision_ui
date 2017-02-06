	var  teamworkspaceRequest=null;
	var  setTeamworkspaceHeader=function(url,paramObj,iid){
	if(paramObj);else paramObj={stamp:(new Date().getTime())};
	return (iid?url.replace("{id}",iid):url)+"?"+(paramObj?$.param($.extend({},teamworkspaceRequest.header,paramObj)):$.param(supervisionRequest.header));
}
/*初始化------start-----*/
	function renderBody(){
		teamworkspaceRequest=window.interfaceSettings.teamworkspaceRequest;
    	var iid=getQueryString("id");
    	if(iid)getOriginalSpace(iid);
    	getOpenSpaces();   		
	}
/*初始化------end-----*/

	//图片上传
	function ajaxSaveImage(){
		loadingCover();
		var spaceid=baseInfoVm.id?baseInfoVm.id:(new Date().getTime());
		$.ajaxFileUpload({
		   url:setTeamworkspaceHeader(teamworkspaceRequest.api.spaceImage,null,spaceid),
          secureuri:false,
          fileElementId:"spaceImgFile",//file标签的id
           dataType: 'json',//返回数据的类型
          success:function(result){
          	baseInfoVm.imgpath=result;
          	alert("上传成功");
          	$.unblockUI();
          },
          error:function(error){          	
          	$.unblockUI();
          	if(console)console.log("error",error);
          }
		 });
		// $("#spaceImgFile").fileinput("upload");
		
	}
	function getQueryString(name){
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null){
           return unescape(r[2]);
        } 
        else {
           return null;
        }
}	
//获取空间信息
function getOriginalSpace(iid){
	$.ajax({
		url:setTeamworkspaceHeader(teamworkspaceRequest.api.getDetail,null,iid),
		type:"get",
		success:function(result){
			var keys=baseInfoVm.$data;
			for(var key in keys){
				baseInfoVm[key]=result[key];
			}
			document.getElementById("spaceImg").src=result.imgpath;
			var  users=result.users;
			var listAdmin=[],listMember=[];
			for(var i =0;i<users.length;i++){
				if(users[i].type==2){
					listMember.push(users[i]);
				}else if(users[i].type==1){
					listAdmin.push(users[i]);
				}
			}
			adminVm.list=listAdmin;
			memberVm.list=listMember;
		},
		error:function(result){
			if(console)
			console.log("error",result);
		}
	});
}
//基本信息
var baseInfoVm=new Vue({
	el:"#baseInfo",
		data:{
	  "id": null,
	  "collspacename": "",
	  "collsystem": "",
	  // "contactid": "",
	  // "contactname": "",
	  "createtime": "",
	  "createuserid": "",
	  "createusername": "",
	  // "departmentid": "",
	  // "departmentname": "",
	  "description": "",
	  // "imgname": "",
	  "imgpath": "",
	  "member": 0,
	  "responsibility": "",
	  "scope": true,
	  "updatetime": ""	  
	},
	methods:{
		saveSpace:function(){
			var _data=this.$data,options={};
			for(var key in _data){
				options[key]=_data[key];
			}
			var userLogin=window.userLogin?window.userLogin:{
				 userid:getCookie("userid"),
                    username:getCookie("username")
			};
			if(options.id==null){
				delete options.id;
				options.user=[{
					userid:userLogin.userid,
					username:userLogin.username,
					type:1
				}];
			}
			options.scope=document.getElementById("switchInput").checked;
			loadingCover("信息保存...");
			$.ajax({
				url:setTeamworkspaceHeader(teamworkspaceRequest.api.edit),
				type:"post",
				contentType:"application/json",
				data:JSON.stringify(options),
				success:function(result){
					if(console)console.log("added",result);
					$.unblockUI();
				},
				error:function(error){
					$.unblockUI();
					if(console)console.log("error",error);
				}
			});
		}
	}
});
//成员名单
var adminVm=new Vue({
	el:"#adminList",
	data:{
		list:[{"collspaceid": 0,
        "id": 0,
        "type": "",
        "userid": "",
        "username": ""}]
		
	},
	methods:{
		delete:function(id){
			//移除
			deleteMember(id);
		},
		demote:function(id){
			$.ajax({
				url:setTeamworkspaceHeader(teamworkspaceRequest.api.demote),
				type:"post",
				data:JSON.stringify({
					userid:id,
					collspaceid:baseInfoVm.id
				}),
				success:function(result){
					alert("已降级为普通用户");
					getSpaceMembers();
				},
				error:function(error){
					alert("操作失败");
					if(console)console.log("error",error);
				}
			});
		}
	}
});
var memberVm=new Vue({
	el:"#memberList",
	data:{
		list:[]
	},
	methods:{
		delete:function(id){
			//移除
			deleteMember(id);
		},
		//升级
		promote:function(id){
			$.ajax({
				url:setTeamworkspaceHeader(teamworkspaceRequest.api.promote),
				type:"post",
				contentType:"application/json",
				data:JSON.stringify({
					userid:id,
					collspaceid:baseInfoVm.id
				}),
				success:function(result){
					alert("已升级为管理员");
					getSpaceMembers();
				},
				error:function(error){
					alert("升级失败")
					if(console)console.log("error",error);
				}
			});
		}
	}
});


function getSpaceMembers(){
	$.ajax({
		url:setTeamworkspaceHeader(teamworkspaceRequest.api.getMembers,null,baseInfoVm.id),
		type:"get",
		success:function(result){
			var adminList=[],memberList=[];
			for(var i=0,len=result.length;i<len;i++){
				if(result[i].type==1){
					adminList.push(result[i]);
				}else if(result[i].type==2){
					memberList.push(result[i]);
				}
			}
			memberVm.list=memberList;
			adminVm.list=adminList;
		}
	});
}
//移除
function deleteMember(id){
			$.ajax({
				url:setTeamworkspaceHeader(teamworkspaceRequest.api.quit),
				type:"post",
				contentType:"application/json",
				data:JSON.stringify({
					userid:id,
					collspaceid:baseInfoVm.id
				}),
				success:function(result){
					alert("移除成功");
					getSpaceMembers();
				},
				error:function(error){
					alert("移除失败")
					if(console)console.log("error",error);
				}
			});
}

function loadingCover(msg){
	$.blockUI(
		{ message: msg,
                  css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
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
function getOpenSpaces(){
	 $.ajax({
        	type: "get",
	        dataType: "json",
	        url: setTeamworkspaceHeader(teamworkspaceRequest.api.publicSpaces),
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
	                + jsonArray[i].createusername + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].createusername + "</td>" + "<td style='border: 0; vertical-align: middle;'>" 
	                + jsonArray[i].updatetime + "</td></tr>";
	            }
	            $("#tdbodys").html(strHtml);
	            $('#ownerTable').dataTable({
	                "oLanguage": {
	                    "sProcessing": "处理中...",
	                    "sLengthMenu": "_MENU_ 记录/页",
	                    "sZeroRecords": "没有匹配的记录",
	                    "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
	                    "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
	                    "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
	                    "sInfoPostFix": "",
	                    "sSearch": "过滤:",
	                    "sUrl": "",
	                    "oPaginate": {
	                        "sFirst": "首页",
	                        "sPrevious": "上页",
	                        "sNext": "下页",
	                        "sLast": "末页"
	                    }
	                }
	            });
	        },
	        error: function error(err) {
	            console.log(err);
	        }
	    });	
}
