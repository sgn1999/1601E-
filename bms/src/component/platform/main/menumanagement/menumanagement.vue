<template>
	<div class="menumanagementWrap">
		<left/>
		<right/>
	</div>
</template>
<script>
import left from "./menumanagementleft.vue";
import right from "./menumanagementright.vue";
export default{
	data(){
		return{

		}
	},
	components:{
		left,
		right
	}
}
</script>
<style scoped>
.menumanagementWrap{
	width: 100%;
	padding: 5px;
	display: flex;
}	
</style>