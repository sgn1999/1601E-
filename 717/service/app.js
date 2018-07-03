const fs = require("fs");
const path = require("path");
const getData = require("./gomebackstage/backstage.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const express  = require("express");
let upload = multer({ 
		storage:multer.diskStorage({
		    destination: function (req, file, cb) {
			    // 接收到文件后输出的保存路径（若不存在则需要创建）
			    cb(null, 'upload');    
			},
			filename: function (req, file, cb) {
			    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
			    cb(null, Date.now() + "-" + file.originalname);  
			}
		})
	});
module.exports = app=>{
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended:false}));
	app.use((req,res,next)=>{
		res.header({
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
		})
		next();
	})
	app.get("/list",(req,res,next)=>{  
		let str = fs.readFileSync(path.join(__dirname,"list","list"+req.query.page+".json"),'utf-8');
		res.json(str);
		next();
	})
	app.get("/classdata",(req,res,next)=>{ 
		getData(req.query.id).then(data=>{
			res.json(data);
			next();
		},err=>{
			res.json(err);
			next();
		})
	})
	app.post("/resmes",(req,res,next)=>{
		let userData =JSON.parse(fs.readFileSync(path.join(__dirname,"data","user.json"),'utf-8'));
		let data = req.body; 
		let flag = userData.some((val,ind)=>{
			return val.username == data.username;
		})
		if(flag){
			res.json({mes:"用户名重复",code:0});
			next();
		}else{
			data.userId=userData.length;
			userData.push(data);
			fs.writeFile(path.join(__dirname,"data","user.json"),JSON.stringify(userData),(err)=>{
				if(err){
					res.json({mes:err,code:0});
				}else{
					res.json({mes:"注册成功",code:1});
				}
				next();
			})
		}
	})
	app.post("/logn",(req,res,next)=>{
		let userData =JSON.parse(fs.readFileSync(path.join(__dirname,"data","user.json"),'utf-8'));
		let data = req.body;
		let flag = userData.some((val,ind)=>{
			return val.username == data.username && val.password == data.password;
		})
		if(flag){
			let token = jwt.sign(data,'ning')
			res.json({mes:"登陆成功",code:1,token:token});
			next();
		}else{
			res.json({mes:"登陆失败",code:0});
			next();
		}  
	})
	app.post("/shoplist",(req,res,next)=>{ 
		jwt.verify(req.body.token,"ning",(err,decoded)=>{ 
			if(err){
				res.josn({mes:err,code:0});
				next();
			}else{ 
				let data = JSON.parse(fs.readFileSync(path.join(__dirname,"shoplist","shoplist.json")));
				let shopdata = [];
				data.some((val,ind)=>{ 
					if(val[decoded.username]){
						shopdata = val[decoded.username]
						return true;
					}else{
						return false;
					}
				}) 
				res.json({'mes':'成功','code':0,'shopdata':shopdata})
				next();
			} 
		}) 
	})
	app.post("/addshop",(req,res,next)=>{
		jwt.verify(req.body.token,"ning",(err,decoded)=>{
			if(err){
				res.josn({mes:err,code:0});
				next();
			}else{
				let data = JSON.parse(fs.readFileSync(path.join(__dirname,"shoplist","shoplist.json")));
				let shopdata = req.body.data; 
				let flag = data.some((val,ind)=>{
					if(val[decoded.username]){
						let flag = val[decoded.username].some((val,ind)=>{
							if(val.wareId==shopdata.wareId){
								val.similarEnter++;
							}
							return val.wareId==shopdata.wareId;
						})
						if(!flag){
							val[decoded.username].push(shopdata);
						}
						return true;
					}else{
						return false;
					}
				})
				if(!flag){
					let obj = {};
					obj[decoded.username] = [shopdata]
					data.push(obj);
				}
				fs.writeFile(path.join(__dirname,"shoplist","shoplist.json"),JSON.stringify(data),(err)=>{
					if(err){
						res.json({mes:err,code:0});
					}else{
						res.json({mes:"成功",code:1});
					}
					next();
				})
			}
		})
	})
	app.get("/shopchange",(req,res,next)=>{
		let {wareId,type,token}=req.query;
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"shoplist","shoplist.json")));
		jwt.verify(token,"ning",(err,decoded)=>{
			if(err){
				res.json({mes:"token解密失败",code:0})
				next();
			}else{ 	
				data.some((val,ind)=>{
					if(val[decoded.username]){
						return val[decoded.username].some((value,index)=>{
							if(value.wareId == wareId){
								if(type=="add"){
									value.similarEnter++;
								}else{ 
									value.similarEnter--;
									if(value.similarEnter<=0){
										value.similarEnter=0;
									}
								}
								return true;
							}else{
								return false;
							}
						})
					}else{
						return false;
					}
				})
			}
			fs.writeFile(path.join(__dirname,"shoplist","shoplist.json"),JSON.stringify(data),(err)=>{
				if(err){
					res.json({mes:err,code:0});
				}else{
					res.json({mes:"成功",code:1});
				}
				next();
			})
		}) 
	})
	app.get("/del",(req,res,next)=>{
		let {delarr,token}=req.query;
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"shoplist","shoplist.json"))); 
		jwt.verify(token,"ning",(err,decoded)=>{
			if(err){
				res.json({mes:"token解密失败",code:0})
				next();
			}else{ 
				let newData=[];	
				data.forEach((val,ind)=>{
					if(val[decoded.username]){
						val[decoded.username].forEach((value,index)=>{ 
							 if(delarr.indexOf(value.wareId) == -1){
						          newData.push(value);
						        }
						})
						val[decoded.username] = newData
					} 
				})
			}
			fs.writeFile(path.join(__dirname,"shoplist","shoplist.json"),JSON.stringify(data),(err)=>{
				if(err){
					res.json({mes:err,code:0});
				}else{
					res.json({mes:"成功",code:1});
				}
				next();
			})
			
		}) 
	})
	app.post("/address",(req,res,next)=>{
		let {token} = req.body; 
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"address","address.json"),'utf-8')); 
		jwt.verify(token,'ning',(err,decoded)=>{ 
			if(err){
				res.json({mes:[],code:0});
				next();
			}else{
				let flag = data.some((val,ind)=>{
					if(val[decoded.username]){
						let newData = null;
						newData = val[decoded.username];
						newData = newData.map((val,ind)=>{ 
							return {...val,...{id:ind}};
						}) 
						val[decoded.username] = newData;
						console.log(newData);
						return true;
					}else{
						return false;
					}
				})
				if(flag){ 
					fs.writeFile(path.join(__dirname,"address","address.json"),JSON.stringify(data),(err)=>{
						if(err){
							res.json({mes:err,code:0});
							next();
						}else{
							let flag =  data.some((val,ind)=>{
								if(val[decoded.username]){
									res.json({mes:val[decoded.username],code:1});
									return true;
								}else{
									return false;
								}
							})
							if(!flag){
								res.json({mes:[],code:1});
							} 
							next();
						}
					
					}) 
				}else{
					res.json({mes:[],code:0});
					next();
				}
			}
		}) 
	})
	app.post("/setaddress",(req,res,next)=>{
		let {token,newdata} = req.body; 
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"address","address.json"),'utf-8')); 
		console.log(data)
		jwt.verify(token,'ning',(err,decoded)=>{ 
			if(err){
				res.json({mes:[],code:0});
				next();
			}else{
				console.log(decoded)
				let flag = data.some((val,ind)=>{
					if(val[decoded.username]){ 
						if(val[decoded.username].length!=0){ 
							if(newdata.isDefault){
								val[decoded.username].forEach((value,index)=>{ 
									value.isDefault = false;
								})
							} 
							val[decoded.username].push(newdata);
						}else{
							val[decoded.username] = [newdata];
						} 
						return true;
					}else{
						return false;
					}
				})
				if(!flag){
					let obj = {};
					obj[decoded.username] = [newdata]
					data.push(obj);
				} 
				fs.writeFile(path.join(__dirname,"address","address.json"),JSON.stringify(data),(err)=>{
					if(err){
						res.json({mes:err,code:0});
					}else{
						res.json({mes:"成功",code:1});
					}
					next();
				})
			}
		}) 
	})
	app.post("/addressdel",(req,res,next)=>{
		let {id,token}=req.body; 
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"address","address.json"),'utf-8'));  
		console.log(token);
		jwt.verify(token,"ning",(err,decoded)=>{
			if(err){
				res.json({mes:"token解密失败",code:0})
				next();
			}else{ 
				console.log(decoded)
				let newData=[];	
				data.forEach((val,ind)=>{
					if(val[decoded.username]){
						val[decoded.username].forEach((value,index)=>{ 
							 if(value.id != id){
						          newData.push(value);
						        }
						})
						val[decoded.username] = newData;
					} 
				})
				fs.writeFile(path.join(__dirname,"address","address.json"),JSON.stringify(data),(err)=>{
					if(err){
						res.json({mes:err,code:0});
					}else{
						res.json({mes:"成功",code:1});
					}
					next();
				})
			}
		}) 
	})
	app.post("/addressdefault",(req,res,next)=>{
		let {id,token}=req.body; 
		let data = JSON.parse(fs.readFileSync(path.join(__dirname,"address","address.json"),'utf-8'));  
		jwt.verify(token,"ning",(err,decoded)=>{
			if(err){
				res.json({mes:"token解密失败",code:0})
				next();
			}else{ 
				data.forEach((val,ind)=>{
					if(val[decoded.username]){
						val[decoded.username].forEach((value,index)=>{ 
							if(value.id == id){
					        	value.isDefault = true;
					        }else{
								value.isDefault = false;
					        }
						})
					} 
				})
				fs.writeFile(path.join(__dirname,"address","address.json"),JSON.stringify(data),(err)=>{
					if(err){
						res.json({mes:err,code:0});
					}else{
						res.json({mes:"成功",code:1});
					}
					next();
				})
			}
		}) 
	})
	app.post("/upload",upload.single('imgFile'),(req,res,next)=>{ 
		console.log(req.body)
		res.json({mes:"成功",code:1,src:"http://localhost:3000/"+req.file.filename});
		next();
	})
}
//北上广不相信眼泪 江浙沪不相信邮费 辽吉可以不相信喝醉 京津冀你得有个肺