import Vue from 'vue'
import ComponentTemplate from './ask-confirm.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const askConfirm = (option, onOk, onCancel, onClose) => {
	let vm = new VueComponent().$mount();
	let opt = {
		msg: '',
		title: '信息',
		closeIcon: false,
		shadeClick: true
	}

	opt = Object.assign(opt, option);
	vm.message = opt.msg;
	vm.title = opt.title;
	vm.icon = opt.closeIcon;
	vm.shadeClick = opt.shadeClick;
	vm.$on('onok', () => {
		if (onOk) onOk(vm);
	});
	vm.$on('oncancel', () => {
		vm.show = false;
		if (onCancel) onCancel(vm);
	});
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
