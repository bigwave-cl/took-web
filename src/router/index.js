import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main/main'
import home from '@/views/home/home'
import luckDraw from '@/views/luck-draw/luck-draw.vue'
import luckCode from '@/views/luck-code/luck-code.vue'
import luckDetail from '@/views/luck-detail/luck-detail.vue'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [{
		path: '/',
		name: 'main',
		component: main,
		redirect: '/luck-draw',
		children: [{
			path: 'home',
			name:'home',
			component: home
		},{
			path: 'luck-draw',
			name:'luckDraw',
			component: luckDraw,
		},{
			path: 'luck-code',
			name:'luckCode',
			component: luckCode,
		},{
			path: 'luck-detail',
			name:'luckDetail',
			component: luckDetail,
		}]
	}]
})
