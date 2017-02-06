<!--1左图右文+5文字 -->
<template>
	 <!-- <div class="scroll-panel"> -->
	 <!-- start -->
	 		<div class="scroll-panel"  style="height: 100%;border-top: 1px solid lightgrey;">
		

				<div v-for="item in list" class="swiper-slide row scroll-item" style="margin-top: -1px;border-top: 1px solid lightgrey;border-bottom: none;">
                    <img v-bind:src="item.imagePath" alt="" class="col-md-4" @error="imgErrorLoad"/>

                    <div class="col-md-8">
                        <p class="subject-font"><a :class="{'latest':item.latest}" :href="item.linkAddr"
                                                   target="_blank" v-text="item.title"></a></p>

                        <div class="desc-font">
                            <span class="site" v-text="item.site"></span>
                            <span class="date" v-text='item.publishDate.substring(5)'></span>
                        </div>
                    </div>
                </div>
	</div>
</template>
<script>
	export default{
			data(){return {
		    list:[]
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
                                let randNum=Math.round(Math.random()*50);
                                jsonArray[i].imagePath="assets/images/default-pics/"+randNum+".png";
                            }else{
                             jsonArray[i].imagePath=imgpath.substr(imgpath.indexOf("/"));
                            }
                        }
                        _this.list=jsonArray;
                     
				},
				error:function(result,status,xhr){
					// console.log("error",result);
				}
			});
			;
		},
		ready(){
		},
		methods:{
			imgErrorLoad:function (ev) {
			    // body...
			var tar=ev.currentTarget;
			tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>