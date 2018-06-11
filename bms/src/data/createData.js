let fs = require("fs");
let Mock = require("mockjs");
let Random = Mock.Random;
let data = Mock.mock({
	'userList|10':[{
		'name':()=>Random.cname(),
		"id|+1":0
	}]
})
fs.writeFile('userList.json',JSON.stringify(data),function(){
	console.log("创建成功")
})