import Vue from "vue";
import Vuex from "vuex";
import {http} from "../../service/http.js";
import {getCookie} from "../../service/util/cookies.js";
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		clfListData:{},
		shopListData:[]
	},
	mutations:{
		getClfListData(state,payload){ 
			let newData = {...state.clfListData};
			newData[payload.id] = payload.data;
			state.clfListData = newData;
		},
		getShopListData(state,payload){ 
			state.shopListData = payload.data;
		},
		addList(state,payload){
			state.shopListData = payload.data;
		},
		jianList(state,payload){ 
			state.shopListData = payload.data;
		}
	},
	actions:{
		actGetClfListData(context,payload){
			if(!context.state.clfListData[payload]){
				http.get("http://localhost:3000/classdata?id="+payload).then(res=>{
					context.commit('getClfListData',{id:payload,data:res});
				})
			}
		},
		actGetShopListData(context,payload){
			let token = getCookie("token");
			http.post("http://localhost:3000/shoplist",{"token":token}).then((res)=>{  
				context.commit('getShopListData',{data:res.shopdata});
			})
		},
		actAddList(context,payload){
			let token = getCookie("token");
			http.get("http://localhost:3000/shopchange",{params:{'wareId':payload.wareId,'type':'add',"token":token}}).then((res)=>{ 
				let token = getCookie("token");
				http.post("http://localhost:3000/shoplist",{"token":token}).then((res)=>{ 
					//this.data = res.shopdata; 
					context.commit("addList",{data:res.shopdata}) 
				})
			})
		},
		actJianList(context,payload){
			let token = getCookie("token");
			http.get("http://localhost:3000/shopchange",{params:{'wareId':payload.wareId,'type':'jian',"token":token}}).then((res)=>{ 
				let token = getCookie("token");
				http.post("http://localhost:3000/shoplist",{"token":token}).then((res)=>{ 
					context.commit('jianList',{data:res.shopdata}) 
				})
			})
		}
	},
	getters:{
		
	}
})