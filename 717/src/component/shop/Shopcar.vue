<template>
	<div class="box">
		<div class='head'>
			<span><</span> 
			<span></span>
			<div class="shop">
				<span>购物车</span>
			</div>
			<div>
				<span class="bianji" @click="bianji = !bianji"><b v-show='bianji'>编辑</b><b v-show='!bianji'>完成</b></span> 
				<span>✉</span>
			</div>
		</div>
		<div class='main'>
			<div class="list" v-show="data.length==0">
				你的购物车啥也没有！
			</div>  
			<List v-show="data.length!=0" v-for="val in data" :data="val"/>
		</div>
		<div class="bottom">
			<div class="bottomLeft">
				<input type="checkbox" v-model="allChk" @change='chkAll'>
				<span>全选</span>
			</div>
			<div class="bottomRight">
				<div class="allPrice">
					<span>合计<b>${{this.allNum}}</b></span> 
				</div>
				<div>
					<button v-show='bianji'>结算</button>
					<button v-show='!bianji' @click='del'>删除</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import {getCookie} from "../../../service/util/cookies.js";
import List from "./shoplist.vue";
export default{
	beforeRouteEnter(to,from,next){
		if(getCookie("token")){
			next();
		}else{
			next("/logn");
		}
	},
	beforeCreate(){ 
		this.$store.dispatch('actGetShopListData');
	},data(){
		return { 
			arr:[],
			allNum:0,
			allChk:false,
			bianji:true
		}
	},
	mounted(){
		this.Bus.$on("getChk",(value)=>{
			let i=0;
			let newarr = [...this.arr];
			let flag = newarr.some((val,ind)=>{
				if(val.data.wareId == value.data.wareId){
					newarr[ind] = value;
					return true;
				}else{
					return false;
				}
			}) 
			if(!flag){
				newarr.push(value);
			}
			this.arr = newarr;  

			this.arr.forEach((val,ind)=>{
				if(val.chk){
					i++;
					this.allNum += val.data.jdPrice * val.data.similarEnter;
				}
			}) 
			if(i==this.data.length){
				this.allChk = true;
			}else{
				this.allChk = false;
			}
		})
	},
	watch:{
		arr(n,o){ 
			this.allNum = 0;
			n.forEach((val,ind)=>{
				if(val.chk){ 
					this.allNum += val.data.jdPrice * val.data.similarEnter;
				}
			}) 
		}
	},
	computed:{
		...mapState({data:'shopListData'})
	},
	methods:{
		// add(wareId){
		// 	// let token = getCookie("token");
		// 	// this.$http.get("http://localhost:3000/shopchange",{params:{'wareId':wareId,'type':'add',"token":token}}).then((res)=>{ 
		// 	// 	let token = getCookie("token");
		// 	// 	this.$http.post("http://localhost:3000/shoplist",{"token":token}).then((res)=>{ 
		// 	// 		this.data = res.shopdata;  
		// 	// 	})
		// 	// })
		// },
		// jian(wareId){
		// 	// let token = getCookie("token");
		// 	// this.$http.get("http://localhost:3000/shopchange",{params:{'wareId':wareId,'type':'jian',"token":token}}).then((res)=>{ 
		// 	// 	let token = getCookie("token");
		// 	// 	this.$http.post("http://localhost:3000/shoplist",{"token":token}).then((res)=>{ 
		// 	// 		this.data = res.shopdata;  
		// 	// 	})
		// 	// })
		// }

		chkAll( ){  
			this.Bus.$emit('allchks',{chk:this.allChk});
			console.log(111111111)
		},
		del(){
			let token = getCookie("token");
			let newArr = [];
			let Arr = [];
			this.arr.forEach((val,ind)=>{ 
				if(val.chk){ 
					newArr.push(val.data.wareId);
				}else{
					Arr.push(val);
				}
			})  
			this.arr = Arr;
			console.log(newArr);
			this.$http.get("http://localhost:3000/del",{params:{token:token,delarr:newArr}}).then((res)=>{   
				this.$store.dispatch('actGetShopListData');
			})
		}
	},
	components:{
		List
	}
}
</script>
<style scoped>
.box{
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	background-color: #eeeeee;
}
.head{
	width: 100%;
	height: .97rem;
	display: flex;
	border-bottom: .01rem solid #ccc;
	align-items:center;
	justify-content: space-around; 	
	position: relative;
	background-color:#fafafb;
}
.head div{
	display: flex; 
} 
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
}
span{
	color:#464646;
} 
.bianji{
	margin-right: 0.3rem;
}
.shop{
	position: absolute;
	left: 50%;
	transform: translatex(-50%);
}

.bottom{
	width: 100%;
	height: .97rem;
	background-color:#fff;
	display:flex;
	justify-content:space-around;
	align-items:center;
}
.allPrice{
	display:flex;
	flex-direction:column;
	margin-right: .3rem;
}
.bottomRight{
	display:flex;
	align-items:center;
}
button{
	width: 2.55rem;
	height: .9rem;
	border: none;
	outline: none;
	background-color:#fc4141;
	color:#fff;
	text-align: center;
	line-height: .9rem;
}
</style>