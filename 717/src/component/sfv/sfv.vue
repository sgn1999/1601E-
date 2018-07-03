<template>
	<div class="box">
		<div class="top">
			<input type="text" placeholder="搜索你想要的商品" v-model='search' @input="inp">
			<span @click="no">取消</span>
		</div>
		<div class="content">
			<ul v-show="listValue" v-html="listValue"></ul>
			<div v-show="!listValue">
				<div class='title'>
					<span>最近搜索</span>
					<span>🗑</span>
				</div>
				<div class="list" v-show="recentsearch">
					<span v-for="item in recentsearch">{{item}}</span> 
				</div>
				<div class="list" v-show="!recentsearch">
					<span>
						什莫页没有
					</span>
				</div>
			</div>
			<div v-show="!listValue">
				<div class='title'>
					<span>热门搜索</span>
				</div>
				<div class="list">
					<span>大米</span>
					<span>巧克力</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			recentsearch: JSON.parse(sessionStorage.getItem('recentsearch')),
			search:undefined,
			listValue:undefined
		}
	},
	methods:{
		no(){ 
			let data = this.recentsearch || []; 
			if(this.search){
				data.push(this.search); 
				sessionStorage.setItem('recentsearch',JSON.stringify(data));
			}
			this.$router.go(-1);
		},
		inp(){ 
			this.$http.get("https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr="+this.search+"&dotime=1528960286000").then(res=>{ 
				this.listValue = res;
				if(this.search==""){
					this.listValue=undefined;
				}
			})
		}
	},
	mounted(){
		
	}
}
</script>
<style scoped>
.box{
	display: flex;
	flex-direction: column;
	width: 100%;
	height:100%;
	background-color:#fff;
}
.top{
	width: 100%;
	height: .97rem;
	display: flex;
	border-bottom: .01rem solid #999;
	align-items:center;
	justify-content: space-around; 
	border-bottom: .01rem solid #f6f6f6;
}
.top input{
	 width: 5.8rem;
	 height: .6rem;
	 background-color:#f6f6f6;
	 border:none;
	 outline:none;
	 text-align: center;
	 border-radius: .1rem;
}
.content{
	width: 94%;
	padding: 0 3%;
}
.title{
	display: flex;
	justify-content:space-between;
	margin: .2rem 0;
}
.list{
	display: flex; 
	flex-wrap:wrap;
}
.list span{
	height: .6rem;
	border: .01rem solid #999;
	text-align: center;
	line-height: .6rem;
	border-radius: .1rem;
	color:#999;
	border:.02rem solid #999999;
	margin-right: .2rem;
	padding: 0 .1rem;
}
span{
	color:#999;
}
.text{ 
	color:#999999
} 
</style>