let config = {
	isLocal: false,
	el: document.getElementsByTagName('body')[0],
	getBaseUrl() {
		let self = this;
		let _r = this.el.getAttribute('data-api');
		if (self.isLocal) {
			// _r = 'http://qft.jiaohang999.com/qft/page/web-app/api';
			_r = 'http://192.168.1.101:8089/api'; 
			// _r = 'http://test.xiuzhimeng.com/fqb/page/web-app/api';
			// _r = 'http://qft.jiaohang999.com/qft/page/web-app/api';
		}
		return _r;
	},
	getAuthToken() {
		let self = this;
		let _r = this.el.getAttribute('data-token');
		if (self.isLocal) {
			// _r = '1a6d0c9bf64054e48cfdf3b28cb62bb8';
			_r = '212e82a149954a2c05ded018e6535c01';
		}
		return _r;
	},
	getWId() {
		let self = this;
		let _r = this.el.getAttribute('data-wid');
		if (self.isLocal) {
			// _r = 1;
			_r = 165;
		}
		return _r;
	}
}
// http://www.cnblogs.com/laden666666/p/5544572.html
export const PROD = config.isLocal;
export const BASE_URL = config.getBaseUrl();
export const AUTH_TOKEN = config.getAuthToken();
export const W_ID = config.getWId();
