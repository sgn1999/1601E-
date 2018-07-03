<template>
	<div class="box">
		<div class="top">
			<span @click="goback"><</span>
			<span>登陆717</span>
			<span><router-link to="/reg">注册</router-link></span>
		</div>
		<div class="content">
			<div><span>😀</span><input type="text" placeholder="请输入用户名" v-model="username"></div>
			<div><span>🔒</span><input type="text" placeholder="请输入密码" v-model="password"></div>
		</div>
		<button @click="sub">立即登陆</button>
	</div>
</template>
<script>
import {getCookie,setCookie} from "../../../service/util/cookies.js";
export default{
	beforeRouteEnter(to,from,next){
		if(!getCookie("token")){
			next();
		}
	},
	data(){
		return {
			username:"",
			password:""
		}
	},
	methods:{
		goback(){
			this.$router.go(-1);
			console.log(123);
		},
		sub(){
			const reguser = /^[a-zA-Z0-9_-]{4,16}$/;
			const regpass = /^(\w){6,20}$/;
			if(!this.username || !this.password){
				alert("请输入");
				return;
			}
			if(!reguser.test(this.username)){
				alert("请输入正确的用户名");
				return;
			}
			if(!regpass.test(this.password)){
				alert("请输入正确的密码");
				return;
			}
			this.$http.post("http://localhost:3000/logn",{username:this.username,password:this.password}).then(res=>{
				console.log(res);
				if(res.code == 1){
					setCookie('token',res.token,"1h")
					alert(res.mes);
					this.$router.push("/main/homepage")
				}else{
					alert(res.mes);
				}
			})
		}
	}
}
</script>
<style scoped>
.box{
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	background-color:#f4f4f4;
}
.top{
	width: 100%;
	height: .97rem;
	display: flex;
	border-bottom: .01rem solid #ccc;
	align-items:center;
	justify-content: space-around; 
}
.top div{
	display: flex;
	flex-direction: column;
	align-items:center;
}
.content{
	width: 100%;
}
.content div{
	width: 100%;
	background-color: #ffffff;
	padding: .2rem 0;
	border-bottom:.01rem solid #ccc;
}
.content input{
	border:none;
	outline: none;
}
.content span{
	margin: 0 .1rem;	
}
</style>