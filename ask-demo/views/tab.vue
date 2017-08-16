<template>
	<div class="ask-slide-demo">
		<ask-button class="ask-bar-all" @ask-click="toggleSlide" :rippleColor="'rgba(182,125,6,.4)'">
			<div class="text">AskMeWhy</div>
		</ask-button>
		<transition name="ask-slide-left">
			<ul class="ask-group" v-show="show">
				<li class="group-li" v-for="(group,$i) in tabList" :key="$i">
					<div class="text">{{group.alias}}</div>
					<ul class="ask-menu">
						<li class="menu-li" v-for="(menu,$j) in group.list" :key="$j" :class="{active: type == menu.name}">
							<router-link :to="menu.path">
								<ask-button>
										{{menu.alias}}
								</ask-button>
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</transition>
	</div>
</template>
<style src="../style/tab.scss" lang="scss"></style>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'home'
		}
	},
	data() {
		return {
			show: true,
			tabList: [{
					title: '组件',
					alias: 'Component',
					type: 'component',
					list: [{
						title: '首页',
						alias: 'Home',
						path: '/home',
						name: 'home'
					}]
				},
				{

					title: '模态框',
					alias: 'Modal',
					type: 'modal',
					list: [{
						title: '对话框',
						alias: 'Confirm',
						path: '/askConfirm',
						name: 'askConfirm'
					},{
						title: '提示框',
						alias: 'Toast',
						path: '/askToast',
						name: 'askToast'
					},{
						title: '警示框',
						alias: 'Alert',
						path: '/askAlert',
						name: 'askAlert'
					}]
				}
			]
		}
	},
	methods: {
		toggleSlide() {
			this.show = !this.show;
		}
	}
}

</script>
