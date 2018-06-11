<template>
	<div class="alert">
			<div class="alertTop">
				<span v-show="types=='add'">新增员工</span>
				<span v-show="types=='change'">更改员工</span>
				<span @click="cancel">X</span>
			</div>
			<div class="alertMain">
				<div class="alertMainTop">
					基本信息
				</div>
				<table width="100%">
					<tr>
						<td>
							<span>员工姓名：</span>
							<input type="text" v-model="name">
						</td>
						<td>
							<span>邮箱：</span>
							<input type="text" v-model="email">
						</td>
					</tr>
					<tr>
						<td>
							<span>归属组织：</span>
							<input type="text" v-model="superior">
						</td>
					</tr>
					<tr>
						<td>
							<span>手机号码：</span>
							<input type="text" v-model="phoneNum">
						</td>
					</tr>
					<tr>
						<td><button @click="confirm">保存</button></td>
						<td><button @click="cancel">取消</button></td>
					</tr>
				</table>
			</div>
		</div>
</template>
<script>
export default{
	props:["types"],
	data(){
		return{
			id:"",
			name:"",
			checked:false,
			phoneNum:"",
			email:"",
			superior:"",
		}
	},
	beforeMount(){
		//console.log(this.props);
	},
	mounted(){
		this.Bus.$on("alertConfigTwo",(val)=>{
			this.id=val.id;
			this.name=val.name;
			this.phoneNum=val.phoneNum;
			this.email=val.email;
			this.superior=val.superior;
		})
	},
	methods:{
		confirm(){
			let obj={
				name:this.name,
				checked:this.checked,
				phoneNum:this.phoneNum,
				email:this.email,
				superior:this.superior,
				number:996,
				ascription:"IT共享中心",
				jurisdiction:"系统管理员",
				time:"2018-06-07",
				id:this.id
			}
			Object.entries(obj).forEach((val,ind)=>{
				this[val[0]]="";
			}) 
			this.Bus.$emit("alertConfig",obj)
		},
		cancel(){
			Object.entries(this.$data).forEach((val,ind)=>{
				this[val[0]]="";
			}) 
			this.Bus.$emit("cancel",{status:"cancel"})
		}
	}
}
</script>
<style scoped>
.alert{
	position: fixed;
	background-color:#fff;
	width: 600px;
	border: 1px solid #ccc;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
}
.alert tr{
	width: 100%;
	height: 30px;
}
.alert td{
	width: 50%;
	text-align: center;
}
.alertTop{
	width: 100%;
	padding: 5px;
	background-color: #E6E8E9;
	display:flex;
	justify-content:space-between;
}
.alertMainTop{
	width: 60px;
	text-align: center;
	border: 1px solid #ccc;
	margin-left: 3px;
	padding: 3px;
	border-bottom: none;
	position: relative;
	background-color:#fff;
	z-index:100;
}
.alert table{
	width: 100%;
	border: 1px solid #ccc;
	position: relative;
	margin-top: -1px;
}
</style>