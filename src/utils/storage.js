export const sessionStorage = {
	getItem(key){
		return window.sessionStorage.getItem(key);
	},
	setItem(key,value){
		window.sessionStorage.setItem(key,value);
	},
	removeItem(key){
	 	if(key.length === 0) {
	 		window.sessionStorage.removeItem(key);
	 		return ;
	 	}
	 	key.map(index=>{
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
	 	if(key.length === 0) {
	 		window.localStorage.removeItem(key);
	 		return ;
	 	}
	 	key.map(index=>{
			window.localStorage.removeItem(index);
		})
	 	window.localStorage.removeItem(key);
	}
}