import * as config from '../config.js';
let baseUrl = '';
export default async(options)=>{
	let opt = {
			url:'',
			method:'GET',
			modal:'fetch',
			data:{}
		};
	opt = Object.assign(opt,options);

	opt.method = opt.method.toUpperCase();

	console.log(opt)
	let _url = baseUrl + opt.url;
	if(opt.method === 'GET'){
		let dataStr = '';
		Object.keys(opt.data).forEach(key=>{
			console.log(Object.prototype.toString.call(opt.data[key]));
			dataStr += key+'='+opt.data[key]+'&';
		})
		if(dataStr !== ''){
			dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
			console.log(dataStr)
		}
	}
	let requestConfig = {
		credentials: 'include',
		method: opt.method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials:'include',
		mode: "cors",
		cache: "default"
	}

	if (opt.method == 'POST') {
		Object.defineProperty(requestConfig, 'body', {
			value: JSON.stringify(opt.data)
		})
	}
	
	try {
		const response = await fetch(_url, requestConfig);
		const responseJson = await response.json();
		console.log(responseJson)
		return responseJson
	} catch (error) {
		throw new Error(error)
	}

}
