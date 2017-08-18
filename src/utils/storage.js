export const sessionStorage = {
	getItem(key){
		return window.sessionStorage.getItem(key);
	},
	setItem(key,value){
		window.sessionStorage.setItem(key,value);
	},
	removeItem(key){
	 	window.sessionStorage.removeItem(key);
	},
	removeAll(keys){
		if(keys.length === 0) return;
		keys.map(index=>{
			window.sessionStorage.removeItem(index);
		})
	}
}
export const localStorage = {
	getItem(key){
		return window.localStorage.getItem(key);
	},
	setItem(key,value){
		window.localStorage.setItem(key,value);
	},
	removeItem(key){
	 	window.localStorage.removeItem(key);
	},
	removeAll(keys){
		if(keys.length === 0) return;
		keys.map(index=>{
			window.localStorage.removeItem(index);
		})
	}
}