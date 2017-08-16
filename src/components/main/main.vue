<template>
		<div id="app" class="container">
		<!-- <nav-tab :type="type"></nav-tab> -->
			<transition :name="transitionName">
			    <router-view></router-view>
			</transition>
		</div>
</template>

<script>
	export default{
		data() {
			return {
				transitionName:'slide'
			}
		}
	}
</script>