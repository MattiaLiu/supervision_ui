<!-- 最新发布样式latest-release style-->
<style scoped>
	.inner-border{
		height: 4.5rem;min-height: 4.5rem;border-top: 3px solid rgb(0, 162, 229);
	}
	.caption-list{
		list-style-type: none;
	}
	.marquee{
	white-space: nowrap;
	overflow: hidden;
	}
	.marquee>div{
		display: inline-block;
	}
	.marquee a{
		text-decoration: none;
		margin-right: 8rem;
		font-size: 1.4rem; 
		font-weight: 400;
        line-height: 2rem;
        font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        font-style: normal;
        color: black;
	}
</style>
<template>
	<div  class="panel col-md-12">
	    <div  class="inner-border catalog-panel">
	        <div class="caption"  style="border-bottom: none;">
	            <ul class="caption-list" >
	                <li>                
	                    <div style="float: left;margin-right: 3rem;">最新发布：</div>
	                    <div id="marquee" class="marquee">
	                    	<div class="marquee-first">
	                			<a v-for="item in list" :href="item.linkAddr" target="_blank" v-text="item.title"></a>

	                    	</div>
	                    	<div class="marquee-second">
	                			<a v-for="item in list" :href="item.linkAddr" target="_blank" v-text="item.title"></a>
	                    	</div>
	                    </div>
	                    
	                </li>
	            </ul>
	        </div>
	      
	    </div>
	</div>
</template>


<script >
	export default{
		data(){
			return{
				list:[]
			};
		},
		props:['catalog'],
		created(){
			let card=this.catalog.subcards[0];
			let _this=this;
			$.ajax({
				type:"get",
				url:card.url+card.queryString,
				success:function(result,status,xhr){  
                         _this.list=result;
				},
				error:function(result,status,xhr){
					// console.log("error",result);
				}
			});
		},
		ready:function(){
			var marqueeOuter=document.getElementById("marquee");
           var marqueeInner=marqueeOuter.getElementsByTagName('div');
           var marqueeLeft=marqueeInner[0],marqueeRight=marqueeInner[1];
           function Marquee(){
            var scrollLeftOrigin=marqueeOuter.scrollLeft;
             marqueeOuter.scrollLeft++;
             if(marqueeOuter.scrollLeft==scrollLeftOrigin)marqueeOuter.scrollLeft=0;
           }
            var marqueeInterval=setInterval(Marquee,50);
            marqueeOuter.onmouseover=function(){clearInterval(marqueeInterval);};
            marqueeOuter.onmouseout=function(){marqueeInterval=setInterval(Marquee,50);};
		}
	};
</script>