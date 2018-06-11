<template>
	<div class="wrap">
		<div class="top">
			<span>北京电信通企业平台</span>
		</div>
		<div class="bottom">
			<Left :data="data" />
			<Right :data="data" />
		</div>
	</div>
</template>
<script>
import Left from "./platformLeft.vue";
import Right from "./platformRight.vue";
export default{	
	data(){
		return{
			data:JSON.parse(sessionStorage.getItem("data"))
		}
	},
	components:{
		Left,
		Right
	},
	beforeCreate(){
		//console.log(this.data);
	},
	beforeMount(){
		//console.log(this.data)
	}
}
</script>
<style scoped>
	.wrap{
		width: 100%;
		height: 100%;
	}
	.top{
		width: 100%;
		background-color: blue;
		padding: 10px;
		margin-bottom: 5px;
	}
	.top span{
		color: #fff;
		font-size:15px;
	}
	.bottom{
		width: 100%;
		display: flex;
	}
</style>