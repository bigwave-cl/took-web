<template>
		<div id="app" class="container">
			<tab :type="type" class="ask-nav-demo"></tab>
			<!-- <transition> -->
			    <router-view class="ask-content-demo"></router-view>
			<!-- </transition> -->
		</div>
</template>

<style src="../style/main.scss" lang="scss"></style>
<script>
import tab from './tab.vue';
	export default{
		data() {
			return {
				transitionName:'slide'
			}
		},
		computed:{
			type(){
				return this.$route.name;
			}
		},
		components:{
			tab
		}
	}
</script>