<template>
	<div class="leftWrap">
		<div class="leftTop">
			<b>菜单管理</b>
			<b>《</b>
		</div>
		<div class="list">
			<p @click="clk($event)">应用菜单树</p>
			<div v-show="false" v-for="value in data">
				<p @click="clk($event)">{{value.father}}</p>
				<div v-show="false">
					<p v-for="valueTwo in value.children" @click="fn(valueTwo)">{{valueTwo.title}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			twomenu:"",
			threemenu:"",
			data:JSON.parse(sessionStorage.getItem("data")).leftList,
		}
	},
	components:{

	},
	methods:{
		clk($event){
			let show = $event.target.nextElementSibling.style.display;
			if(show=="none"){
				event.target.nextElementSibling.style.display="block";
			}else{
				event.target.nextElementSibling.style.display="none";
			}
		},
		fn(obj){
			this.Bus.$emit("menuData",obj);
		}
	},
	mounted(){	
		this.Bus.$on("listData",(obj)=>{
			console.log(obj);
			let data = [...this.data];
			data[0].children.some((val,ind)=>{
				if(val.id == obj.id){
					data[0].children[ind] = obj;
					return true;
				}else{
					return false;
				}
			})
			this.data = data;
		})
	}
}
</script>
<style scoped>
.leftWrap{
	width: 200px;
	height: auto;
	border: 1px solid #ccc;
	margin-right: 5px;
	background-color:#FAFAFA;
}
.leftTop{
	background-color: #E7EAEF;
	display: flex;
	justify-content:space-between;
	padding: 0 3px;
}
.leftTop b{
	font-weight: bold;
}
.list{
	width: 100%;
	padding: 5px 0;
}
.list div{
	padding-left: 5px;
	margin-top: 5px;
}
</style>