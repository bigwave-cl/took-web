<template>
	<div>
		<h1>首页</h1>
		<p>
			这里是例子演示示例的首页，点击左侧导航栏跳转对应页面查看例子
		</p>
		<ask-lottery-animation :lottery="test"></ask-lottery-animation>
	</div>
</template>
<script>
	import { askDialogToast } from '@/utils/ask.dialog.js';
	let TIMER = null,
		nextChange = 0;
	export default{
		data(){
			return {
				test:[0,0,0,0]
			}
		},
		created(){
			// this.ordinary();
			var self = this;
			setTimeout(function(){
				self.lottery();
			},1000);
		},
		methods:{
			lottery(){
				var self = this;
				if(nextChange > self.test.length-1) return;
				self.test = self.test.map((key,index)=>{
					if(index == nextChange) key = 1;
					return key;
				})
				nextChange++;
				if(TIMER) clearTimeout(TIMER);
				let TIMER = setTimeout(function(){
					self.lottery();
				},5000);
			}
		}
	}
</script>