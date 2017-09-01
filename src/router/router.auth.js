import router from './index.js'
import { refreshTitle } from '@/utils';

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		refreshTitle(to.meta.title);
	} else {
		refreshTitle('拓客');
	}
	next()
	/*to.matched.some(record => {
		next()
	});*/

})
