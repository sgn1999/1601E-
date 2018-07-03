const express = require('express');
const app = express();
const fn = require("./app.js");
const path = require("path")
app.use(express.static(path.resolve(process.cwd()+'/../service/upload'))); 
fn(app);
//?page=1
const server = app.listen(3000,()=>{
	var host = server.address().address;
	var port = server.address().port;
	console.log("正在监听",host,port);
})