<template>
	<ask-modal  :show="show" 
				:title="title" 
				:closeIcon="icon" 
				:shade="shade"
				:shadeColor="shadeColor"
				:shadeClick="shadeClick"
				@oncancel="cancel" 
				@onclose="iconClose">
		<div class="confirm-box" v-if="message">
			{{message}}
		</div>
	    <ask-button slot="footer" class="confirm-btn" :text="cancelText" @ask-click="cancel"></ask-button>
	    <ask-button slot="footer" class="confirm-btn" :text="okText" @ask-click="sure"></ask-button>
	</ask-modal>
</template>
<style src="./ask-confirm.scss" lang="scss"></style>
<script>
	export default{
		props:{
			shade:{
				type:Number,
				default:.4
			},
			shadeColor:{
				type:String,
				default:'#000'
			},
			shadeClick:{
				type:Boolean,
				default: true
			},
			show: {
				type:Boolean,
				default:false
			},
			message: {
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			icon: {
				type: Boolean,
				default:false
			}
		},
		data() {
			return {
				cancelText:'取消',
				okText:'确定'
			}
		},
		methods:{
			sure(){
				this.$emit('onok');
			},
			cancel(){
				this.$emit('oncancel');
			},
			close(){
				this.show = false;
			},
			iconClose(){
				this.$emit('onclose');
			}
		}
	}
</script>