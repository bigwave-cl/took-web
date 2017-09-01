/**
 * 刷新标题
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 */
export const refreshTitle = (title) => {

	let iframe = document.createElement("iframe");
	iframe.style.visibility = "hidden";
	document.title = title;

	iframe.setAttribute("src", './static/refresh_title.html');
	iframe.addEventListener('load', function() {
		setTimeout(function() {
			document.body.removeChild(iframe);
		}, 0);
	});
	document.body.appendChild(iframe);
}

/**
 * 将数字格式化为金额显示格式（100,000.00）
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num 值				例: 250000.01
 * @return   {[type]}   返回金额格式字符串      250,000.01
 */
export const amountFormat = (num) => {
	var num = (num || 0).toString().replace(/\,/g, "").split('\.'),
		result = '';
	while (num[0].length > 3) {
		result = ',' + num[0].slice(-3) + result;
		num[0] = num[0].slice(0, num[0].length - 3);
	}
	if (num[0]) { result = num[0] + result; }
	if (num.length > 1) result += '.' + num[1];
	return result;
}

/**
 * 处理时间差
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   difference [毫秒]的数值
 * @return   {[type]}              返回多少天多少小时多少分多少秒
 */
export const handlerTimeDifference = (difference) => {
	let curDay = handlerSingleDigit(Math.floor(difference / (1000 * 60 * 60 * 24))),
		curHours = handlerSingleDigit(Math.floor(difference / (1000 * 60 * 60) % 24)),
		curMinutes = handlerSingleDigit(Math.floor(difference / (1000 * 60) % 60)),
		curSeconds = handlerSingleDigit(Math.floor(difference / (1000) % 60));
	return {
		d: curDay,
		h: curHours,
		m: curMinutes,
		s: curSeconds
	}
}

export const calculationTimeDifference = (begin, end) => {

}
/**
 * 为一位数前面加上0
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num  例:   -1   2    12
 * @return   {[type]}             -01   02   12
 */
export const handlerSingleDigit = (num) => {
	return num >= -10 ? num >= 0 ? num < 10 ? '0' + num : num : '-0' + Math.abs(num) : num;
}


/*
let domTiming = window.performance.timing;
console.log('//浏览器开始解析 HTML 文档第一批收到的字节')
console.log(domTiming.domLoading);
console.log('// 浏览器完成解析并且所有 HTML 和 DOM 构建完毕')
console.log(domTiming.domInteractive);
console.log('//DOM 解析完成后，网页内资源加载开始的时间')
console.log(domTiming.domContentLoadedEventStart);
console.log('// DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）')
console.log(domTiming.domContentLoadedEventEnd);
console.log('//网页上所有资源（图片等）下载完成,且准备就绪的时间')
console.log(domTiming.domComplete);
console.log('总共耗时')
console.log(domTiming.domComplete - domTiming.domLoading)
*/