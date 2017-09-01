const appendOnDocument = (el) => {
	if (document.getElementsByTagName('body')[0]) {
		document.getElementsByTagName('body')[0].appendChild(el);
	} else {
		var wrap = document.createElement('div');
		wrap.appendChild(el);
		document.write(wrap.innerHTML);
	}
}
export const lotteryVoice = (el, bg) => {
	let oldAudioEl = document.getElementById('ask_audio');

	if (oldAudioEl) oldAudioEl.remove();
	let audioEl = document.createElement('audio'),
		sourceEl = document.createElement('source');
	sourceEl.src = bg;
	sourceEl.type = "audio/mp3";
	audioEl.autoplay = true;
	audioEl.loop = true;
	audioEl.setAttribute("id", "ask_audio");
	audioEl.appendChild(sourceEl);
	appendOnDocument(audioEl);

	return audioEl;
}
