import * as config from '../config.js';
export const refreshTitle = (title) => {

	let iframe = document.createElement("iframe");
	iframe.style.visibility = "hidden";
	document.title = title;
	
	iframe.setAttribute("src","./favicon.ico");
	iframe.addEventListener('load', function() {
		setTimeout(function() {
			document.body.removeChild(iframe);
		}, 0);
	});
	document.body.appendChild(iframe);
}
