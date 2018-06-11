<template>
	<div class="rightWrap">
		<div class="title">
			菜单信息
		</div>
		<div class="content">
			<table width="100%">
				<tr>
					<td>
						<span>菜单名称</span>:<input type="text" v-model="title">	
					</td>
					<td>
						<span>菜单代码</span>:<input type="text" v-model="component">	
					</td>
				</tr><tr>
					<td>
						<span>菜单显示名称</span>:<input type="text" v-model="showtitle">	
					</td>
					<td>
						<span>菜单显示顺序</span>:<input type="text" v-model="order">	
					</td>
				</tr><tr>
					<td>
						<span>管理机构树</span>:<input type="text">	
					</td>
					<td>
						<span>是否为子菜单</span>:<input type="text" v-model="childMenu">	
					</td>
				</tr>
				<tr>
					<td>
						<button @click="submission">保存</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			childMenu:"",
			order:"",
			showtitle:"",
			title:"",
			component:"",
			id:""
		}
	},
	methods:{
		submission(){
			this.Bus.$emit("listData",Object.assign({},this.$data));
		}
	},
	mounted(){
		console.log({...{a:1}});
		this.Bus.$on("menuData",(val)=>{
			// this.$data = ;
			for(let value in val){
				this.$data[value] = val[value];
			}
		})
	}
}
</script>
<style scoped>
.rightWrap{
	width: 940px;
}
.title{
	width:60px;
	padding: 3px;
	border: 1px solid #ccc;
	text-align: center;
	margin-left: 3px;
	border-bottom: none;
	background-color: #fff;
	position: relative;
	z-index:10000;
}
.content{
	width: 100%;
	border: 1px solid #ccc;
	position: relative;
	margin-top: -1px;
}
tr{
	width: 100%;
}
td{
	width: 50%;
	text-align: center;
	padding: 5px;
}
</style>