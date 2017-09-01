import Vue from 'vue'
import ComponentTemplate from './ask-modal.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const askModal = (option, onClose) => {
	let vm = new VueComponent().$mount();
	let opt = {
		title: '自定义框',
		btnText: '确定',
		closeIcon: false,
		closeBtn: true,
		shade: true,
		shadeClick: true,
		time: null,
		class: '',
		content: ''
	}
	if (option && typeof option == 'object') {
		opt = Object.assign(opt, option);
	}

	vm.content = opt.content;
	vm.title = opt.title;
	vm.closeIcon = opt.closeIcon;
	vm.closeBtn = opt.closeBtn;
	vm.btnText = opt.btnText;
	vm.shadeClick = opt.shadeClick;
	if (opt.class == '') {
		vm.theme = '';
	}
	// if(opt.class == 'info' || opt.class == 'success' || opt.class == 'danger'){
	// 	vm.theme = ['ask-alert-theme-'+opt.class];
	// }else{
	vm.theme = [opt.class];
	// }
	if (!opt.shade) {
		vm.shade = 0;
		vm.shadeClick = false;
	}
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose();
	});
	if (opt.time != null) {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			vm.show = false;
			if (onClose) onClose();
		}, opt.time);
	}
	document.body.appendChild(vm.$el);
	vm.show = true;
}
