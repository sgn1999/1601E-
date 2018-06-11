import axios from "axios";
let instance = axios.create({
	timeout:3000
});
instance.interceptors.request.use(function(config){
 // 在发送请求之前做些什么
 // console.log(config);
 return config
},function(err){
 // 对请求错误做些什么
 // console.log(err);
 return Promise.reject(err);
})

instance.interceptors.response.use(function(config){
// 对响应数据做点什么
// console.log(config)
 return config.data;
},function(err){
 // 对响应错误做点什么
 return Promise.reject(err);
})
export default instance;