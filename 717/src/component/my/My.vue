<template>
	<div class="box">
		<div class='head'>
			<span class="fontColor" @click="signout">🎆</span>
			<div>
				<span>我的717商城</span>
			</div>
			<div>
				<span>✉</span>
			</div>
		</div>
		<div class='main'>
			<div class="headPortrai">
				<dd>
					<dt>
						<img :src="imgurl">
							<input type="file" @change="subImg($event)"/>
					</dt>
					<dl>
						<span>
							ning
						</span>
					</dl>
				</dd>
			</div>
			<div class="shop">
				<span>我的店铺</span>
				<span>》</span>
			</div>
			<div class="status">
				<dt>
					<dl>💳</dl>
					<dd>待付款</dd>
				</dt>
				<dt>
					<dl>📦</dl>
					<dd>待发货</dd>
				</dt>
				<dt>
					<dl>🉐</dl>
					<dd>待收货</dd>
				</dt>
				<dt>
					<dl>🛠</dl>
					<dd>售后</dd>
				</dt>
				<dt class="leftBorder">
					<dl>⚓</dl>
					<dd><router-link to="/order/allcommodity">我的订单</router-link></dd> 
				</dt>
			</div>
			<div class="list">
				<div>
					<span>账户余额</span>
					<span>></span>
				</div>
				<div>
					<span><router-link to='/address'>地址管理</router-link></span>
					<span>></span>
				</div>
				<div>
					<span>我的客服</span>
					<span>></span>
				</div>
			</div>
		</div>
		<Alert :types='bol' >哈哈哈哈</Alert>
	</div>
</template>
<script>
import {getCookie} from "../../../service/util/cookies.js";
export default{
	beforeRouteEnter(to,from,next){ 
		if(getCookie("token")){
			next();
		}else{
			next("/logn");
		}
	}
	,data(){
		return {
			bol:1,
			imgurl:"/dist/static/img/list/img1.png"
		}
	},
	methods:{
		signout(){ 
			this.bol++; 
		},
		subImg(e){
			let formData = new FormData();
			formData.append("imgFile",e.target.files[0]) 
			console.log(formData)
			this.$http.post("http://localhost:3000/upload",formData).then((val)=>{
				this.imgurl = val.src;
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
	background-color: #eeeeee;
}
.head{
	width: 100%;
	height: .97rem;
	display: flex;
	border-bottom: .01rem solid #ccc;
	align-items:center;
	justify-content: space-around; 	
	background-color: #fff;
}
.head div{
	display: flex;
	flex-direction: column;
	align-items:center;
}
.head input{
	width: 50%;
	outline: none;

}
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
}
.fontColor{
	color:red;
	font-weight: bold;
}
span{
	color:#494949;
}
.headPortrai{
	width:100%;
	height:2rem;
	background: red;
	display:flex;
	justify-content: center;
	align-items:center;
} 
.headPortrai span{
	color:#fff;
}
.shop{
	width: 96%;
	height: 1rem;
	padding: 0 2%;
	display: flex;
	justify-content:space-between;
	align-items:center;
	background-color: #fff;
}
.shop span{
	color: red;
	font-size: .3rem;
	font-weight: bold;
}
.status{
	width: 100%;
	display:flex;
	border-top: .01rem solid #ccc;
	background-color: #fff;
}
.status dt{
	width:20%;
	height:1.5rem;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	text-align: center;
}
.list{
	margin-top: .2rem;
	background-color: #fff;
}
.list div{
	width: 96%;
	padding: 2%;
	display: flex;
	justify-content: space-between;
	border-bottom: .01rem solid #ccc;
}
.leftBorder{
	border-left: .01rem solid #ccc;
}
img{
	width: 1rem;
	height: 1rem; 
    border-radius: 50%;
}
dl{
	text-align: center;
}
input{
	opacity: 0;
    position: absolute;
}
</style>