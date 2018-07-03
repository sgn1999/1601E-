<template>
	<div class="box">
		<header>
			<div><router-link to="/main/my"><</router-link></div>
			<div>我的地址</div>
			<div></div>
		</header> 
		<div class="list" v-for="val in data">
			<div><span style="margin-right: .3rem">{{val.name}}</span><span>{{val.phone}}</span></div>
			<div><b>{{val.address}}</b></div>
			<div class="chkbox">
				<div class="chkLeft">
					<input type="checkbox" v-model="val.isDefault" @change="chgdefault(val)" />
					<span>默认地址</span>
				</div>
				<div>
					<span @click="edit(val)">编辑</span>
					<span @click="del(val)">删除</span>
				</div>
			</div>
		</div>
		<div class="adddress">
			<router-link to="/increaseaddress">
				+ 新增地址
			</router-link>
		</div>
	</div>
</template>
<script>
import {getCookie} from "../../../service/util/cookies.js";
let token = getCookie('token'); 
export default{
	beforeRouteEnter(to,from,next){
		if(token){
			next();
		}else{
			next("/logn");
		}
	},
	data(){
		return{
			data:[]
		}
	},
	beforeCreate(){ 
		this.$http.post('http://localhost:3000/address',{'token':token}).then((val)=>{ 
			console.log(val);
			this.data = val.mes; 
		})
	},
	methods:{
		del(val){
			let {id} = val; 
			this.$http.post('http://localhost:3000/addressdel',{'token':token,id:id}).then((val)=>{
				if(val.code == 1){
					this.$http.post('http://localhost:3000/address',{'token':token}).then((val)=>{ 
						this.data = val.mes; 
					})
				} 
			})
		},
		chgdefault(val){ 
			let {id} = val;
			if(val.isDefault){
				this.$http.post('http://localhost:3000/addressdefault',{'token':token,id:id}).then((val)=>{
					if(val.code == 1){
						this.$http.post('http://localhost:3000/address',{'token':token}).then((val)=>{ 
							this.data = val.mes; 
						})
					} 
				})
			}
		},
		edit(val){
			this.$router.push({path:"/increaseaddress",query:{type:"edit",obj:JSON.stringify(val)}});
			console.log();
		}
	}
}
</script>
<style scoped>
.box{
	width: 100%;
	height: 100%;
	background-color:#ccc;
}
header{
	width: 96%;
	padding: 0 2%;
	display:flex;
	justify-content:space-between;
	align-items:center;
	height: 1rem;
	background-color:#ffff;
} 
.list{
	width: 96%;
	margin-top: .2rem;
	padding: 0 2%;
	background-color:#fff;
}
.list div{
	height: .9rem;
	display:flex;
	align-items:center;
}
.chkbox{
	justify-content:space-between;
}
.adddress{
	position: fixed;
	bottom: 5%;
	left: 50%;
	transform:translateX(-50%);
	padding: .2rem;
	background-color:red;
	color:#fff;
	border-radius: 10%;
}
.adddress a{color: #fff;}
</style>