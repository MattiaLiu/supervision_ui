<!--pure txt in title style -->
<style scoped>
	.list-item{
	border-bottom:  1px solid #D0CCC7;
	height: 5.3rem;
	}
	.list-item:last-child{
		border-bottom: none;
	}
	.panel .latest{
		color: black;
	}
	.list-item .title{
		/*font-weight: 600;*/
		padding: 1rem 1rem 1rem 0;
		line-height: 1.7rem;
		white-space: normal;
		alignment-baseline: baseline;
	}
	.list-item .title a{
		height: 3.4rem;
		display: inline-block;
		overflow: hidden;	
		position: relative;
		z-index: 1;

	}

	/*.list-item .title a.overflowed::after{
		content: "...";
		line-height:1.7rem;
		display: inline-block;
		position: absolute;
		background: white;
		z-index: 10;
		right: 0;
		bottom: 0;
		opacity: 1;
	
	}*/
</style>
<template>
	<div class="style12" :id="id">
        <ul class="list">
            <li class="list-item" v-for="pitem in actual_list">
                <p class="title"><a   :href="pitem.linkAddr" target="_blank" v-text='pitem.title'>
                	<!-- <div v-if="overflowed[$index]" style="position: absolute;z-index: 10;right:0;bottom: 0;opacity: 1;background: white;line-height: 1.7rem;height: 1.7rem;width: 1.4rem;">...</div> -->
                </a>
                </p>
                <span class="date" v-text="pitem.publishDate"></span>
            </li>
        </ul>
	</div>
</template>
<script>
	import {fetchAjaxService} from "../../common-function.js";
	export default{
		data(){
			return{
				list:[],
				actual_list:[],
				id:"id"+(new Date().getTime()),
				overflowed:[]
			};
		},
		props:["dataSource"],
		created(){
			let _this=this;
			let dataSource=this.dataSource;
			fetchAjaxService(dataSource,_this);			
		},

		
		methods:{
			successNext:function () {
				// body...
				this.actual_list=this.list.concat();
				this.$nextTick(function () {
					// body...
					let overflowed=this.overflowed;
					let adoms=document.getElementById(this.id).getElementsByTagName("a");
					for(let i=0;i<adoms.length;i++){
						overflowed[i]=adoms[i].offsetHeight < adoms[i].scrollHeight;
					}
					this.overflowed=[];
					this.overflowed=overflowed;

				});
			}
			
		}
	};
</script>