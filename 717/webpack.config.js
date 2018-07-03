const path = require("path");
const webpack = require("webpack");
const htwlWebpackPlugin = require("html-webpack-plugin");
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const uesrData = require('./service/data/user.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
	devtool:"eval-source-map",
	entry:{
		path:path.join(__dirname , "src" , "index.js"),
	},
	output:{
		path:path.join(__dirname,"dist"),
		filename:"main.js",
		chunkFilename:'[name].main.js'
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
							"transform-object-rest-spread",
							'syntax-dynamic-import'
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
		// contentBase:path.join(__dirname, "dist"),
		host:"169.254.127.24",
		port:8888,
		inline:true,
		before:function(app){
			app.get("/userData",(req,res)=>{
				res.send(uesrData);
			})
		}
	},
	resolve:{
		extensions:[" ",".js",".css",".json"],
		alias:{
			"vue":"vue/dist/vue.js"
		}
	},
	plugins:[
		new VueLoaderPlugin(),	
		// new htwlWebpackPlugin({
		// 	template:"./src/index.html",
		// 	filename:"main",
		// 	title:"主页",
		// 	// minify:{
		// 	// 	removeAttributeQuotes:true
		// 	// }
		// }),
		// new extractTextWebpackPlugin("style.css"),
		new copyWebpackPlugin([{
			from:"./src/static",
			to:"./dist/static"
		}]),
		new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"development"'
	      }
   		})
		// new cleanWebpackPlugin("./dist"),
		// new uglifyjsWebpackPlugin({
			// parallel: 4
		// })
	]
}; 
if(process.env.NODE_ENV === "production"){ 
	module.exports.devtool = '#source-map';
	module.exports.plugins = [
		new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
		new uglifyjsWebpackPlugin()
	]
}