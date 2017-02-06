<style scoped>
    .caption-list{
        list-style: none;
    }
    .caption-list li{
        float: left;
    }
    .tab-page{
        color: #1c88b9;
    }.tab-card{
        cursor: pointer;
    }
</style>
<template>
    <template v-if="isLatest">
        <style13 :catalog="catalog"></style>
    </template>   
    <template v-else>
       <div  :class="['panel','col-md-'+4*catalog.card_WIDTH]">
            <div :class="['inner-border',{'catalog-panel':captionRequired}]" :style='{borderTop: borderTop}'>
                <div v-if="captionRequired" class="caption">
                <ul class="caption-list">
                    <li v-for="item in subcards">
                        <span v-if="$index>0">&nbsp|</span>
                         <a  @click="switchView($index)" :class="['tab-card',{'tab-page':currentView==$index}]">{{item.subcard_ZH}}</a>
                    </li>
                </ul>                   
                <a class="btn btn-sm find-more" v-if="subcards[currentView].subcard_ISMORE=='1'" :href="moreHref" target="_blank">更多>>
                </a>
                </div>
                <template v-for="item in subcards">
                     <component :is="item.subcard_TYPE" v-show="currentView==$index"  :data-source="item.DATASOURCE"
                    >                           
                   </component>
               </template>
           </div>
     </div>
    </template>
     
</template>

<script>
import style1 from "./carousel.vue";
import style2 from "./scroll-catalog.vue";
import style3 from "./style3.vue";
import style4 from "./style4.vue";
import style5 from "./style5.vue";
import style7 from "./style7.vue";
import style6 from "./style6.vue";
import style8 from "./style8.vue";
import style9 from "./style9.vue";
import style10 from "./style10.vue";
import style11 from './style11.vue';
import style12 from './style12.vue';
import style13 from './latest-release.vue';

module.exports={
    data:function(){
        return{          
            subcards:[],
            captionRequired:true,
            moreHref:"",
            currentView:0,
            isLatest:false
        };
    },
    props:["catalog"],
    computed:{
        borderTop:function(){
           return this.captionRequired?"3px solid "+this.catalog.card_TOP_COLOR:"none";
        }
    },
         
   created(){
    let subcards=this.catalog.subcards;
    let resultSubcards=new Array(subcards.length);
    for(let i in subcards){
      let subcard= subcards[i];
        subcard.DATASOURCE={
            subcard_ISMORE:subcard.subcard_ISMORE,
            subcard_MORE_URL:subcard.subcard_MORE_URL,
            URL:subcard.url,
            METHOD:subcard.method,
            CONTENT_TYPE:subcard.content_TYPE,
            PAYLOAD:subcard.playload,
            QueryString:subcard.queryString?subcard.queryString:"&apikey=e71982d5401b488da4acef8827c41845",
            subcard_ZH:subcard.subcard_ZH
        };
        // resultSubcards[parseInt(subcard.subcard_INDEX)-1]=subcard;
    }
     resultSubcards=subcards.sort(function(a,b){
                    return a.subcard_INDEX-b.subcard_INDEX
                });
        let subcard_TYPE=resultSubcards[0].subcard_TYPE;
        if(subcard_TYPE=="style1"||subcard_TYPE=="style2")this.captionRequired=false;
        if(subcard_TYPE=="style13")this.isLatest=true;
        this.moreHref=resultSubcards[0].subcard_MORE_URL+'&column='+subcards[0].subcard_ZH;
        this.subcards=resultSubcards;
    },  
    components:{
        style1,
        style2,
        style3:style3,
        style4,
        style5,
        style7,
        style6,
        style8,
        style9,
        style10,
        style11,
        style12,
        style13
    },
    methods:{
      switchView(index){
        this.currentView=index; 
        this.moreHref=this.subcards[index].subcard_MORE_URL+'&column='+this.subcards[index].subcard_ZH;       
      }  
    }
};

</script>
