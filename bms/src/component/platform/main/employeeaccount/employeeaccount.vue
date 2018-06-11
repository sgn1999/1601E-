<template>
	<div class="employeeWrap">
		<div class="top">
			<div>
				<span>用户姓名:</span>
				<input type="text" v-model="name">
			</div>
			<div>
				<span>用户手机号:</span>
				<input type="text" v-model="phoneNum">
			</div>
			<div>
				<span>用户邮箱:</span>
				<input type="text" v-model="email">
			</div>
			<div>
				<span>员工编号:</span>
				<input type="text" v-model="number">
			</div>
			<div class="father">
				<span>归属组织:</span>
				<input type="text" v-model="superior" @click="showorhidden=true">
				<div class="children" v-show="showorhidden" @mouseleave="showorhidden=false">
					<div class="chdTop">
						<div>
							<span>组织名称</span>
							<input type="text" v-model="childoznam">
						</div>
						<button @click="screeningTissue">🔎 查询</button>
					</div>
					<table width="100%" border="1px" cellspacing="0" >
						<tr>
							<td>序号</td>
							<td>组织名称</td>
							<td>上级组织</td>
						</tr>
						<tr v-for="val in backupsData" @click="selectedOrg(val)">
							<td>{{val.id+1}}</td>
							<td>{{val.organization}}</td>
							<td>{{val.superior}}</td>
						</tr>
					</table>
				</div>
			</div>
			<div>
				<button @click="submissioScreening">查询</button>
			</div>
		</div>
		<list/>
	</div>
</template>
<script>
import list from "./list.vue";
export default{
	data(){
		return {
			data:JSON.parse(sessionStorage.getItem("data")).name,
			backupsData:JSON.parse(sessionStorage.getItem("data")).name,
			showorhidden:false,
			childoznam:"",
			superior:"",
			name:"",
			phoneNum:"",
			email:"",
			number:""
		}
	},
	components:{
		list
	},
	methods:{
		selectedOrg(obj){
			this.superior = obj.superior;
		},
		screeningTissue(){
			let newData = [...this.data];
			this.backupsData=newData.filter((val,ind)=>{
				// console.log(this.childoznam == this.childoznam)
				return val.organization == this.childoznam || this.childoznam=="";
			})
		},
		submissioScreening(){
			let newData = [...this.data];
			let obj = {
				name:this.name,
				number:this.number,
				phoneNum:this.phoneNum,
				email:this.email,
				superior:this.superior,
			};
			this.Bus.$emit("addScreening",obj);
		}
	}
}
</script>
<style scoped>
.employeeWrap{
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
.father{
	position: relative;
}
.children{
	width: 300px;
	height: 200px;
	overflow-y: scroll;
	border: 1px solid #878A8D;
	background-color:#fff;
	position: absolute;
	top: 34x;
	right:0px;
}
.chdTop{
	width: 100%;
	padding: 20px;
	display:flex;
	justify-content:space-around;
	background-color:#F5F5F6;
	border-bottom: solid #878A8D 1px;
}
td{
	text-align: center;
}
</style>