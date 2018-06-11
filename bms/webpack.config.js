var path = require("path");
var htwlWebpackPlugin = require("html-webpack-plugin");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var copyWebpackPlugin = require("copy-webpack-plugin");
var cleanWebpackPlugin = require("clean-webpack-plugin");
var uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var data = require("./src/data/data.js");
var userList = require("./src/data/userList.json");
var code ; //在全局定义验证码  
//产生验证码  
function createCode(){  
    code = "";  
    var codeLength = 4;//验证码的长度   
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');//随机数  
    for(var i = 0; i < codeLength; i++) {//循环操作  
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
        code += random[index];//根据索引取得随机数加到code上  
    }  
}  

module.exports = {
	devtool:"eval-source-map",
	entry:{
		path:path.join(__dirname , "src" , "index.js"),
	},
	output:{
		path:path.join(__dirname,"dist"),
		filename:"main.js"
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:"babel-loader",
					query:{
						plugins:[
							'transform-runtime',
							"transform-object-rest-spread"
						],
						presets:["env","stage-0"]
					}
				},
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				use:[
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
				// use:extractTextWebpackPlugin.extract({
				// 	fallback:"style-loader",
				// 	use:""
				// }) 
			},
			{
				test:/\.vue$/,
				use:{
					loader:"vue-loader"
				}
			}
		]
	},
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		host:"localhost",
		port:8080,
		inline:true,
		before:function(app){
			app.get("/getVerificationCode",function(req,res,next){ 
				createCode() 
				res.send({radCode:code});
			}) 
			app.get("/data",function(req,res,next){ 
				res.send(data);
			})  
			app.get("/userList",function(req,res,next){
				res.send(userList);
			})	
		}
	},
	resolve:{
		//自动不全后缀。注意第一个必须是空资付串，后缀一定是点开头
		extensions:[" ",".js",".css",".json"],
		alias:{
			"vue":"vue/dist/vue.js"
		}
	},
	plugins:[
		new VueLoaderPlugin(),	
		new htwlWebpackPlugin({
			template:"./src/index.html",
			filename:"main.html",
			title:"主页",
			// minify:{
			// 	removeAttributeQuotes:true
			// }
		}),
		// new extractTextWebpackPlugin("style.css"),
		new copyWebpackPlugin([{
			from:"./src/static",
			to:"./dist/static"
		}]),
		// new cleanWebpackPlugin("./dist"),
		// new uglifyjsWebpackPlugin({
			// parallel: 4
		// })
	]
};