import Vue from 'vue'
import ComponentTemplate from './ask-modal.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const askModal = (message,onOk,onCancel) =>{
	/*let vm = new VueComponent().$mount();
	vm.message = message;
	vm.$on('onok',()=>{
		if(onOk) onOk();
		vm.show = true;
	});
	vm.$on('oncancel',()=>{
		vm.show = false;
		if(onCancel) onCancel();
	});
	vm.$on('onclose',()=>{
		vm.show = false;
	});
	document.body.appendChild(vm.$el);
	vm.show = true;*/
}