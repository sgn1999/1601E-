<template>
	<div class="listWrap">
		<div class="top">
			<div>
				<span>用户名称</span>
				<input type="text" v-model="name" @blur="screenName()">
			</div>
			<div>
				<span>用户状态</span>
				<select  v-model="status" @change="screenStatus()">
					<option value="全部">全部</option>
					<option value="正常">正常</option>
					<option value="不正常">不正常</option>
				</select> 
			</div>
		</div>
		<Lists />
	</div>
</template>
<script>
import Lists from "./arlist.vue";
export default{
	data(){
		return{
			name:"",
			status:""
		}
	},
	components:{
		Lists
	},
	methods:{
		screenName(){
			this.Bus.$emit("screenName",this.name)
		},
		screenStatus(){
			this.Bus.$emit("screenStatus",this.status)
			// console.log(this.status);
		}
	}
}
</script>
<style scoped>
.listWrap{
	width: 100%;
	padding: 2px;
}
.top{
	width: 100%;
	background-color: #F5F5F5;
	border: 1px solid #ccc;
	padding: 20px;
	display: flex;
	justify-content:space-around;
	margin-bottom: 10px;
}
.top input{
	width: 80px;
}
</style>