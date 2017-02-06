import ComHeader from "./components/header.vue";
import ComFooter from "./components/footer.vue";
let headerVm = new Vue({
    el: "header",
    components: {
        ComHeader
    }
});
let footerVm = new Vue({
    el: "footer",
    components: {
        ComFooter
    }
});