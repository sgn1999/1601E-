<template>
	<div class="box">
		<Hometop />
		<Homemain />
		<Homebottom />
	</div>
</template>
<script>
import Hometop from "./hometop.vue";
import Homemain from "./Homemain.vue";
import Homebottom from "./Homebottom.vue";
export default {
	data(){
		return {
			
		}
	},
	components:{
		Hometop,
		Homebottom,
		Homemain
	}
}
</script>
<style scoped>
	.box{
		width: 100%;
		height: 100%;
	}
</style>