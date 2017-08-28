import ajax from '@/utils/http.axios.js';
import { sessionStorage } from '@/utils/storage.js';
import * as config from '@/config.js';

const baseURL = config.BASE_URL;
let LOT_ID = (()=>{
	let _r = sessionStorage.getItem('lot_id');
	return _r ? _r : '';
})();

export const luckInit = () => ajax({
	method: "post",
	url: baseURL + '/luck_draw',
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		if(!r.data.ok) return;
		LOT_ID = r.data.lot.lot_id;
		sessionStorage.setItem('lot_id',r.data.lot.lot_id);
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
		"lot_id": LOT_ID,
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
		"lot_id": LOT_ID,
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
		"lot_id": LOT_ID,
		"method": "lottery_getCode"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});

/**
 * 奖项详情
 * @Author   陈龙
 * @DateTime 2017-08-22
 * @return   Promise     接口返回数据
 */
//240 -- 243

export const luckDetail = () => ajax({
	method: "post",
	url: baseURL + '/lottery_prizeDetail',
	data: {
		"lot_id": LOT_ID,
		"method": "lottery_prizeDetail"
	},
	before: (r) => {
		// console.log('before');
	},
	complete: (r) => {
		// console.log('complete');
	}
});
