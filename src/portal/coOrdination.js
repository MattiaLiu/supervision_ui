/**
 * Created by kingsinsd on 2016/6/15.
 */
var Vue = require("vue");
import ComHeader from "../components/header.vue";
import ComFooter from "../components/footer.vue";
let headerVm=new Vue({
    el:"header",
    components:{ComHeader}
});
let footerVm=new Vue({
    el:"footer",
    components:{ComFooter}
});
var coOrdinationVm = new Vue({
    el: "#tbody",
    data: {
        //我管理的
        myOwner2:[
            {
                "collspaceid":1000,
                "collspacename":"\n\n中国核电ECM二期项目PMO\n",
                "createuserid":10001,
                "createusername":"test",
                "createtime":"2016-06-16",
                "updatetime":"2016-06-16",
                "description":"11111111111111111111111111111",
                "scope":"1",
                "imgname":null,
                "imgpath":null,
                "member":20
            }
        ]
    },
    ready: function (){
        let url="http://localhost:8000/collspace/" + window.localStorage.getItem("userId");
        if($("#pageType").text()=="owner"){
            //我管理的协作空间
            url= url +"owner flag";
        }else if($("#pageType").text()=="follow"){
            //我加入的协作空间
            url= url +"follow flag";
        }else if($("#pageType").text()=="public"){
            //公共协作空间
            url= url +"public flag";
        }
        $.ajax({
            type: "get",
            dataType: "json",
            url: url,
            success: function (data,state,jqxhr) {
                let jsonArray = data;
                var strHtml ="";
                for(var i=0; i< jsonArray.length; i ++){
                    strHtml = strHtml + "<tr style='bordered: 0; vertical-align: middle;'>"+
                    "<td style='border: 0;'><img src='"+jsonArray[i].imgpath+"' style='min-width: 1.5rem; min-height: 1.5rem; width:90%;' /></td>"+
                    "<td style='border: 0; vertical-align: middle;'><a href='jsonArray[i].collspaceid' target='_blank'>"+jsonArray[i].collspacename+"</a></td>"+
                    "<td style='border: 0; vertical-align: middle;'>"+jsonArray[i].member+"</td>"+
                    "<td style='border: 0; vertical-align: middle;'>"+jsonArray[i].createtime+"</td>"+
                    "<td style='border: 0; vertical-align: middle;'>"+jsonArray[i].createusername+"</td>"+
                    "<td style='border: 0; vertical-align: middle;'>"+jsonArray[i].updatetime+"</td></tr>";
                }
                $("#tdbodys").html(strHtml);
                $('#ownerTable').dataTable( {
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
            error: function (err) {
                console.log(err);
            }
        });
    }
});