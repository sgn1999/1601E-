<template>
	<div class="homemain">
		<Login />
	</div>
</template>
<script>
import Login from "./loagin/login.vue";
export default{
	data(){
		return{

		}
	},
	components:{
		Login
	}
}
</script>
<style scoped>
	.homemain{
		width: 100%;
		height: 520px;
		padding: 10px;
		font-size: 20px; 
	}
</style>