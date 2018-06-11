<template>
	<div class="leftWrap">
		<div class="top">
			<img src="/dist/static/img/portrait.png">
			<ul>
				<li>你好，<b>user</b></li>
				<li>注销</li>
			</ul>
		</div>
		<Left :data="list" />
	</div>
</template>
<script>
import Left from "./leftlist/leftlist.vue";
export default{
	props:["data"],
	data(){
		return {
			list:[...this.data.leftList]
		}
	},
	components:{
		Left
	},
	created(){
		//console.log(this.data.leftList)
	}
}
</script>
<style scoped>
	.leftWrap{
		width: 180px;
		border: 1px solid #ccc;
		background-color: #F9FBFC;
	}
	.top{
		padding: 5px 0;
		display: flex;
	}
	img{
		margin-right: 5px;
	}
	.top li{
		margin-bottom: 3px;
	}
</style>