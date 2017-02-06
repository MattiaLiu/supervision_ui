/**
 * Created by Mattia on 2016/5/26.
 */
//window.$=require("jquery")
import ComCatalog from "./components/catalog-panel.vue";
import latestRelease from "./components/latest-release.vue";

import {getQueryString} from "../common-function.js";
  
var articleVm = new Vue({
    el: "#article",
    data: {
        catalogs:[] 
    },
    created: function () {
        let _this=this;
        let url=null;        
        let node=getQueryString("node"),type=getQueryString("type"),style=getQueryString("style");
        let  portalRequest=window.interfaceSettings.portalRequest;
        if(style){
            // preview portal block
            url=portalRequest.api.previewUrl.replace("%id%",style)+"?"+$.param(portalRequest.header);
        }else{
            /*---------not preview block start----*/
             if(type){
                url=portalRequest.api.catalogUrl.replace("%id%",node)+"?"+$.param(portalRequest.header);
                if(type=="0")document.title="公司门户";
               else if(type=="1")document.title="部门门户";
                else document.title="专题门户";
            }else{
               url=portalRequest.api.catalogUrl.replace("%id%","0")+"?"+$.param(portalRequest.header);
            }
           /* --------not preview block end------*/
        }
       
     
        $.ajax({
             type:"get",
            url:url,
            dataType:"text",
            success:function(result){
                result=eval('(' + result + ')');
                let list=result.sort(function(a,b){
                    return a.card_INDEX-b.card_INDEX
                });
                    
                _this.catalogs=list;
                if(result.length>0)document.title=result[0].portalName?result[0].portalName:document.title;            },
            error:function(result){
                // console.log("error",result)
            }
        });
    },
    methods: {
        imgErrorLoad:function (ev) {
            // body...
        var tar=ev.currentTarget;
        tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
        }       
    },
    components:{
        comCatalog:ComCatalog,
        latestRelease:latestRelease
    }
});