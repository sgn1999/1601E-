let Mock = require("mockjs");
let Random = Mock.Random;
let fs = require("fs");
let data = Mock.mock({
	"list|10":[
		{
			"userId|+1":0,
			"userName":/[a-z]{6,10}/,
			"password":/[a-z][A-Z]{2,5}\d{5,10}/
		}
	]
})
fs.writeFile("user.json",JSON.stringify(data));