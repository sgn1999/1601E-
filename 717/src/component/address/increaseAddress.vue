<template>
	<div class="wrap">
		<header>
			<div><router-link to="/address"><</router-link></div>
			<div>收货人</div>
			<div></div>
		</header>
		<div class="contant">
			<p><input type="text" placeholder="收货人姓名" v-model='name'></p>
			<p><input type="text" placeholder="手机号" v-model='phone'></p>
			<p><input type="text" placeholder="详细地址" v-model='address'></p> 
			<div><input type="checkbox" v-model='isDefault'>设置为默认地址</div>
			<div><button @click="subs">保存</button></div>
		</div>
	</div>
</template>
<script>
import {getCookie} from "../../../service/util/cookies.js";
let token = getCookie('token');
export default{
	data(){
		return {
			name:"",
			phone:"",
			address:"",
			isDefault:""
		}
	},
	created(){
		if(this.$route.query.type=="edit"){
			let obj = JSON.parse(this.$route.query.obj);
			this.name = obj.name;
			this.phone = obj.phone;
			this.address = obj.address;
			this.isDefault = obj.isDefault;
		}
	},
	methods:{
		subs(){ 
			let data = {
				name:this.name,
				phone:this.phone,
				address:this.address,
				isDefault:this.isDefault
			};
			this.$http.post('http://localhost:3000/setaddress',{'token':token,'newdata':data}).then((val)=>{ 
				if(val.code == 1){
					this.$router.push("/address")
				}
			});
		}
	}
}
</script>
<style scoped>
.wrap{
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
.contant{
	width: 96%;
	padding: 2%;
}
.contant p{
	width: 100%;
	background-color:#fff;
	height: .9rem;
	margin-bottom: .3rem;
}
.contant p input{
	width: 100%;
	height: 100%;
	border:none;
	outline:none;
	text-align: center;
}
button{
	width: 4.5rem;
	height: 1rem;
	background-color:red;
	text-align: center;
	line-height: .1rem;
	border-radius:.2rem;
	color:#fff;
	font-size: .4rem;
	border:none;
	outline:none;
}
.contant div{
	margin-bottom:.3rem;
}
</style>