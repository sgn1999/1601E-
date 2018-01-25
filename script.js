class Tab{
	constructor({length}){
		this.length = length;
		this.init();
	}

	init(){
		let wap = this.addWap();
		document.body.appendChild(wap);
		wap.innerHTML=this.addUl();	
		wap.innerHTML+=this.addOl();
		this.addEvent();	
	}

	addWap(){
		let wap = document.createElement("div");
		wap.className="warp";
		return wap;
	}

	addUl(){
		let str = "<ul>";
		for(var i=0; i<this.length; i++){
			str+="<li>Tab"+i+"</li>"
		}
		str+="</ul>";
		return str;
	}

	addOl(){
		let str = "<ol>";
		for(var i=0; i<this.length; i++){
			str+="<li>Tab"+i+"</li>"
		}
		str+="</ol>";
		return str;
	}

	addEvent(){
		let ul = document.getElementsByTagName("ul")[0];
		let ulis = ul.getElementsByTagName("li");
		let ol = document.getElementsByTagName("ol")[0];
		let olis = ol.getElementsByTagName("li");
		for(let i=0; i<ulis.length; i++){
			(function(i){
				ulis[i].onclick=function(){
					for(let j=0; j<olis.length; j++){
						olis[j].style.display="none";
					}
					olis[i].style.display="block";
				}
			})(i)
		}
	}
}
new Tab({
	length:5
});