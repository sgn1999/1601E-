import Vue from "vue";
import router from "./router/router.js";
import App from "./component/app.vue";
import $http from "../service/http.js";
import VueLazyload from 'vue-lazyload';
import store from "../src/store/store.js";
import Alert from "../plugin/alert/alert.js";
Vue.use(Alert());
Vue.use(VueLazyload,{
	loading:"/dist/static/img/load/load.gif"
});
Vue.use($http);
Vue.prototype.Bus = new Vue();
let vm = new Vue({
	el:"#box",
	template:"<App />",
	router,
	components:{
		App
	},
	store
})