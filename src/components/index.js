//按钮控件
import askButton from './ask-button/ask-button.vue';
import askRipple from './ask-ripple/ask-ripple.vue';

//模态框控件
import askModal from './ask-modal/ask-modal.vue';

var components = {
	'ask-button': askButton,
	'ask-modal': askModal,
	'ask-ripple': askRipple
}

export default {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]));
	}
}
