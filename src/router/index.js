import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main/main'
import home from '@/views/home/home'
import luckDraw from '@/views/luck-draw/luck-draw.vue'

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
			path: 'luck-draw',
			name:'luckDraw',
			component: luckDraw
		}]
	}]
})
