<!--3左图右文-->
<style scoped>
	.desc-font .date{
		font-size: 1.4rem;
	}
	.pure-txt .title{
		padding-right: 1rem;
	}
</style>
<template>
	 <!-- <div class="scroll-panel"> -->
	 <!-- start -->
	<div class="style7"  >	
		<div  class="scroll-item" >
            <img v-bind:src="list[0].imagePath" alt="" class="col-md-4" @error="imgErrorLoad"/>

            <div class="col-md-8">
                <p class="subject-font"><a :class="{'latest':list[0].latest}" :href="list[0].linkAddr"
                                           target="_blank" v-text="list[0].title"></a></p>

                <div class="desc-font">
                    <span class="site" v-text="list[0].site"></span>
                    <span class="date" v-text='list[0].publishDate'></span>
                </div>
            </div>
        </div>
        <ul class="list subject-font pure-txt">
            <li v-for="item in list| limitBy 5 1" class="list-item">
                <p class="title"><a :class="{'latest':item.latest}" :href="item.linkAddr" target="_blank" v-text="item.title"></a>
                </p>
                <span class="date" v-text='item.publishDate'></span>
            </li>    
         </ul>
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
				success:function(jsonArray,status,xhr){
                     for(let i=0,len=jsonArray.length;i<len;i++){
                            jsonArray[i].publishDate=jsonArray[i].publishDate.substring(5);
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