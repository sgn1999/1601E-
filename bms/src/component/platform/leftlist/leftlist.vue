<template>
	<div class="leftList">
		<template v-for="val in newdata">
			<div class="every">
				<div class="shdTop" @click="sndChange">
					<span>{{val.father}}</span>
				</div>
				<div v-show="shd" class="children">
					<template v-for="valone in val.children">
						<p :class="{bg:title==valone.title}" @click="add(valone)">{{valone.title}}</p>
					</template>
				</div>
			</div>
		</template>
		
	</div>
</template>
<script>
export default{
	props:["data"],
	data(){
		return {
			shd:false,
			newdata:[...this.data],
			title:""
		}
	},
	methods:{
		sndChange(){
			this.shd = !this.shd;
		},
		add(obj){
			this.title = obj.title;
			this.Bus.$emit("msg",obj)
		}
	},
	created(){
		
		//console.log(this.data)
	},
	mounted(){
		this.Bus.$on("listData",(obj)=>{
			console.log(obj);
			let data = [...this.newdata];
			data[0].children.some((val,ind)=>{
				if(val.id == obj.id){
					data[0].children[ind] = obj;
					return true;
				}else{
					return false;
				}
			})
			this.newdata = data;
		})
	}
}
</script>
<style scoped>
.leftList{
	width: 100%;
}
.every{
	width: 100%;
}
.shdTop,.children{
	width: 100%;
}
.shdTop span{
	display: block;
	font-size: 15px;
	padding: 10px;
	text-align: center;
	background-color: #F0F0F0;
	border: 1px solid #fff;
}
.children p{
	display: block;
	font-size: 12px;
	padding: 5px;
	text-align: center;
	background-color: #fff;
	border-top: 1px dashed #000;
}
.bg{
	color:blue!important;
}
</style>