window.Base64 =require("./components/jbase64");
window.Swiper = require("./components/swiper/idangerous.swiper.min2.7.6");

// import renderHeaderFooter from "header" 

/*set the global ajax method*/
(function($){if(!$.support.cors&&$.ajaxTransport&&window.XDomainRequest){var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');var q=/text\/html/i;var r=/\/json/i;var s=/\/xml/i;$.ajaxTransport('* text html xml json',function(i,j,k){if(i.crossDomain&&i.async&&o.test(i.type)&&n.test(i.url)&&p.test(i.url)){var l=null;var m=(j.dataType||'').toLowerCase();return{send:function(f,g){l=new XDomainRequest();if(/^\d+$/.test(j.timeout)){l.timeout=j.timeout}l.ontimeout=function(){g(500,'timeout')};l.onload=function(){var a='Content-Length: '+l.responseText.length+'\r\nContent-Type: '+l.contentType;var b={code:200,message:'success'};var c={text:l.responseText};try{if(m==='html'||q.test(l.contentType)){c.html=l.responseText}else if(m==='json'||(m!=='text'&&r.test(l.contentType))){try{c.json=$.parseJSON(l.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(m==='xml'||(m!=='text'&&s.test(l.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(l.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+l.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};l.onprogress=function(){};l.onerror=function(){g(500,'error',{text:l.responseText})};var h='';if(j.data){h=($.type(j.data)==='string')?j.data:$.param(j.data)}l.open(i.type,i.url);l.send(h)},abort:function(){if(l){l.abort()}}}}})}})(jQuery);
mainLoading();
function mainLoading(){
	$.ajax({
		url:'/dist/webconfig.json',
		type:"get",
		dataType:"json",
		success:function(result){
			window.interfaceSettings={};
			window.plantName=result.plantname;
			let catalogs=result.catalogs;
			for(let type in catalogs){
				let requestObj=catalogs[type];
				let api=requestObj.api;
				for(let prop in api)api[prop]=requestObj.server+api[prop];
				window.interfaceSettings[type+'Request']=requestObj;
			}
			
		//--load the next going steps-----
		//--first to render the header and footer 
			renderHeaderFooter();
		//--then load the following functions
		if(typeof renderBody =="undefined")return;
		renderBody();
		},
		error:function(result){
			// console.log("error",result);
		}
	});
}

function renderHeaderFooter(){
// let ComHeader =require("./components/header.vue");

// let ComFooter =require("./components/footer.vue");
	let headerVm = new Vue({
	    el: "header",
	    components: {
	        ComHeader:require("./components/header.vue")
	    }
	});
	let footerVm = new Vue({
	    el: "footer",
	    components: {
	        ComFooter:require("./components/footer.vue")
	    }
	});
}

   