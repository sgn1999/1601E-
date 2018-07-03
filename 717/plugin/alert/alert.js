import alert from "./alert.vue";
export default ()=>{
	return {
		install(Vue){ 
			Vue.component("Alert",alert)
		}
	}
}