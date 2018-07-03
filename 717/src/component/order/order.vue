<template>
	<div class="box">
		<header>
			<div><router-link to="/main/my"><</router-link></div>
			<div>我的订单</div>
			<div>✉</div>
		</header>
		<ul class='list'>
			<li><router-link to='/order/allcommodity'>全部</router-link></li>
			<li><router-link to='/order/payment'>待付款</router-link></li>
			<li><router-link to='/order/allcommodity'>待发货</router-link></li>
			<li><router-link to='/order/allcommodity'>待收货</router-link></li>
			<li><router-link to='/order/allcommodity'>售后</router-link></li>
		</ul>
		<router-view></router-view>
	</div>
</template>
<script>
export default{
	data(){
		return{

		}
	}
}
</script>
<style scoped>
.box{
	width: 100%;
	height: 100%;
}
header{
	width: 96%;
	padding: 0 2%;
	display:flex;
	justify-content:space-between;
	align-items:center;
	height: 1.25rem;
	background-color:#fafafb;
}
.list{
	width: 100%;
	height:.9rem;
	display:flex;
	border-bottom: .01rem solid #CCC;
	border-top: .01rem solid #CCC;
}
.list li{
	width: 20%;
	text-align: center;
	line-height: .9rem;
}
</style>