import Vue from "vue";
import vueRouter from "vue-router";
import Main from "../component/main/main.vue";  
import Allcommodity from "../component/order/allcommodity.vue"; 
import Payment from "../component/order/payment.vue";
let Homepage = ()=>import('../component/home/homePage.vue');
let Classification = ()=>import("../component/class/Classification.vue");
let Shopcar = ()=>import("../component/shop/Shopcar.vue");
let My = ()=>import('../component/my/My.vue');
let Logn = ()=>import('../component/logn/logn.vue');
let Reg = ()=>import('../component/logn/reg.vue');
let Sfv = ()=>import('../component/sfv/sfv.vue'); 
let Detail = ()=>import('../component/detail/detail.vue'); 
let Order = ()=>import('../component/order/order.vue'); 
let Address = ()=>import('../component/address/address.vue'); 
let IncreaseAddress = ()=>import("../component/address/increaseAddress.vue");
Vue.use(vueRouter);
export default new vueRouter({
	routes:[
		{
			path:"/",
			redirect:"/main/homepage",
			
		},{
			path:"/main",
			component:Main,
			children:[
				{
					path:"/main/homepage", 
					component:Homepage
				},{
					path:"/main/classification",
					component:Classification
				},{
					path:"/main/shopcar",
					component:Shopcar
				},{
					path:"/main/my",
					component:My
				}
			]
		},{
			path:"/logn",
			component:Logn
		},{
			path:"/reg",
			component:Reg
		},
		{
			path:"/sfv",
			component:Sfv
		},{
			path:"/detail",
			component:Detail
		},{
			path:"/order",
			component:Order,
			children:[
				{
					path:"/order/allcommodity",
					component:Allcommodity
				},{
					path:"/order/payment",
					component:Payment
				}
			]
		},{
			path:'/address',
			component:Address
		},{
			path:'/increaseaddress',
			component:IncreaseAddress
		}
	]
})