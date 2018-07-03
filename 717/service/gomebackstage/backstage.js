var http=require('http'); 
module.exports = (id)=>{
  return new Promise((resolve,reject)=>{
    var options={  
       hostname:'m.gome.com.cn',  
       port:80,  
       path:'/index.php?ctl=goods_class&act=ajaxGetClassList&cid='+id,  
       method:'get',  
       headers:{   
       }  
    }  
    var req=http.request(options, function(res) {  
      res.setEncoding('utf-8');  
      let str = "";
      res.on('data',function(chun){  
          str += chun;
      });  
      res.on('end',function(){   
          resolve(str);
      });  
    });  
    req.on('error',function(err){  
      reject(err); 
    });    
    req.end(); 
  })
}
 