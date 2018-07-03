<template>
	<div class="list"> 
		<input type="checkbox" v-model="chk" />
		<img :src="data.imageurl" />
		<div class="listRight">
			<p class="text">{{data.wname}}</p>
			<ul>
				<li><b>${{data.jdPrice}}</b></li>
				<li> 
					<span @click="jian({'wareId':data.wareId})">-</span><input type="number" v-model="data.similarEnter"><span @click="add({'wareId':data.wareId})">+</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getCookie} from "../../../service/util/cookies.js";
import {mapActions} from "vuex";
export default{
	props:{
		data:{
			required:true
		}
	},
	data(){
		return{
			chk:false
		}
	},
	watch:{
		chk(n,o){
			///console.log(12312321)
			let obj = {
				chk:n,
				data:this.data
			}
			this.Bus.$emit('getChk',obj); 
		}
	},
	methods:{
		add(data){
			let obj = {
				chk:this.chk,
				data:this.data
			}
			this.Bus.$emit('getChk',obj); 
			this.$store.dispatch('actAddList',data);
		},
		jian(data){
			let obj = {
				chk:this.chk,
				data:this.data
			}
			this.Bus.$emit('getChk',obj); 
			this.$store.dispatch('actJianList',data);
		} 
	},
	mounted(){
		this.Bus.$on('allchks',(data)=>{ 
			//console.log(data);
			this.chk = data.chk;
		})
	}
}
</script>
<style scoped>
.list{
	width: 100%;
	height:2.65rem;
	display:flex;
	margin-bottom:.2rem;
	background-color:#fff;
	align-items:center;
	justify-content:space-around;
}
.list img{
	width: 2rem;
}
.listRight{
	width: 4.2rem;
	height: 2rem;
	display:flex;
	flex-direction:column;
	justify-content:space-around;
}
.listRight input {
	width: 1rem;
	height: .6rem;
	outline: none;
	border: .01rem solid #ccc;
	text-align: center;
}
.listRight ul{
	display:flex;
}
.listRight ul{
	justify-content:space-between;	 
}
.listRight ul li b{
	color:red;
}
.listRight ul li span{
	display:inline-block;
	height: .6rem;
	width: .6rem;
	border: .01rem solid #ccc;
	text-align: center;
	line-height: .6rem;
}
.text{
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>