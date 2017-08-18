import ajax from '@/utils/http.axios.js';
import * as config from '@/config.js';

const baseURL = config.baseUrl2;
/**
 * 首页获取数据demo
 * @Author   陈龙
 * @DateTime 2017-08-02
 * @return   Promise     接口返回数据
 */
export const home = () => ajax({
	method: "post",
	url:baseURL,
	data: {
		"lot_id": "240",
		"method": "lottery_home"
	},
	before: (r) => {
		console.log('before');
	},
	complete: (r) => {
		console.log('complete');
	}
});
/**
 * 抽奖首页数据
 * @Author   陈龙
 * @DateTime 2017-08-14
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckInit = () => ajax({
	method: "post",
	url:baseURL,
	data: {
		"lot_id": "242",
		"method": "lottery_home"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});
/**
 * 抽奖页面轮播图
 * @Author   陈龙
 * @DateTime 2017-08-14
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckSwiper = () => ajax({
	method: "post",
	url:baseURL,
	data: {
		"lot_id": "242",
		"method": "lottery_ad"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});
/**
 * 抽奖页面抽取幸运数字
 * @Author   陈龙
 * @DateTime 2017-08-17
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckNumber = () => ajax({
	method: "post",
	url:baseURL,
	data: {
		"lot_id": "242",
		"method": "lottery_getLuckyNum"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});
/**
 * 领取兑换码和查询兑换码
 * @Author   陈龙
 * @DateTime 2017-08-17
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckCode = () => ajax({
	method: "post",
	url: baseURL,
	data: {
		"lot_id": "242",
		"method": "lottery_getCode"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});