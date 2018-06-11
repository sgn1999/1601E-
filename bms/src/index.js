import Vue from 'vue';
import axios from "axios";
import vueRouter from "vue-router";
import router from "./router/router.js";
import App from "./component/app.vue";
import instace from "../service/http.js";
import Vuex from "vuex";
import store from "./store/store.js";
Object.defineProperty(Vue.prototype,"$http",{
	value:instace
})
function installAxios(){
	return {
	 install(vm){
		vm.prototype.axios = axios
	 }
	}
};
Vue.use(installAxios());
Vue.use(vueRouter);
Vue.prototype.Bus = new Vue();
let vm = new Vue({
	el:"#box",
	data:{
		num:1
	},
	template:"<App/>",
	components:{
		App
	},
	methods:{
		
	},
	beforeMount(){
		this.$http.get("/userList").then((val)=>{
			// console.log(val);
		})
		console.log(this.$store);
	},
	router,
	store
})