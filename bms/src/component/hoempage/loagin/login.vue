<template>
	<div class="loginWrap">
		<div class="top">
			<div v-bind:class="{bg:1==this.idtf}" @click="change(1)">二维码登陆</div><div v-bind:class="{bg:2==this.idtf}" @click="change(2)">账号登陆</div>
		</div> 
		<div>
			<div class="content" v-show='1==this.idtf'>
				<p>手机扫码 安全防盗</p>
				<img class="img" src="/dist/static/img/img1.png">
				<p>使用APP扫描二维码登陆</p>
			</div>
			<div class="contentTwo" v-show='2==this.idtf'> 
				<p>登陆账号</p>
				<input type="text" v-model="land"> 
				<div>
					<span @click="phone()" ref="phone">手机获取</span>
					<span @click="email()" ref="email">邮箱获取</span>
				</div>
				<p>动态密码</p>
				<input type="text" v-model="val">
				<br>
				<button @click="landing">登陆</button>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			idtf:1,
			land:"请输入手机号或者邮箱",
			time:30,
			str:"",
			times:null,
			val:"请输入验证码",
			data:null
		}
	},
	methods:{
		change(num,e){
			this.idtf = num;
		},
		phone(){
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			if (myreg.test(Number(this.land))){ 
				this.countdown("phone","手机获取");
				console.log("格式正确")
			}
		},
		email(){
			var myreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
			if (myreg.test(this.land)){  
				this.countdown("email","邮箱获取")
			}
		},
		countdown(str,str1){
			if(!this.times){
				this.axios.get("/getVerificationCode",{
					params:{
						phonenum:Number(this.land)
					}
				}).then((val)=>{
					this.data = val.data;
					console.log(val.data)
				})
				this.times = setInterval(()=>{
					this.str="倒计时"+this.time--; 
					this.$refs[str].innerHTML=this.str;
					if(this.time==0){
						this.time = 60;
						this.$refs[str].innerHTML=str1;
						clearInterval(this.times);
						this.times=null;
					}
					
				},1000) 
			}
			
		},
		landing(){
			if(this.data.radCode == this.val){
				console.log(this.$router.push("/platform"))
				console.log("登陆陈工");
			}else{
				console.log("登录失败")
			}
		}
	},
	beforeUpdate(){ 
		console.log(1);
	},
	beforeDestroy(){
		console.log(11111)
		clearInterval(this.times)
		this.times=null;
	}
}
</script>
<style scoped>
	.loginWrap{
		margin: 50px auto;
		width:200px;
		border-radius: 5%;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	p{
		margin: 10px 0;
	}
	.top{
		width: 100%;
		height: 30px;
	}
	.top div{
		width: 50%;
		height: 100%;
		line-height: 30px;
		text-align: center;
		display: inline-block;
		background-color: #ccc;
	}
	.bg{
		background-color: #fff!important;
	}
	.content{
		width: 100%;
		text-align: center;
	}
	.img{
		margin: 30px 0;
	}
	.contentTwo{
		width: 100%; 
		padding: 30px 0;
		text-align: center;
	}
	input{
		margin-bottom: 5px;
	}
</style>