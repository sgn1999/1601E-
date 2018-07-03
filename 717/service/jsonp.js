export default (url,callbackname,callback)=>{
	window[callbackname] = (data)=>{
		callback(data);
	}
	let script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}