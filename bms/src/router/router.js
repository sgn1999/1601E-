import vueRouter from "vue-router";
import Home from "../component/hoempage/homepage.vue";
import Platform from "../component/platform/platform.vue";
import axios from "axios";
export default new vueRouter({
	routes:[
		{path:"/",redirect:"/home"},
		{path:"/home",component:Home},
		{
			path:"/platform",
			component:Platform,
			beforeEnter(to,from,next){
				axios.get("/data").then((val)=>{
					sessionStorage.setItem('data',JSON.stringify(val.data));
					next();
				})
			}
		}
	]
})