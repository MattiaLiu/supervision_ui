<style scoped>
	.carousel-inner{
		height: 100%;
	}
	.carousel-inner .item{
		height: 100%;
        position: relative;
        text-align: center;
        width: 100%;
	}
    .bg-border{
        width: 100%;
        height: 36rem;
        margin:0 auto;
        text-align: center;
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        -webkit-filter: blur(10px); /* Chrome, Opera */
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
            filter: blur(10px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); 
    }
    /*.bg-container{
        position: absolute;
        width: 100%;
        height: 36rem;
        z-index: 1;
        left: 0;
        top: 0;
    }*/
    .bg-img{
        /*position: absolute;*/
        position: relative;
        width: 100%;
        height: auto;
            /*z-index: 1;*/
            vertical-align: middle;
           -webkit-filter: blur(0px); /* Chrome, Opera */
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
            filter: blur(0px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
    }
    .carousel-img{
        height: 36rem!important;
        margin: 0 auto;
        position: relative;
        z-index: 9;
    }


</style>
<template>	
	 	 <div :id="carousel_id" class="carousel slide"   style="height: 100%;">
            <!-- Indicators -->
            <ol class="carousel-indicators">          
                <li v-for="n in carousel.length" :class="{'active':n==0}" :data-target="'#'+carousel_id"
                    :data-slide-to="n"></li>

            </ol>
				
            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
                <template v-for="car in carousel">
                    <div :class="['item',{'active':$index==0}]">
                        <a :href="car.linkAddr" target="_blank">
                         <div  class="bg-border" :style="{background:'url('+car.imagePath+'),url(assets/images/default-pics/'+Math.round(Math.random()*50)+'.png) center no-repeat',backgroundSize:'100%',backgroundPosition:'50% 50%'}" >
                         </div>
                        <!-- <div class="bg-container">                            
                            <img class="bg-img" :src="car.imagePath"  @error="imgErrorLoad($index)">
                        </div> -->
                         <img class="carousel-img" :src="car.imagePath" @error="imgErrorLoad($index,$event)">
                      
                        
                           <!--  <div  :style="{width: '100%',height:'36rem',margin:'0 auto',background:'url('+car.imagePath+'),url(assets/images/default-pics/'+Math.round(Math.random()*50)+'.png) center no-repeat',backgroundSize:'100%',backgroundPosition:'50% 50%'}" >
                            </div>   -->                      
                        </a>
                        <div class="carousel-caption"  v-text="car.title">
                        </div>
                    </div>
                </template>
            </div>
            <!-- Controls -->
            <a class="left carousel-control" :href="'#'+carousel_id" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" :href="'#'+carousel_id" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
	
</template>
<script>
	export default{
		data:function(){
			return{				
		        carousel_id:"carousel_id"+(new Date().getTime()),				      
		        carousel:[]
			};
		},
		props:["dataSource"],
		created(){
			let _this=this;
			$.ajax({
				type:"get",
				url:this.dataSource.URL+this.dataSource.QueryString,
				success:function(result,status,xhr){
                    let jsonArray = result;
                     for(let i=0,len=jsonArray.length;i<len;i++){
                     	let imgpath=jsonArray[i].imagePath;
                            if(imgpath==null){
                                let randNum=Math.round(Math.random()*22);
                                jsonArray[i].imagePath="/assets/images/default-pics/"+randNum+".png";
                            }else{
                             jsonArray[i].imagePath=imgpath.substr(imgpath.indexOf("/"));
                            }
                        }
                        _this.carousel=jsonArray;
                        _this.$nextTick(function(){
                            $("#"+_this.carousel_id).carousel({
                                interval:5000
                            });
                        });
				},
				error:function(result,status,xhr){
					// console.log("error",result);
				}
			});
		},
        methods:{
            imgErrorLoad:function (index,ev) {
                // body...
            var tar=ev.currentTarget;
            let imgSrc='/assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
            let carousel=this.carousel;
            carousel[index].imagePath=imgSrc;
            // this.carousel=[];
            this.carousel=carousel;
            // tar.src=imgSrc;
            // $(tar).prev()[0].src=imgSrc;
             $(tar).prev()[0].style.backgroundImage="url("+imgSrc+")";
            }
        }
	};
</script>