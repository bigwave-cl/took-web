;
((win) => {
	let doc = win.document;
	let docEl = doc.documentElement;
	let metaEl = doc.querySelector('meta[name="viewport"]');
	let dpr = 0;
	let scale = 0;
	let timer;

	if(metaEl){
		let match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
		if (match) {
		    scale = parseFloat(match[1]);
		    dpr = parseInt(1 / scale);
		}
	}
	if (!dpr && !scale) {
	    let isAndroid = win.navigator.appVersion.match(/android/gi);
	    let isIPhone = win.navigator.appVersion.match(/iphone/gi);
	    let devicePixelRatio = win.devicePixelRatio;
	    if (isIPhone) {
	        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
	        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
	            dpr = 3;
	        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
	            dpr = 2;
	        } else {
	            dpr = 1;
	        }
	    } else {
	        // 其他设备下，仍旧使用1倍的方案
	        dpr = 1;
	    }
	    scale = 1 / dpr;
	}
	docEl.setAttribute('data-dpr', dpr);
	if (!metaEl) {
	    metaEl = doc.createElement('meta');
	    metaEl.setAttribute('name', 'viewport');
	    metaEl.setAttribute('content', 'width=device-width, user-scalable=no,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	    if (docEl.getElementsByTagName('head')) {
	        docEl.getElementsByTagName('head')[0].appendChild(metaEl);
	    } else {
	        var wrap = doc.createElement('div');
	        wrap.appendChild(metaEl);
	        doc.write(wrap.innerHTML);
	    }
	}
	let refreshRem = ()=>{
	    var width = docEl.getBoundingClientRect().width;
	    if (width / dpr > 540) {
	        width = 540 * dpr;
	    }
	    var rem = width / 10;
	    doc.getElementsByTagName('html')[0].style.fontSize = rem + "px";
	}
    win.addEventListener('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();
})(window)