import Vue from 'vue'
import VueResource from 'vue-resource'
import * as config from '../config.js';

let baseUrl = config.baseUrl2;

Vue.use(VueResource);

Vue.http.options = {
	emulateJSON: true,
	emulateHTTP: true,
	timeout: 10000
}

export default async(options)=>{
	let opt = {
			url:'',
			method:'GET',
			data:{},
			before:()=>{}
		};
	opt = Object.assign(opt,options);

	opt.method = opt.method.toUpperCase();
	
	Object.defineProperties(opt.data, {
		"wid": {
			value: config.USER_ID,
			writable: false,
			enumerable:true
		},
		"access_token": {
			value: config.AUTH_TOKEN,
			writable: false,
			enumerable:true
		}
	});

	let _url = baseUrl + opt.url;
	if(opt.method === 'GET'){
		try {
			const response = await Vue.http.get(_url,{	
				params:opt.data,
				before: response => {
                    opt.before(response);
                }
			});

			return response;
		} catch (error) {
			throw new Error(error)
		}
	}

	if(opt.method === 'POST'){
		try {
			const response = await Vue.http.post(_url, opt.data, {
				before: response => {
                    opt.before(response);
                }
			});

			return response;
		} catch (error) {
			throw new Error(error)
		}
	}
}