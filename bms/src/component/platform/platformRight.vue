<template>
	<div class="rightWrap">
		<div class="top">
			<template v-for="val in list">
				<span :class="{bg:val.component == comp}" @click="sorh(val)">
					{{val.title}}
				</span>
			</template>
		</div>
		<div class="context">
			<keep-alive>
				<component :is="comp"></component>
			</keep-alive>
		</div>
	</div>
</template>
<script>
import leftHome from "./main/leftHome.vue";
import administration from "./main/administration/administration.vue";
import employeeaccount from "./main/employeeaccount/employeeaccount.vue";
import menumanagement from "./main/menumanagement/menumanagement.vue";
export default{
	props:["data"],
	data(){
		return {
			list:[...this.data.rightListTop],
			comp:"menumanagement"
		}
	},
	components:{
		leftHome,
		administration,
		employeeaccount,
		menumanagement
	},
	methods:{
		sorh(obj){
			this.comp = obj.component;
		}
	},
	beforeMount(){
		this.Bus.$on("msg",(val)=>{
			let biaoshi = this.list.some((listval,ind)=>{
				return val.title==listval.title;
			})
			if(!biaoshi){
				this.list.push(val);
			}
		})
	}
}
</script>
<style scoped>
.rightWrap{
	flex:1;
	height: auto;
	border: 1px solid #8C8C8C;
	margin-left: 5px;
}
.top{
	width: 100%;
	background-color: #E7EAEE;
}
.top span{
	display: inline-block;
	background-color: #DDDEE1;
	color:#000;
	padding: 0 10px;
	margin-left: 3px;
}
.context{
	width: 100%;
}
.bg{
	background-color:#fff!important;
}
</style>