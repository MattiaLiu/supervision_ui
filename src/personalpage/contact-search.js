/**
 * Created by kingsinsd on 2016/7/11.
 */
import LeaderSelect from "../personalpage/personalpagesearch.vue";
// alert(LeaderSelect)
let headerVm=new Vue({
    el:"#article",
    data(){
        return{
            leaders:[]
        };
    },

    components:{leaderSelect:LeaderSelect}
});