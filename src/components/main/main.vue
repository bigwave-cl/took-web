<template>
	<div id="app" class="container">
		<!-- <nav-tab :type="type"></nav-tab> -->
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import askOverlay from '@/components/ask-overlay/ask.overlay.js';
export default {
	data() {
		return {
			transitionName: 'slide'
		}
	},
	watch: {
		'$route' (to, from) {
			askOverlay.closeAll();
		}
	}
}

</script>
