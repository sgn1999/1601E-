<template>
	<div class="listMainWrap">
		<Alert v-show="dynamic=='Alert'" :types="types" />
		<div class="top">
			<button @click="add">增加</button>
			<button @click="change">修改</button>
			<button @click="remove">离职</button>
		</div>
		<table width="100%" border="1" cellspacing="0" >
			<tr bgcolor="#F5F5F5">
				<td><input type="checkbox"></td>
				<td>姓名</td>
				<td>员工ID</td>
				<td>员工编号</td>
				<td>手机号</td>
				<td>邮箱</td>
				<td>归属中心</td>
				<td>权限</td>
				<td>上级组织</td>
				<td>创建时间</td>
			</tr>
			<tr bgcolor="#F5F5F5" v-for="val in newdata">
				<td><input type="checkbox" v-model="val.checked"></td>
				<td>{{val.name}}</td>
				<td>{{val.id}}</td>
				<td>{{val.number}}</td>
				<td>{{val.phoneNum}}</td>
				<td>{{val.email}}</td>
				<td>{{val.ascription}}</td>
				<td>{{val.jurisdiction}}</td>
				<td>{{val.superior}}</td>
				<td>{{val.time}}</td>
			</tr>
		</table>
		<div class="bottom">
			<select v-model="everypage">
				<option value="5">5</option>
				<option value="10">10</option>
			</select>
			<span>《</span>
			<span><input type="number" style="width:40px" v-model="pagenum"> / {{Math.ceil(this.backupsData.length/this.everypage)}}</span>
			<span>》</span>
			<span>每页{{this.everypage}}条</span>
			<span>共<b>{{this.backupsData.length}}</b>条</span>
		</div>
	</div>
</template>
<script>
import Alert from "../alert/alert.vue";
export default{
	data(){
		return {
			data:JSON.parse(sessionStorage.getItem("data")).employee,
			backupsData:JSON.parse(sessionStorage.getItem("data")).employee,
			everypage:5,
			pagenum:1,
			dynamic:"",
			types:"add"
		}
	},
	computed:{
		newdata(){
			let data = [...this.backupsData];
			let newData = data.splice((this.pagenum-1)*this.everypage,this.everypage);
			return newData;
		}
	},
	beforeCreate(){
		
	},
	created(){
		//console.log(this.data);
	},
	mounted(){
		this.Bus.$on("cancel",(val)=>{
			this.dynamic="";
		})
		this.Bus.$on("addScreening",(val)=>{
			let data = [...this.data];
			let obj = val;
			this.backupsData=data.filter((value,ind)=>{
				return (value.name == obj.name || obj.name=="")&&(value.number == obj.number || obj.number=="")&&(value.phoneNum == obj.phoneNum || obj.phoneNum=="")&&(value.email == obj.email || obj.email=="")&&(value.superior == obj.superior || obj.superior=="");
			})
		});
		this.Bus.$on("alertConfig",(val)=>{
			if(this.types=="add"){
				if(val.name!=""&&val.phoneNum!=""){
					this.backupsData=[...this.backupsData,val];
					this.data = [...this.data,val]
					this.dynamic="";
				}
			}else if(this.types=="change"){
				this.backupsData.some((value,ind)=>{
					if(value.id==val.id){
						this.backupsData.splice(ind,1,val);
						this.data.splice(ind,1,val);
						return true;
					}else{
						return false;
					}
				})
				console.log(this.backupsData);
				this.dynamic="";
			}
			
		})
	},
	methods:{
		add(){
			// let obj = newData
			this.dynamic="Alert";
			this.types="add";
		},
		change(){
			this.types="change";
			let data = this.newdata.filter((val,ind)=>{
				return val.checked;
			})
			if(data.length==1){
				this.Bus.$emit("alertConfigTwo",data[0]);
				this.dynamic="Alert";
			}
		},
		remove(){
			this.types="change";
			let index = null;
			let data = this.newdata.filter((val,ind)=>{
				if(val.checked){
					index = ind;
					return val.checked;
				}
				
				 
			})
			if(data.length==1){
				this.backupsData.splice(index,1);
				this.data.splice(index,1);
			}
		}
	},
	components:{
		Alert
	}
}
</script>
<style scoped>
.listMainWrap{
	width: 100%;
	padding: 2px;
	background-color: #F5F5F5;
	border: 1px solid #ccc; 
}
td{
	text-align: center;
}
.bottom{
	width:100%;
	padding: 5px;
	background-color:#EBEEF0;
	border: 1px solid #ccc;
}
.top{
	width: 100%;
	background-color: #E7EAEE;
	display: flex;
}
table{
	margin: 5px 0;
}
.top button{
	margin: 0 5px;
	border: 1px solid green;
	padding: 0 10px;
}
</style>