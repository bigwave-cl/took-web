export const sessionStorage = {
	getItem(key){
		return window.sessionStorage.getItem(key);
	},
	setItem(key,value){
		window.sessionStorage.setItem(key,value);
	},
	removeItem(key){
		
		if(Object.prototype.toString.call(key) == '[object String]'){
			window.sessionStorage.removeItem(key);
	 		return ;
		}
		if(Object.prototype.toString.call(key) == '[object Array]' && key.length === 0){
	 		window.sessionStorage.removeItem(key);
	 		return ;
		}else{
		 	key.map(index=>{
				window.sessionStorage.removeItem(index);
			})
		}
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

		if(Object.prototype.toString.call(key) == '[object String]'){
			window.localStorage.removeItem(key);
	 		return ;
		}
		if(Object.prototype.toString.call(key) == '[object Array]' && key.length === 0){
	 		window.localStorage.removeItem(key);
	 		return ;
		}else{
		 	key.map(index=>{
				window.localStorage.removeItem(index);
			})
		}
	}
}