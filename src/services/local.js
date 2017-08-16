import ajax from '@/utils/http.axios.js';

const baseURL = 'http://localhost:8089/api';

/**
 * 方法命名规范
 * @Author   陈龙
 * @DateTime 2017-08-02
 * 
 * 1、遵循驼峰命名
 * 2、所有方法之后需跟上Interface
 * 3、每个方法前面必须打上注释
 */

export const luckInitDataInterface = () => ajax({
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

export const luckSwiperDataInterface = () => ajax({
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
