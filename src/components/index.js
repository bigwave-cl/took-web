//按钮控件
import askButton from './ask-button/ask-button.vue';
import askRipple from './ask-ripple/ask-ripple.vue';

//模态框控件
import askModal from './ask-modal/ask-modal.vue';

//抽奖动画
import askLotteryAnimation from './ask-lottery-animation/ask-lottery-animation.vue';

//swiper模块
import askSwiper from './ask-swiper/ask-swiper.vue';
import askSlide from './ask-swiper/ask-slide.vue';

var components = {
	'ask-button': askButton,
	'ask-modal': askModal,
	'ask-ripple': askRipple,
	'ask-lottery-animation':askLotteryAnimation,
	'ask-swiper':askSwiper,
	'ask-slide':askSlide
}

export default {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]));
	}
}
