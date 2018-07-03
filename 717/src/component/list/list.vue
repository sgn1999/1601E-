<template> 
		<div class="wrap">
			<router-link :to="{path:'/detail',query:{data:data}}">
				<img v-lazy="data.imageurl"/>
				<p>{{data.wname}}</p>
				<div class="buy"><span>￥{{data.jdPrice}}</span><span>🚗</span></div>
			</router-link>
		</div> 
</template>
<script>
export default{
	props:{
		data:{
			required:true
		}
	},
	data(){
		return{
			
		}
	}
}
</script>
<style scoped>
.wrap{
	width: 49%;
	margin-bottom: .4rem;
}
img{
	width: 100%;
}
span{
	color:red;
	font-size: .4rem;
}
p{
	padding-left: .1rem;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.buy{
	display:flex;
	justify-content:space-around;
}
</style>