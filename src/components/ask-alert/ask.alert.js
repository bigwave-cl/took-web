import Vue from 'vue'
import ComponentTemplate from './ask-alert.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const askAlert = (option, onOk, onClose) => {
	let vm = new VueComponent().$mount();
	let opt = {
		msg: '内容',
		title: '警示框',
		btnText: '确定',
		closeIcon: true,
		shade: true,
		shadeClick: true,
		closeBtn: true,
		class: ''
	}

	opt = Object.assign(opt, option);
	vm.message = opt.msg;
	vm.title = opt.title;
	vm.closeBtn = !opt.closeBtn;
	vm.icon = !opt.closeIcon;
	vm.btnText = opt.btnText;
	vm.shadeClick = opt.shadeClick;
	if (opt.class == '') {
		vm.theme = '';
	}
	if (opt.class == 'info' || opt.class == 'success' || opt.class == 'danger') {
		vm.theme = ['ask-alert-theme-' + opt.class];
	} else {
		vm.theme = [opt.class];
	}
	if (!opt.shade) {
		vm.shade = 0;
		vm.shadeClick = false;
	}
	vm.$on('onok', () => {
		if (onOk) onOk(vm);
	});
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
