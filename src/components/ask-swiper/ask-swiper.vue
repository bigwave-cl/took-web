<template>
	<div class="swiper-container">
	    <div class="swiper-wrapper">
	       	<slot></slot>
	    </div>
		<slot name="prev"></slot>
		<slot name="next"></slot>
		<slot name="pagination"></slot>
	</div>
</template>
<script>
import Swiper from 'swiper';
import '@/../node_modules/swiper/dist/css/swiper.min.css';
	export default {
		props:{
			options:{
				type:Object,
				default:{}
			},
			slideData:''
		},
		data(){
			return{
				swiper:''
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.swiper = new Swiper (this.$el, this.options);
			})
		},
	    updated(){
	    },
		destroyed(){
			this.$nextTick(()=>{
				if (this.swiper) this.swiper.destroy();
			})
		},
		watch:{
			"slideData":{
				handler:function(n,o){
					// if(n.length <= 1) return;
					this.$nextTick(()=>{
						 if (this.swiper) {
		                	this.swiper.update();
							this.swiper.reLoop();
							this.swiper.slideNext(false,0);
						 }
					})
				},
				deep:true
			}
		}
	}
</script>