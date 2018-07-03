<template>
	<div class="box">
		<div class='head'>
			<span></span>
			<div>
				<input type="text" placeholder="输入你要卖的商品" @click="gosfv" />
			</div> 
			<div>
				<span>✉</span>
			</div>
		</div>
		<div class='main'>
			<div class="left"> 
				<div @click="getData($event)" data-id="17951827" :class="{bg:code==17951827}">
					热门分类
				</div>
				<div @click="getData($event)" data-id="17951828" :class="{bg:code==17951828}">
					手机数码
				</div>
				<div @click="getData($event)" data-id="17951829" :class="{bg:code==17951829}">
					电脑办公
				</div>
				<div @click="getData($event)" data-id="17951830" :class="{bg:code==17951830}">
					电视影音
				</div>
				<div @click="getData($event)" data-id="17951831" :class="{bg:code==17951831}">
					空调冰洗
				</div>
				<div @click="getData($event)" data-id="17951832" :class="{bg:code==17951832}">
					厨房卫浴
				</div>
				<div @click="getData($event)" data-id="17951833" :class="{bg:code==17951833}">
					生活电器
				</div>
				<div @click="getData($event)" data-id="17951834" :class="{bg:code==17951834}">
					食品酒水
				</div>
				<div @click="getData($event)" data-id="17951835" :class="{bg:code==17951835}">
					美妆个护
				</div>
				<div @click="getData($event)" data-id="17951836" :class="{bg:code==17951836}">
					母婴玩具
				</div>
				<div @click="getData($event)" data-id="17951837" :class="{bg:code==17951837}">
					医疗保健
				</div>
				<div @click="getData($event)" data-id="17951838" :class="{bg:code==17951838}">
					服饰鞋帽
				</div>
				<div @click="getData($event)" data-id="17951839" :class="{bg:code==17951839}">
					运动户外
				</div>
				<div @click="getData($event)" data-id="17951840" :class="{bg:code==17951840}">
					箱包奢品
				</div>
				<div @click="getData($event)" data-id="17951841" :class="{bg:code==17951841}">
					钟表首饰
				</div>
				<div @click="getData($event)" data-id="17951842" :class="{bg:code==17951842}">
					住宅家具
				</div>
				<div @click="getData($event)" data-id="17951843" :class="{bg:code==17951843}">
					家装建材
				</div>
				<div @click="getData($event)" data-id="17951844" :class="{bg:code==17951844}">
					家居日用
				</div>
				<div @click="getData($event)" data-id="17951845" :class="{bg:code==17951845}">
					床品家纺
				</div>
				<div @click="getData($event)" data-id="17951846" :class="{bg:code==17951846}">
					汽车用品
				</div>
				<div @click="getData($event)" data-id="17951847" :class="{bg:code==17951847}">
					黄金收藏
				</div>
				<div @click="getData($event)" data-id="17951849" :class="{bg:code==17951849}">
					智能家居
				</div>
				<div @click="getData($event)" data-id="17951850" :class="{bg:code==17951850}">
					金融理财
				</div>
				<div @click="getData($event)" data-id="17951851" :class="{bg:code==17951851}">
					生活服务
				</div>
			</div>
			<div class="right">
				<div v-for="item in data" class="rightList">
					<p>{{item.goodsTypeName}}</p>
					<div class="rightListWrap">
						<div v-for="chditem in item.goodsTypeList" class="every">
							<img :src="chditem.goodsTypeImgUrl" />
							<span>{{chditem.goodsTypeName}}</span>
						</div> 
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions,mapState } from "vuex";
export default{
	data(){
		return {
			data:[],
			code:undefined
		}
	},
	created(){ 
		this.code = 17951827;
		if(this.clfListData[this.code]){
			this.data =  this.clfListData[this.code];
		}else{
			this.actGetClfListData(this.code);
		}
		
	},
	computed:{
		...mapState(['clfListData'])
	},
	watch:{
		clfListData(){
			this.data = this.clfListData[this.code];
		}
	},
	methods:{
		gosfv(){
			this.$router.push("/sfv")
		},
		getData(e){
			let id = e.target.getAttribute("data-id");
			this.code = id;
			if(this.clfListData[this.code]){
				this.data = this.clfListData[this.code];
			}else{
				this.actGetClfListData(id) 
			}
			
		},
		...mapActions(['actGetClfListData'])
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
	width: 5.6rem;
	outline: none;
	background-color: #f6f6f6;
	border: none;
	height: .55rem;
	border-radius: .1rem; 
	color:#999999;
	text-align: center;
}
.main{
	width: 100%;
	flex: 1;
	overflow-y: scroll;
	display:flex;
} 
.left{
	height:100%;
	width:2.2rem;
	overflow-y:scroll;
	
}
.right{
	width:5.2rem;
	height: 100%;
	overflow-y:scroll;	
}
span{
	color:#464646;
}
.left div{
	width: 100%;
	height:.8rem;
	text-align: center;
	line-height: .7rem;
	background-color:#eeeeee;
	color:#000;
	font-weight: bold;
}
.rightList{
	width: 100%;
}
.rightListWrap{
	display:flex;
	justify-content:space-around;
	flex-wrap:wrap; 
}
.every{
	width: 30%;
	height: 2.6rem;
	text-align: center;
	background-color:#f7f7f7;
	margin-bottom: .1rem;
}
.every img{
	width: 100%;
	margin-bottom: .1rem;
}
.rightList p{
	margin: .1rem;
	color:#ccc;
}
.bg{
	background-color:#fff!important;
	border-left: solid .05rem red;
	width:2.15rem!important;
	color:red!important;
}
</style>