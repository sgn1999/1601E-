<template>
	<div class="box">
		<div class='head'>
			<span @click="goout">< 返回</span>  
			<span>商品</span>
			<span>详情</span>
			<span>✉</span>
		</div>
		<div class='main'>
			 <img :src="data.imageurl">
			 <p class="bg">{{data.wname}}</p>
			 <div class="bg">
			 	<div class="allPrice">
					<span><b class="red">￥{{data.jdPrice}}</b><s>00</s></span>
					<span>(运费：￥00)</span>
				</div>
			 </div>
		</div>
		<div class="bottom"> 
			<div class="bottomLeft">
				<span>🚗</span>
				<span>
					<router-link to="/main/shopcar">
						购物车
					</router-link>
				</span>
			</div>
			<div>
				<button @click="addshop">加入购物车</button>
			</div>
		</div>
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
			data:this.$route.query.data
		}
	},
	methods:{
		goout(){
			this.$router.go(-1);
		},
		addshop(){ 
			this.$http.post("http://localhost:3000/addshop",{'token':getCookie("token"),'data':this.data}).then(res=>{
				console.log(res);
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
	position: relative;
	background-color:#fafafb;
} 
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
}
span{
	color:#464646;
}   
.listRight ul li span{
	display:inline-block;
	height: .6rem;
	width: .6rem;
	border: .01rem solid #ccc;
	text-align: center;
	line-height: .6rem;
}
.bottom{
	width: 100%;
	height: .97rem;
	background-color:#fff;
	display:flex;
	justify-content:space-around;
	align-items:center;
}
.bottomLeft{
	display:flex;
	flex-direction:column;
	margin-right: .3rem;
	align-items:center
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
.allPrice{
	display:flex;
	flex-direction:column;
	margin-right: .3rem;
}
.bg{
	background-color:#fff;
}
.red{
	color:red;
	font-size: .4rem;
	margin-right: .1rem;
}
img{
	width: 100%;
}
</style>