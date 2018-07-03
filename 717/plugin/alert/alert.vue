<template>
	<div name="fade">
		<div class="wrap">
			<div class='wrapschd' v-show="type">
				132123123
			</div>
			<div class='wrapschd' v-show="type">
				132123123
			</div>
			<div class='wrapschd' v-show="type">
				132123123
			</div>
		</div>
		
	</div>
</template>
<script>
export default{
	props:['types'],
	data(){
		return{
			 type:false,
			 time:null
		}
	}, 
	watch:{
		 types(n,o){ 
		 	this.type = true;
		 },
		 type(n,o){
		 	if(n&&!this.time){
				this.time = setTimeout(()=>{
					console.log(123);
					this.type = false;
					this.time = null;
				},2000);
		 	}
		 }
	},
	mounted(){ 

	}
}
</script>
<style scoped>
.wrap{ 
    position: fixed;
    left:50%;
    top:50%;
    transform: translate3d(-50%,-50%,0);
  
} 
.wrapschd{
	width: fit-content;
    height: fit-content;
	background-color: #000;
    color: #fff; 
    border-radius: 25%;
      padding: 1% 5%;
}
.fade-enter-active, .fade-leave-active {
 transition: opacity .5s
}
.fade-enter, .fade-leave-active {
 opacity: 0
}
</style>