<template>
	<div class="listWrap">
		<div class="top">
			<button @click="showhide = !showhide">增加</button>
			<button>编辑</button>
			<button @click="rem">删除</button>
		</div>
		<div v-show="showhide" class="addAlert">
			<p>登陆用户名：<input type="text" v-model="username"></p>
			<p>用户名称：<input type="text" v-model="name"></p>
			<p>email:<input type="text" v-model="email"></p>
			<button @click="confirm">确认</button>
		</div>
		<List />
	</div>
</template>
<script>
import List from "./listMain.vue";
export default{
	data(){
		return {
			showhide:false,
			username:"",
			name:"",
			email:""
		}
	},
	components:{
		List
	},
	methods:{
		rem(){
			this.Bus.$emit("rem")
			console.log("rem")
		},
		confirm(){
			this.showhide = !this.showhide;
			let obj = {
				username:this.username,
				name:this.name,
				email:this.email
			};
			this.Bus.$emit("add",obj)
		}
	}
}
</script>
<style scoped>
	.listWrap{
		width: 100%;
		background-color: #F5F5F5;
		border: 1px solid #ccc; 
	}
	.top{
		width: 100%;
		background-color: #E7EAEE;
		display: flex;
	}
	.top button{
		margin: 0 5px;
		border: 1px solid green;
		padding: 0 10px;
	}
	.addAlert{
		width: 100%;
		padding: 5px;
		background-color:"#fff";
	}
</style>