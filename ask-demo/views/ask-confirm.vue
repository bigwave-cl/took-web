<template>
	<div>
		<h1>模态框<small>对话框</small></h1>

		<p>
			普通对话框(函数形式调用)
		</p>

		<p>
			调用代码
		</p>
		<p v-html="showCode" v-highlight>

		<div class="ask-flex-box">
			<div class="ask-flex-1 confrim">
				<ask-button class="confirm-button" :text="'触发confirm'" @ask-click="ordinary"></ask-button>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.ask-flex-1.confrim{
		text-align: center;
	}
	.confirm-button{
		background-color: #9ccc65;
		width:100%;
		max-width:350px;
	}
</style>
<script>
import { askDialogConfirm,askDialogToast } from '@/utils/ask.dialog.js';
export default {
	computed:{
		showCode(){
			return `
			<pre>
				<code class="javascript">
					import { askDialogConfirm,askDialogToast } from '@/utils/ask.dialog.js';
					askDialogConfirm({
						title: '快说我帅',
						msg: '你是不是认为我是最帅的弹框呢？'
					}, (vm) => {
						askDialogToast({msg:'真有品位',class:'info'})
					}, () => {
						askDialogToast({msg:'哼哼',class:'info'})
					}, () => {
						askDialogToast({msg:'关我干嘛',class:'info'})
					});
				</code>
			</pre>`
		}
	},
	methods: {
		ordinary() {
			askDialogConfirm({
				title: '快说我帅',
				msg: '你是不是认为我是最帅的弹框呢？'
			}, (vm) => {
				askDialogToast({msg:'真有品位',class:'info'})
			}, () => {
				askDialogToast({msg:'哼哼',class:'info'})
			}, () => {
				askDialogToast({msg:'关我干嘛',class:'info'})
			});
		}
	}
}

</script>
