import Vue from 'vue'
import Router from 'vue-router'
import main from './views/main.vue'
import home from './views/home.vue'
import askConfirm from './views/ask-confirm.vue'
import askToast from './views/ask-toast.vue'
import askAlert from './views/ask-alert.vue'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'main',
		component: main,
		redirect: '/home',
		children: [{
			path: 'home',
			name:'home',
			component: home
		},{
			path: 'askConfirm',
			name:'askConfirm',
			component: askConfirm
		},{
			path: 'askToast',
			name:'askToast',
			component: askToast
		},{
			path: 'askAlert',
			name:'askAlert',
			component: askAlert
		}]
	}]
})
