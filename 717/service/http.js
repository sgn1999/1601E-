import axios from "axios";
console.log(process.env.NODE_ENV);
let httpInstatce = axios.create({
	
});
httpInstatce.interceptors.request.use(config=>{//在这里的config就是axios。create中传入的对象  
	return config;
},err=>{
	return Promise.reject(err); 
})
httpInstatce.interceptors.response.use(res=>{ 
	if(res.config.url.indexOf("keywordsPromptNew")>-1){
		return res.data
	}else if(res.config.url.indexOf("resmes")>-1 || res.config.url.indexOf("logn")>-1 || res.config.url.indexOf("shoplis")>-1 || res.config.url.indexOf("addshop")>-1 || res.config.url.indexOf("shopchange")>-1 || res.config.url.indexOf("del")>-1 || res.config.url.indexOf("address")>-1 || res.config.url.indexOf("setaddress")>-1 || res.config.url.indexOf("addressdel")>-1 || res.config.url.indexOf("upload")>-1){
		return res.data;
	}else{
		return JSON.parse(res.data).secondLevelCategories || JSON.parse(JSON.parse(res.data).recommend).wareInfoList;addressdel
	}
	// return  typeof res=="string"?(JSON.parse(JSON.parse(res.data).recommend).wareInfoList || JSON.parse(res.data).secondLevelCategories):res.data
},err=>{
	return Promise.reject(err);
})
export let http = httpInstatce;
export default {
	install(Vue){ 
		Object.defineProperty(Vue.prototype,"$http",{
			value:httpInstatce
		})
	}
}