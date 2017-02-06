!function(e){function t(s){if(a[s])return a[s].exports;var r=a[s]={exports:{},id:s,loaded:!1};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _catalogPanel=__webpack_require__(45),_catalogPanel2=_interopRequireDefault(_catalogPanel),_latestRelease=__webpack_require__(4),_latestRelease2=_interopRequireDefault(_latestRelease),_commonFunction=__webpack_require__(1),articleVm=new Vue({el:"#article",data:{catalogs:[]},created:function created(){var _this=this,url=null,node=(0,_commonFunction.getQueryString)("node"),type=(0,_commonFunction.getQueryString)("type"),style=(0,_commonFunction.getQueryString)("style"),portalRequest=window.interfaceSettings.portalRequest;style?url=portalRequest.api.previewUrl.replace("%id%",style)+"?"+$.param(portalRequest.header):type?(url=portalRequest.api.catalogUrl.replace("%id%",node)+"?"+$.param(portalRequest.header),"0"==type?document.title="公司门户":"1"==type?document.title="部门门户":document.title="专题门户"):url=portalRequest.api.catalogUrl.replace("%id%","0")+"?"+$.param(portalRequest.header),$.ajax({type:"get",url:url,dataType:"text",success:function success(result){result=eval("("+result+")");var list=result.sort(function(e,t){return e.card_INDEX-t.card_INDEX});_this.catalogs=list,result.length>0&&(document.title=result[0].portalName?result[0].portalName:document.title)},error:function(e){}})},methods:{imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}},components:{comCatalog:_catalogPanel2.default,latestRelease:_latestRelease2.default}})},function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function r(e,t,a,s,r,i){if(a){var o=new Date;o.setTime(o.getTime()+24*a*60*60*1e3);var n=o.toGMTString()}else var n="";var l=e+"="+escape(t);n&&(l+=";expires="+n),s&&(l+=";path="+escape(s)),r&&(l+=";domain="+escape(r)),i&&(l+=";secure="+i),document.cookie=l}function i(e){var t,a=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(a))?unescape(t[2]):null}function o(e){var t=new Date;t.setTime(t.getTime()-864e5),r(e,"",t,"/")}function n(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null}function l(){$.blockUI({message:"数据获取中，请稍候... ...",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:.5,color:"#fff"}})}function c(e,t){var a=function(e,a,s){for(var r=0,i=e.length;r<i;r++)e[r].publishDate&&(e[r].publishDate=e[r].publishDate.substring(5));t.list=e,t.successNext&&t.successNext()},s=function(e,t,a){},r={type:"get",url:e.URL+e.QueryString,success:a,error:s};"post"==e.METHOD&&(r={type:"post",url:e.URL+e.QueryString,data:e.PLAYLOAD,contentType:e.CONTENT_TYPE,success:a,error:s}),$.ajax(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAjaxService=t.loadingCover=t.getQueryString=t.deleteCookie=t.getCookie=t.setCookie=t.add_supervision=t.fetch_sourceFromServer=t.fetch_areaFromServer=t.fetch_deptsFromServer=t.fetch_serviceByHttpProtocol=t.setSupervisionHeader=void 0;var d=a(19),u=s(d),p=window.interfaceSettings.supervisionRequest,f=function(e,t,a){return t||(t={stamp:(new Date).getTime()}),(a?e.replace("%id%",a):e)+"?"+(t?$.param($.extend({},p.header,t)):$.param(p.header))},v=function(e,t,a,s,r){"post"==t&&(a=(0,u.default)(a)),$.ajax({url:e,type:t,data:a,contentType:"application/json",success:function(e,t,a){s(e,t,a)},error:function(e,t,a){r(e,t,a)}})},m=function(e,t){var a=f(p.api.deptUrl,null,e);v(a,"get",{},t,function(e,t,a){})},h=function(e){var t=f(p.api.supSourceUrl);v(t,"get",{},e,function(e,t,a){})},g=function(e){var t=f(p.api.supAreaUrl);v(t,"get",{},e,function(e,t,a){})},_=function(e,t){var a=f(p.api.supAddUrl);v(a,"post",e,t,function(e,t,a){})};t.setSupervisionHeader=f,t.fetch_serviceByHttpProtocol=v,t.fetch_deptsFromServer=m,t.fetch_areaFromServer=g,t.fetch_sourceFromServer=h,t.add_supervision=_,t.setCookie=r,t.getCookie=i,t.deleteCookie=o,t.getQueryString=n,t.loadingCover=l,t.fetchAjaxService=c},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var a=this[t];a[2]?e.push("@media "+a[2]+"{"+a[1]+"}"):e.push(a[1])}return e.join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(s[i]=!0)}for(r=0;r<t.length;r++){var o=t[r];"number"==typeof o[0]&&s[o[0]]||(a&&!o[2]?o[2]=a:a&&(o[2]="("+o[2]+") and ("+a+")"),e.push(o))}},e}},function(e,t,a){function s(e,t){for(var a=0;a<e.length;a++){var s=e[a],r=u[s.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](s.parts[i]);for(;i<s.parts.length;i++)r.parts.push(l(s.parts[i],t))}else{for(var o=[],i=0;i<s.parts.length;i++)o.push(l(s.parts[i],t));u[s.id]={id:s.id,refs:1,parts:o}}}}function r(e){for(var t=[],a={},s=0;s<e.length;s++){var r=e[s],i=r[0],o=r[1],n=r[2],l=r[3],c={css:o,media:n,sourceMap:l};a[i]?a[i].parts.push(c):t.push(a[i]={id:i,parts:[c]})}return t}function i(e,t){var a=v(),s=g[g.length-1];if("top"===e.insertAt)s?s.nextSibling?a.insertBefore(t,s.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function n(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e,t){var a,s,r;if(t.singleton){var i=h++;a=m||(m=n(t)),s=c.bind(null,a,i,!1),r=c.bind(null,a,i,!0)}else a=n(t),s=d.bind(null,a),r=function(){o(a)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else r()}}function c(e,t,a,s){var r=a?"":s.css;if(e.styleSheet)e.styleSheet.cssText=_(t,r);else{var i=document.createTextNode(r),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}function d(e,t){var a=t.css,s=t.media,r=t.sourceMap;if(s&&e.setAttribute("media",s),r&&(a+="\n/*# sourceURL="+r.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var u={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=p(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,h=0,g=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var a=r(e);return s(a,t),function(e){for(var i=[],o=0;o<a.length;o++){var n=a[o],l=u[n.id];l.refs--,i.push(l)}if(e){var c=r(e);s(c,t)}for(var o=0;o<i.length;o++){var l=i[o];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete u[l.id]}}}};var _=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()},function(e,t,a){var s,r;a(61),s=a(7),r=a(40),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{carousel_id:"carousel_id"+(new Date).getTime(),carousel:[]}},props:["dataSource"],created:function(){var e=this;$.ajax({type:"get",url:this.dataSource.URL+this.dataSource.QueryString,success:function(t,a,s){for(var r=t,i=0,o=r.length;i<o;i++){var n=r[i].imagePath;if(null==n){var l=Math.round(22*Math.random());r[i].imagePath="assets/images/default-pics/"+l+".png"}else r[i].imagePath=n.substr(n.indexOf("/"))}e.carousel=r,e.$nextTick(function(){$("#"+e.carousel_id).carousel({interval:5e3})})},error:function(e,t,a){}})},methods:{imgErrorLoad:function(e,t){var a=t.currentTarget,s="assets/images/default-pics/"+Math.round(50*Math.random())+".png",r=this.carousel;r[e].imagePath=s,this.carousel=r,$(a).prev()[0].style.backgroundImage="url("+s+")"}}}},function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var r=a(44),i=s(r),o=a(46),n=s(o),l=a(50),c=s(l),d=a(51),u=s(d),p=a(52),f=s(p),v=a(54),m=s(v),h=a(53),g=s(h),_=a(55),x=s(_),b=a(56),y=s(b),w=a(47),S=s(w),M=a(48),P=s(M),k=a(49),T=s(k),R=a(4),O=s(R);e.exports={data:function(){return{subcards:[],captionRequired:!0,moreHref:"",currentView:0,isLatest:!1}},props:["catalog"],computed:{borderTop:function(){return this.captionRequired?"3px solid "+this.catalog.card_TOP_COLOR:"none"}},created:function(){var e=this.catalog.subcards,t=new Array(e.length);for(var a in e){var s=e[a];s.DATASOURCE={subcard_ISMORE:s.subcard_ISMORE,subcard_MORE_URL:s.subcard_MORE_URL,URL:s.url,METHOD:s.method,CONTENT_TYPE:s.content_TYPE,PAYLOAD:s.playload,QueryString:s.queryString?s.queryString:"&apikey=e71982d5401b488da4acef8827c41845",subcard_ZH:s.subcard_ZH}}t=e.sort(function(e,t){return e.subcard_INDEX-t.subcard_INDEX});var r=t[0].subcard_TYPE;"style1"!=r&&"style2"!=r||(this.captionRequired=!1),"style13"==r&&(this.isLatest=!0),this.moreHref=t[0].subcard_MORE_URL+"&column="+e[0].subcard_ZH,this.subcards=t},components:{style1:i.default,style2:n.default,style3:c.default,style4:u.default,style5:f.default,style7:m.default,style6:g.default,style8:x.default,style9:y.default,style10:S.default,style11:P.default,style12:T.default,style13:O.default},methods:{switchView:function(e){this.currentView=e,this.moreHref=this.subcards[e].subcard_MORE_URL+"&column="+this.subcards[e].subcard_ZH}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{list:[]}},props:["catalog"],created:function(){var e=this.catalog.subcards[0],t=this;$.ajax({type:"get",url:e.url+e.queryString,success:function(e,a,s){t.list=e},error:function(e,t,a){}})},ready:function(){function e(){var e=t.scrollLeft;t.scrollLeft++,t.scrollLeft==e&&(t.scrollLeft=0)}var t=document.getElementById("marquee"),a=t.getElementsByTagName("div"),s=(a[0],a[1],setInterval(e,50));t.onmouseover=function(){clearInterval(s)},t.onmouseout=function(){s=setInterval(e,50)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{swiper_id:"swiper"+(new Date).getTime(),requestBody:{URL:"http://bjecmportal.cnnp.com.cn:8000/news/9999?size=10",METHOD:"",CONTENT_TYPE:"",PAYLOAD:"",QueryString:""},scrollList:[],fetched:!1}},props:["dataSource"],created:function(){var e=this;$.ajax({type:"get",url:this.dataSource.URL+this.dataSource.QueryString,success:function(t,a,s){for(var r=t,i=0,o=r.length;i<o;i++){var n=r[i].imagePath;if(null==n){var l=Math.round(50*Math.random());r[i].imagePath="assets/images/default-pics/"+l+".png"}else r[i].imagePath=n.substr(n.indexOf("/"))}e.scrollList=r,e.fetched=!0,t.length>4&&e.$nextTick(function(){e.fetched&&e.swipe()})},error:function(e,t,a){}})},ready:function(){},methods:{swipe:function(){new Swiper("#"+this.swiper_id,{autoplay:5e3,autoplayDisableOnInteraction:!1,loop:!0,mode:"vertical",slidesPerView:4})},imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this;$.ajax({type:"get",url:this.dataSource.URL+this.dataSource.QueryString,success:function(t,a,s){for(var r=0,i=t.length;r<i;r++){t[r].publishDate=t[r].publishDate.substring(5);var o=t[r].imagePath;if(null==o){var n=Math.round(50*Math.random());t[r].imagePath="assets/images/default-pics/"+n+".png"}else t[r].imagePath=o.substr(o.indexOf("/"))}e.list=t},error:function(e,t,a){}})},ready:function(){},methods:{imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[],actual_list:[],id:"id"+(new Date).getTime(),overflowed:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e)},methods:{successNext:function(){this.actual_list=this.list.concat(),this.$nextTick(function(){for(var e=this.overflowed,t=document.getElementById(this.id).getElementsByTagName("a"),a=0;a<t.length;a++)e[a]=t[a].offsetHeight<t[a].scrollHeight;this.overflowed=[],this.overflowed=e})}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e),this.$watch("list",function(e){0!=e.length&&(null==e[0].imagePath?e[0].imagePath="assets/images/default-pics/"+Math.round(50*Math.random())+".png":e[0].imagePath=e[0].imagePath.substr(e[0].imagePath.indexOf("/")))})},methods:{imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e)}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e),this.$watch("list",function(e){0!=e.length&&(e[0].imagePath=e[0].imagePath.substr(e[0].imagePath.indexOf("/")))})}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{swiper_id:"swiper"+(new Date).getTime(),list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e)},methods:{successNext:function(){var e=this,t=this.list.slice(0,5);if(0!=t.length){for(var a=0;a<5;a++)null==t[a].imagePath?t[a].imagePath="assets/images/default-pics/"+Math.round(50*Math.random())+".png":t[a].imagePath=t[a].imagePath.substr(t[a].imagePath.indexOf("/"));this.list=t,this.$nextTick(function(){e.swipe()})}},swipe:function(){new Swiper("#"+this.swiper_id,{autoplay:5e3,autoplayDisableOnInteraction:!1,loop:!0,slidesPerView:3,calculateHeight:!0})},imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e),this.$watch("list",function(e){for(var t=0,a=e.length;t<a;t++){var s=e[t].imagePath;if(null==s){var r=Math.round(50*Math.random());e[t].imagePath="assets/images/default-pics/"+r+".png"}else e[t].imagePath=s.substr(s.indexOf("/"))}})},methods:{imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){},props:["dataSource"]}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1);t.default={data:function(){return{list:[]}},props:["dataSource"],created:function(){var e=this,t=this.dataSource;(0,s.fetchAjaxService)(t,e)},methods:{imgErrorLoad:function(e){var t=e.currentTarget;t.src="assets/images/default-pics/"+Math.round(50*Math.random())+".png"}}}},function(e,t,a){e.exports={default:a(20),__esModule:!0}},function(e,t,a){var s=a(21),r=s.JSON||(s.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},function(e,t){var a=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=a)},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".title[_v-35e57a6c]{padding:0 1.5rem}.date[_v-35e57a6c]{float:right;color:#999}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".swiper-container[_v-35f391ed]{padding:1.5rem 0}.swiper-slide img[_v-35f391ed]{width:100%;height:10rem;border:1px solid #d3d3d3}.list-item[_v-35f391ed]{height:auto;border-top:1px solid #d3d3d3;margin:6px 0;padding:6px 0}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".style8 iframe[_v-360fc0ef],.style8[_v-360fc0ef]{width:100%;height:100%}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".caption-list[_v-46440a90]{list-style:none}.caption-list li[_v-46440a90]{float:left}.tab-page[_v-46440a90]{color:#1c88b9}.tab-card[_v-46440a90]{cursor:pointer}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".inner-border[_v-86dc01ee]{height:4.5rem;min-height:4.5rem;border-top:3px solid #00a2e5}.caption-list[_v-86dc01ee]{list-style-type:none}.marquee[_v-86dc01ee]{white-space:nowrap;overflow:hidden}.marquee>div[_v-86dc01ee]{display:inline-block}.marquee a[_v-86dc01ee]{text-decoration:none;margin-right:8rem;font-size:1.4rem;font-weight:400;line-height:2rem;font-family:Microsoft YaHei Regular,microsoft yahei,Verdana,Arial,Helvetica,sans-serif;font-style:normal;color:#000}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".carousel-inner[_v-f7aa0db0]{height:100%}.carousel-inner .item[_v-f7aa0db0]{height:100%;position:relative;text-align:center;width:100%}.bg-border[_v-f7aa0db0]{height:36rem;margin:0 auto;text-align:center;position:absolute;z-index:1;left:0;right:0;-webkit-filter:blur(10px);filter:blur(10px);filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=10,MakeShadow=false)}.bg-border[_v-f7aa0db0],.bg-img[_v-f7aa0db0]{width:100%;-moz-filter:blur(10px);-ms-filter:blur(10px)}.bg-img[_v-f7aa0db0]{position:relative;height:auto;vertical-align:middle;-webkit-filter:blur(0);filter:blur(0);filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=10,MakeShadow=false)}.carousel-img[_v-f7aa0db0]{height:36rem!important;margin:0 auto;position:relative;z-index:9}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".list-item[_v-ffe3cc0c]{border-bottom:1px solid #d0ccc7;height:5.3rem}.list-item[_v-ffe3cc0c]:last-child{border-bottom:none}.panel .latest[_v-ffe3cc0c]{color:#000}.list-item .title[_v-ffe3cc0c]{padding:1rem 1rem 1rem 0;line-height:1.7rem;white-space:normal;alignment-baseline:baseline}.list-item .title a[_v-ffe3cc0c]{height:3.4rem;display:inline-block;overflow:hidden;position:relative;z-index:1}",""])},function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".desc-font .date[_v-fffffb0e]{font-size:1.4rem}.pure-txt .title[_v-fffffb0e]{padding-right:1rem}",""])},function(e,t){e.exports='<div class="swiper-container scroll-panel" :id=swiper_id style="height: 100%;border-top: 1px solid lightgrey"> <div class="swiper-wrapper list"> <div v-for="item in scrollList" class="swiper-slide row scroll-item" style="margin-top: -1px;border-top: 1px solid lightgrey;border-bottom: none"> <img v-bind:src=item.imagePath alt="" class=col-md-4 @error=imgErrorLoad /> <div class=col-md-8> <p class=subject-font><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank v-text=item.title></a></p> <div class=desc-font> <span class=site v-text=item.site></span> <span class=date v-text=item.publishDate.substring(5)></span> </div> </div> </div> </div> <a class="btn btn-sm find-more" v-if=dataSource.subcard_ISMORE style="position: absolute;top: -5px;right: -1rem" :href="dataSource.subcard_MORE_URL+\'&column=\'+dataSource.subcard_ZH" target=_blank>>> </a> </div>'},function(e,t){e.exports="<div class=style10> {{{list}}} </div>"},function(e,t){e.exports='<div class=material> <div class=list-item v-if="list.length>0" style="padding-top: 5px;padding-bottom: 1.6rem"> <a :href=list[0].linkAddr target=_blank> <img v-bind:src=list[0].imagePath alt=""/> <p :class="[\'subject-font\',\'subject\',{\'latest\':list[0].latest}]" v-text=list[0].title style="height: 4rem"></p> <div class="desc-font desc" v-if=list[0].subTitle>{{list[0].subTitle}} </div> <span class=date style="bottom: -1rem;font-size: 1.2rem"> {{list[0].publishDate}}</span> </a> </div> <template v-for="item in list|limitBy  2 1"> <div class="list-item simple-item"> <p class=subject-font><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank v-text=item.title></a> <span class="date desc-font" v-text=item.publishDate style="bottom: -1rem"></span></p> </div> </template> </div>'},function(e,t){e.exports='<div class=pure-txt> <ul class="list subject-font"> <li v-for="item in list" class=list-item> <p class=title><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank v-text=item.title></a> </p> <span class=date v-text=item.publishDate></span> </li> </ul> </div>'},function(e,t){e.exports='<div class=style7> <template v-for="item in list"> <div class="row scroll-item"> <img v-bind:src=item.imagePath alt="" class=col-md-4 @error=imgErrorLoad /> <div class=col-md-8> <p class=subject-font><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank>{{item.title}}</a></p> <div class=desc-font> <span class=site>{{item.site}}</span> <span class=date>{{item.publishDate}}</span> </div> </div> </div> </template> </div>'},function(e,t){e.exports='<div class="style9 poster"> <a> <img :src="\'./assets/images/portal/u402.png\'" alt=""/> </a> <ul class=list> <li class=list-item v-for="pitem in list"> <p class=title><a :class="{\'latest\':pitem.latest}" :href=pitem.linkAddr target=_blank v-text=pitem.title></a> </p> <span class=date v-text=pitem.publishDate></span> </li> </ul> </div>'},function(e,t){e.exports='<div class=movie-panel _v-35e57a6c=""> <video style="width: 100%;margin-top: 1rem" height=240 controls=controls :poster="\'assets/images/default-pics/\'+Math.round(Math.random()*50)+\'.png\'" _v-35e57a6c=""> <source v-bind:src=list[0].imagePath type=video/ogg _v-35e57a6c=""> <source v-bind:src=list[0].imagePath type=video/mp4 _v-35e57a6c=""> Your browser does not support the video tag. </video> <p class="subject-font title" _v-35e57a6c=""><a :class="{\'latest\':list[0].latest}" :href=list[0].linkAddr target=_blank _v-35e57a6c="">{{list[0].title}}</a> <span class=date v-text=list[0].publishDate _v-35e57a6c=""></span></p> </div>'},function(e,t){e.exports='<div class=style6 _v-35f391ed=""> <div class=swiper-container :id=swiper_id style="width: 100%" _v-35f391ed=""> <div class=swiper-wrapper _v-35f391ed=""> <div v-for="item in list" class=swiper-slide _v-35f391ed=""> <a :href=item.linkAddr _v-35f391ed=""> <img v-bind:src=item.imagePath alt="" @error=imgErrorLoad _v-35f391ed=""></a> </div> </div> </div> <div class=txt-content _v-35f391ed=""> <template v-for="item in list|limitBy  3"> <div class="list-item simple-item" _v-35f391ed=""> <p class=subject-font _v-35f391ed=""><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank v-text=item.title _v-35f391ed=""></a> <span class="date desc-font" v-text=item.publishDate _v-35f391ed=""></span></p> </div> </template> </div> </div>'},function(e,t){e.exports='<div class=style8 _v-360fc0ef=""> <iframe frameborder=no border=0 :src=dataSource.URL _v-360fc0ef=""></iframe> </div>'},function(e,t){e.exports='<template v-if=isLatest> <style13 :catalog=catalog _v-46440a90=""> </style13></template> <template v-else=""> <div :class="[\'panel\',\'col-md-\'+4*catalog.card_WIDTH]" _v-46440a90=""> <div :class="[\'inner-border\',{\'catalog-panel\':captionRequired}]" :style="{borderTop: borderTop}" _v-46440a90=""> <div v-if=captionRequired class=caption _v-46440a90=""> <ul class=caption-list _v-46440a90=""> <li v-for="item in subcards" _v-46440a90=""> <span v-if="$index>0" _v-46440a90="">&nbsp;|</span> <a @click=switchView($index) :class="[\'tab-card\',{\'tab-page\':currentView==$index}]" _v-46440a90="">{{item.subcard_ZH}}</a> </li> </ul> <a class="btn btn-sm find-more" v-if="subcards[currentView].subcard_ISMORE==\'1\'" :href=moreHref target=_blank _v-46440a90="">更多&gt;&gt; </a> </div> <template v-for="item in subcards"> <component :is=item.subcard_TYPE v-show="currentView==$index" :data-source=item.DATASOURCE _v-46440a90=""> </component> </template> </div> </div> </template>'},function(e,t){e.exports='<div class="panel col-md-12" _v-86dc01ee=""> <div class="inner-border catalog-panel" _v-86dc01ee=""> <div class=caption style="border-bottom: none" _v-86dc01ee=""> <ul class=caption-list _v-86dc01ee=""> <li _v-86dc01ee=""> <div style="float: left;margin-right: 3rem" _v-86dc01ee="">最新发布：</div> <div id=marquee class=marquee _v-86dc01ee=""> <div class=marquee-first _v-86dc01ee=""> <a v-for="item in list" :href=item.linkAddr target=_blank v-text=item.title _v-86dc01ee=""></a> </div> <div class=marquee-second _v-86dc01ee=""> <a v-for="item in list" :href=item.linkAddr target=_blank v-text=item.title _v-86dc01ee=""></a> </div> </div> </li> </ul> </div> </div> </div>'},function(e,t){e.exports='<div :id=carousel_id class="carousel slide" style="height: 100%" _v-f7aa0db0=""> <ol class=carousel-indicators _v-f7aa0db0=""> <li v-for="n in carousel.length" :class="{\'active\':n==0}" :data-target="\'#\'+carousel_id" :data-slide-to=n _v-f7aa0db0=""></li> </ol> <div class=carousel-inner role=listbox _v-f7aa0db0=""> <template v-for="car in carousel"> <div :class="[\'item\',{\'active\':$index==0}]" _v-f7aa0db0=""> <a :href=car.linkAddr target=_blank _v-f7aa0db0=""> <div class=bg-border :style="{background:\'url(\'+car.imagePath+\'),url(assets/images/default-pics/\'+Math.round(Math.random()*50)+\'.png) center no-repeat\',backgroundSize:\'100%\',backgroundPosition:\'50% 50%\'}" _v-f7aa0db0=""> </div> <img class=carousel-img :src=car.imagePath @error=imgErrorLoad($index,$event) _v-f7aa0db0=""> </a> <div class=carousel-caption v-text=car.title _v-f7aa0db0=""> </div> </div> </template> </div> <a class="left carousel-control" :href="\'#\'+carousel_id" role=button data-slide=prev _v-f7aa0db0=""> <span class="glyphicon glyphicon-chevron-left" aria-hidden=true _v-f7aa0db0=""></span> <span class=sr-only _v-f7aa0db0="">Previous</span> </a> <a class="right carousel-control" :href="\'#\'+carousel_id" role=button data-slide=next _v-f7aa0db0=""> <span class="glyphicon glyphicon-chevron-right" aria-hidden=true _v-f7aa0db0=""></span> <span class=sr-only _v-f7aa0db0="">Next</span> </a> </div>'},function(e,t){e.exports='<div class=style12 :id=id _v-ffe3cc0c=""> <ul class=list _v-ffe3cc0c=""> <li class=list-item v-for="pitem in actual_list" _v-ffe3cc0c=""> <p class=title _v-ffe3cc0c=""><a :href=pitem.linkAddr target=_blank v-text=pitem.title _v-ffe3cc0c=""> </a> </p> <span class=date v-text=pitem.publishDate _v-ffe3cc0c=""></span> </li> </ul> </div>'},function(e,t){e.exports='<div class=style7 _v-fffffb0e=""> <div class=scroll-item _v-fffffb0e=""> <img v-bind:src=list[0].imagePath alt="" class=col-md-4 @error=imgErrorLoad _v-fffffb0e=""> <div class=col-md-8 _v-fffffb0e=""> <p class=subject-font _v-fffffb0e=""><a :class="{\'latest\':list[0].latest}" :href=list[0].linkAddr target=_blank v-text=list[0].title _v-fffffb0e=""></a></p> <div class=desc-font _v-fffffb0e=""> <span class=site v-text=list[0].site _v-fffffb0e=""></span> <span class=date v-text=list[0].publishDate _v-fffffb0e=""></span> </div> </div> </div> <ul class="list subject-font pure-txt" _v-fffffb0e=""> <li v-for="item in list| limitBy 5 1" class=list-item _v-fffffb0e=""> <p class=title _v-fffffb0e=""><a :class="{\'latest\':item.latest}" :href=item.linkAddr target=_blank v-text=item.title _v-fffffb0e=""></a> </p> <span class=date v-text=item.publishDate _v-fffffb0e=""></span> </li> </ul> </div>'},function(e,t,a){var s,r;a(62),s=a(5),r=a(41),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(60),s=a(6),r=a(39),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(8),r=a(30),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(9),r=a(31),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(64),s=a(10),r=a(43),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(63),s=a(11),r=a(42),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(12),r=a(32),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(13),r=a(33),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(57),s=a(14),r=a(36),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(58),s=a(15),r=a(37),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(16),r=a(34),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;a(59),s=a(17),r=a(38),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s,r;s=a(18),r=a(35),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},function(e,t,a){var s=a(22);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(23);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(24);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(25);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(26);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(27);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(28);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)},function(e,t,a){var s=a(29);"string"==typeof s&&(s=[[e.id,s,""]]),a(3)(s,{}),s.locals&&(e.exports=s.locals)}]);