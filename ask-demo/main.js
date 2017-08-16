import Vue from 'vue'
import App from './App'
import router from './router.js'
import GlobalComponents from '../src/components';

import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

Vue.directive('highlight', function(el) {
	let blocks = el.querySelectorAll('pre code');
	blocks.forEach((block) => {
		hljs.highlightBlock(block)
	})
})

Vue.config.productionTip = false;

Vue.use(GlobalComponents);

new Vue({
	el: '#app',
	router,
	render: (h) => h(App)
})
