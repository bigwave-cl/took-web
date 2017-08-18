import ajax from '@/utils/http.axios.js';

const baseURL = 'http://localhost:8089/api';

export const luckInit = () => ajax({
	method: "post",
	url: baseURL + '/luck_draw',
	data: {
		"lot_id": "242",
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
	url: baseURL + '/swiper',
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
 * @DateTime 2017-08-14
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckNumber = () => ajax({
	method: "post",
	url: baseURL + '/lottery_getLuckyNum',
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
 * @DateTime 2017-08-14
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckCode = () => ajax({
	method: "post",
	url: baseURL + '/lottery_getCode',
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
