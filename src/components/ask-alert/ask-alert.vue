<template>
	<ask-modal  :show="show" 
				:title="title" 
				:closeIcon="icon" 
				:closeBtn="closeBtn"
				:shade="shade"
				:shadeColor="shadeColor"
				:shadeClick="shadeClick"
				:class="theme"
				@onclose="iconClose">
		<div class="ask-alert-box" v-if="message" v-html="message">
		</div>
	    <ask-button slot="footer" class="ask-alert-btn" :text="btnText" @ask-click="sure"></ask-button>
	</ask-modal>
</template>
<style src="./ask-alert.scss" lang="scss"></style>
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
			},
			btnText:{
				type: String,
				default:'确定'
			},
			closeBtn:{
				type:Boolean,
				default:false
			},
			theme:[]
		},
		data() {
			return {
			}
		},
		methods:{
			sure(){
				this.$emit('onok');
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