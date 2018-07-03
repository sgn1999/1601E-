<template>
	<div class="box">
		<div class='head'>
			<span class="fontColor">717</span>
			<input type="text" value="请输入您要购买的商品" @click="gosfv" />
			<div>
				<span>🏚</span>
			</div>
			<div>
				<span>✉</span> 
			</div>
		</div>
		<div class='main' ref='main' @scroll="scrollFn($event)">
			<div class="swiper-container" ref="swiper">
			  <div class="swiper-wrapper">
			    <div class="swiper-slide"><img src="/dist/static/img/banner/beauty.png"></div>
			    <div class="swiper-slide"><img src="/dist/static/img/banner/food.png"></div>
			    <div class="swiper-slide"><img src="/dist/static/img/banner/shoppingmall.png"></div>
			    <div class="swiper-slide"><img src="/dist/static/img/banner/taste.png"></div>
			  </div>
			</div>
			<div class="lists" ref='list'> 
				<List v-for="item in data" :data='item' /> 
			</div>
			<div class="load" ref='load'>
				{{this.explain}} <b>※</b>
			</div>
		</div>
	</div>
</template>
<script>
import jsonp from "../../../service/jsonp.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import List from "../list/list.vue";
export default{
	data(){
		return{
			data:[],
			whetherData:true,
			i:1,
			explain:"正在加载"
		}
	},
	beforeCreate(){ 
		this.$http.get("http://169.254.127.24:3000/list?page=1").then(res=>{ 
			this.data=res;
			this.i = this.i+1;
		})
		// jsonp("https://h5api.m.taobao.com/h5/mtop.taobao.wireless.guess.get/1.0/?jsv=2.4.11&appKey=12574478&t=1528794470300&sign=62a04e36f29b4f10d344246709704504&api=mtop.taobao.wireless.guess.get&v=1.0&type=jsonp&dataType=jsonp&callback=mtopjsonp3&data=%7B%22userId%22%3A%220%22%2C%22platformVersion%22%3A%2214%22%2C%22channel%22%3A%22homePage%22%2C%22fromLocation%22%3A%22unknown%22%2C%22extendMap%22%3A%22%7B%5C%22h5_platform%5C%22%3A%5C%22h5%5C%22%2C%5C%22h5_ttid%5C%22%3A%5C%2260000%40taobao_h5_1.0.0%5C%22%7D%22%7D","mtopjsonp3",res=>{console.log(res)});
	},
	mounted(){
		let mySwiper = new Swiper(this.$refs["swiper"],{
			autoplay:true,
			loop : true
		});
	},
	methods:{
		gosfv(){
			this.$router.push("/sfv")
		},
		scrollFn(e){ 
			let mainHeight = this.$refs.main.offsetHeight;
			let swiperHeight = this.$refs.swiper.offsetHeight;
			let listHeight = this.$refs.list.offsetHeight;
			let loadHeight = this.$refs.load.offsetHeight; 
			if((swiperHeight+loadHeight+listHeight - mainHeight) == e.target.scrollTop){ 
				if(this.whetherData){
					this.whetherData=false;
					if(this.i<=5){
						this.$http.get("http://169.254.127.24:3000/list?page="+this.i).then(res=>{
							this.data = [...this.data,...res];
							this.whetherData=true;
							this.i = this.i+1;
						},err=>{
							console.log(err);
						})
					}else{
						this.explain="我是有底线的  ";
					}
					
				}
				
			}
		}
	},
	components:{
		List
	}
}
</script>
<style scoped>
.box{
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
}
.head{
	width: 100%;
	height: .97rem;
	display: flex;
	border-bottom: .01rem solid #ccc;
	align-items:center;
	justify-content: space-around; 	
}
.head div{
	display: flex;
	flex-direction: column;
	align-items:center;
}
.head input{
	width: 3.8rem;
	height: .6rem;
	outline: none;
	background-color: #f5f5f5;
	border: none;
	border-radius: .1rem;
	text-align: center;
	color:#999999;
}
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
} 
.swiper-slide img{
	height: 3.5rem;
}
span{
	color:#464646;
}
.lists{
	width: 100%;
	display:flex;
	justify-content:space-between;
	flex-wrap:wrap;
}
.load{
	width: 100%;
	text-align: center;
	height: .9rem;
	line-height: .9rem;
}
</style>