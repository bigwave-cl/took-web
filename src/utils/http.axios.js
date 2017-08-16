import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import * as config from '@/config.js';

export default async(options) => {
	let opt = {
		url: '',
		proxy: '',
		method: 'GET',
		data: {},
		complete: null,
		before: null
	};
	opt = Object.assign(opt, options);

	opt.method = opt.method.toUpperCase();
	Object.defineProperties(opt.data, {
		"wid": {
			value: config.USER_ID,
			writable: false,
			enumerable: true
		},
		"access_token": {
			value: config.AUTH_TOKEN,
			writable: false,
			enumerable: true
		}
	});


	//添加一个请求拦截器
	axios.interceptors.request.use(function(config) {
		//在请求发送之前做一些事
		if (opt.before) opt.before(config);
		return config;
	}, function(error) {
		//当出现请求错误是做一些事
		if (opt.complete) opt.complete();
		return Promise.reject(error);
	});

	//添加一个返回拦截器
	axios.interceptors.response.use(function(response) {
		//对返回的数据进行一些处理
		if (opt.complete) opt.complete();
		return response;
	}, function(error) {
		//对返回的错误进行一些处理
		if (opt.complete) opt.complete();
		return Promise.reject(error);
	});

	if (opt.method === 'GET') {
		try {
			// const response = await axios.get(opt.url,{params:opt.data});
			const response = await axios({
				method: opt.method,
				url: opt.url,
				params: opt.data,
				responsetype: 'json'
			});

			return response;
		} catch (error) {
			throw new Error(error)
		}
	}
	if (opt.method === 'POST') {
		try {
			// const response = await axios.post(opt.url,opt.data);
			const response = await axios({
				method: opt.method,
				url: opt.url,
				data: qs.stringify(opt.data),
				responsetype: 'json',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			return response;
		} catch (error) {
			throw new Error(error)
		}
	}
}
