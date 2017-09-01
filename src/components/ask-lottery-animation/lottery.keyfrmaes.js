const getRule = (name, value) => {
	let styleBox = document.createElement('style');
	styleBox.type = "text/css";
	let rule = `
		@-webkit-keyframes lottery-slide-${name}{
			0%{
				-webkit-transform: translate(0,${value.to});
				        transform: translate(0,${value.to});
			}
			100%{
				-webkit-transform: translate(0,${value.from});
				        transform: translate(0,${value.from});
			}
		}
		@keyframes lottery-slide-${name}{
			0%{
				-webkit-transform: translate(0,${value.to});
				        transform: translate(0,${value.to});
			}
			100%{
				-webkit-transform: translate(0,${value.from});
				        transform: translate(0,${value.from});
			}
		}
	`;

	styleBox.innerHTML = rule;
	return {
		name: `lottery-slide-${name}`,
		rule: styleBox
	};
}
const getCssText = (time, type, val) => {
	let cssText = `
		-webkit-transition: -webkit-transform ${time} ${type};
		transition: -webkit-transform ${time} ${type};
		transition: transform ${time} ${type};
		transition: transform ${time} ${type}, -webkit-transform ${time} ${type};
		-webkit-transform: translateY(${val});
		transform: translateY(${val});
	`
	return cssText;
}
const appendOnDocument = (el) => {
	if (document.getElementsByTagName('head')[0]) {
		document.getElementsByTagName('head')[0].appendChild(el);
	} else {
		var wrap = document.createElement('div');
		wrap.appendChild(el);
		document.write(wrap.innerHTML);
	}
}
const removeStateClass = (el) => {
	if (el.classList.contains('start')) el.classList.remove('start');
	if (el.classList.contains('process')) el.classList.remove('process');
	if (el.classList.contains('end')) el.classList.remove('end');
}
const countEndPosition = (num) => {
	return num * 10 / 2;
}
const TRANSITION_DURATION = 2000;
export const lotteryKeyframes = (el, state, num, callback) => {
	if (state !== 'run' &&
		state !== 'end') return;
	if (state === 'end' && (num == 'undefined' || num == '')) return;
	removeStateClass(el);
	if (state === 'run') {
		let startRule = getRule('start', { to: '-50%', from: '0' });
		let processRule = getRule('process', { to: '-50%', from: '0' });
		appendOnDocument(startRule.rule);
		appendOnDocument(processRule.rule);
		el.classList.add('start');
		if (num) num();
	}
	if (state === 'end') {
		num = parseInt(num, 10);
		let endPos = countEndPosition(num);
		let endCss = getCssText(`${TRANSITION_DURATION}ms`, `ease-out`, `-${endPos}%`);
		el.style.cssText = "\
			-webkit-transform: translateY(-" + Math.abs(endPos + 30) + "%);\
			-moz-transform: translateY(-" + Math.abs(endPos + 30) + "%);\
			-ms-transform: translateY(-" + Math.abs(endPos + 30) + "%);\
			transform: translateY(-" + Math.abs(endPos + 30) + "%);\
		";
		window.getComputedStyle(el).getPropertyValue('opacity');
		el.style.cssText = endCss;
		let timer = setTimeout(() => {
			clearTimeout(timer);
			if (callback) callback();
		}, TRANSITION_DURATION);
	}
}
