<template>
	<div class="wrap">
		<div class='main'>
			<router-view></router-view>
		</div>
		<div class='foot'>
			<div>
				<span>🏚</span>
				<router-link to="/main/homePage">
					<span>首页</span>
				</router-link>	
			</div>
			<div>
				<span>❄</span>
				<router-link to="/main/classification">
					<span>分类</span>
				</router-link>	
			</div>
			<div>
				<span>🚴</span>
				<router-link to="/main/shopcar">
					<span>购物车</span>
				</router-link>	
			</div>
			<div>
				<span>❤</span>
				<router-link to="/main/my">
					<span>我的</span>
				</router-link>	
			</div>
		</div>
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
.wrap{
	width: 100%;
	height:100%;
	display: flex;
	flex-direction: column;
}
.main{
	width: 100%;
	flex: 1; 
	    overflow-y: scroll;
}
.foot{
	width: 100%;
	height: .97rem;
	display: flex;
	border-top: .01rem solid #ccc;
}
.foot div{
	display: flex;
	flex-direction: column;
	width: 25%;
	align-items:center;
	justify-content:space-around;
}
.fontColor{
	color:red;
	font-weight: bold;
}
span{
	color:#464646;
}
</style>