<template>
	<div class="listMainWrap">
		<table width="100%" border="1" cellspacing="0" >
			<tr bgcolor="#F5F5F5">
				<td><input type="checkbox"></td>
				<td>id</td>
				<td>登陆用户名</td>
				<td>用户名称</td>
				<td>认证模式</td>
				<td>用户状态</td>
				<td>邮箱</td>
				<td>创建人</td>
			</tr>
			<template v-for="val in data">
				<tr bgcolor="#fff" :id="val.id">
					<td><input type="checkbox" v-model="val.checked"></td>
					<td>{{val.id}}</td>
					<td>{{val.username}}</td>
					<td>{{val.name}}</td>
					<td>{{val.pttern}}</td>
					<td>{{val.userstate}}</td>
					<td>{{val.email}}</td>
					<td>{{val.funder}}</td>
				</tr>
			</template>
		</table>
		<div class="bottom">
			<select v-model="everypage">
				<option value="5">5</option>
				<option value="10">10</option>
			</select>
			<span>《</span>
			<span><input type="number" style="width:40px" v-model="pagenum"> / {{Math.ceil(this.str.length/this.everypage)}}</span>
			<span>》</span>
			<span>每页{{this.everypage}}条</span>
			<span>共<b>{{this.str.length}}</b>条</span>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			str:JSON.parse(sessionStorage.getItem("data")).list,
			everypage:5,
			pagenum:1,
			strtwo:JSON.parse(sessionStorage.getItem("data")).list
		}
	},
	computed:{
		data(){
			let data = [...this.str]
			let ewdata = data.splice((this.pagenum-1)*this.everypage,this.everypage);
			return ewdata;
		}
	},
	beforeCreate(){
		//console.log(JSON.parse(sessionStorage.getItem("data")));
	},
	created(){
		//console.log(this.data);
	},
	mounted(){
		//console.log("mounted")
		this.Bus.$on("rem",()=>{
			let data = [...this.str];
			// data.map()
			let newdata = data.filter((val,ind)=>{
				return !val.checked
			})
			this.str = newdata;
			this.strtwo = newdata;
		})
		this.Bus.$on("screenName",(name)=>{
			let data = [...this.strtwo];
			let newdata = data.filter((val,ind)=>{
				return val.name.indexOf(name)!=-1;
			})
			this.str = newdata;
		})
		this.Bus.$on("screenStatus",(status)=>{
			let data = [...this.strtwo];
			let newdata = data.filter((val,ind)=>{
				return val.userstate==status || status=="全部";
			})
			this.str = newdata;
		})
		this.Bus.$on("add",(obj)=>{
			let data = [...this.str];
			obj.id=data.length;
			this.str = [...this.str,obj];
			this.strtwo = [...this.str];
		})
	}
}
</script>
<style scoped>
.listMainWrap{
	width: 100%;
	padding: 5px;
}
td{
	text-align: center;
}
.bottom{
	width:100%;
	padding: 3px;
	background-color:#EBEEF0;
	border: 1px solid #ccc;
}
</style>