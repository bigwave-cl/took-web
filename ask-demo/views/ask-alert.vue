<template>
	<div>
		<h1>模态框<small>警示框</small></h1>
		<p>
			调用代码
		</p>
		<p v-html="showCode" v-highlight>
		</p>
		<h4>
			自定义弹框
		</h4>
		<div class="ask-flex-box">
			<div class="ask-flex-2 alert">
				<p>
					选择弹框颜色
				</p>
				<div class="alert-box">
					<ask-button class="color-btn default active" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn success" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn info" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn danger" @ask-click="choseColor($event)"></ask-button>
				</div>
			</div>
			<div class="ask-flex-2 alert">
				<p>
					是否显示关闭按钮
				</p>
				<div class="ask-check-demo">
					<label class="beautiful-input">
						<input type="checkbox" name="" value="" v-model="tClose">
						<span class="b-box"></span>
					</label>
				</div>
				<p>
					是否开启遮罩层
				</p>
				<div class="ask-check-demo">
					<label class="beautiful-input">
						<input type="checkbox" name="" value="" v-model="tShade">
						<span class="b-box"></span>
					</label>
				</div>
				<p v-if="tShade">
					是否开启遮罩层点击关闭弹框
				</p>
				<div class="ask-check-demo" v-if="tShade">
					<label class="beautiful-input">
						<input type="checkbox" name="" value="" v-model="tShadeClick">
						<span class="b-box"></span>
					</label>
				</div>
			</div>
		</div>
		<p>
			标题设置
		</p>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<input type="text" placeholder="警示框标题" v-model="tTitle" class="alert-input">
			</div>
		</div>
		<p>
			内容设置
		</p>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<input type="text" placeholder="警示框内容" v-model="tMsg" class="alert-input">
			</div>
		</div>
		<p>
			按钮文字设置
		</p>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<input type="text" placeholder="按钮文字" v-model="tBtnText" class="alert-input">
			</div>
		</div>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<ask-button class="open-btn" @ask-click="ordinary" :text="'触发alert'"></ask-button>
			</div>
		</div>
	</div>
</template>
<script>
import { askDialogAlert,askDialogToast } from '@/utils/ask.dialog.js';
export default {
	data() {
		return {
			tTitle: '警示框',
			tMsg: 'alert',
			tBtnText: '确定',
			tClass: '',
			tClose: true,
			tShadeClick: true,
			tShade: true,
		}
	},
	created() {},
	computed: {
		tTime() {
			return this.selectTime;
		},
		showCode() {
			return `
			<pre>
				<code class="javascript">
					import { askDialogAlert,askDialogToast } from '@/utils/ask.dialog.js';
					askDialogAlert({
						title: '${this.tTitle}',
						msg: '${this.tMsg}',
						btnText: '${this.tBtnText}',
						class: '${this.tClass}',
						closeIcon: ${this.tClose},
						shade: ${this.tShade},
						shadeClick: ${this.tShadeClick}
					}, (ok) => {
						ok.close();
						askDialogToast({msg:'你点击了确定',class:'info'});
						console.log()
					}, (close) => {
						console.log(close);
					})
				</code>
			</pre>`
		}
	},
	methods: {
		choseColor(e) {
			e.classList.add('active');
			this.siblings(e).map(index => {
				index.classList.remove('active');
			})
			if (e.classList.item(2) === 'default') this.tClass = '';
			else this.tClass = e.classList.item(2);
		},
		ordinary() {
			askDialogAlert({
				title: this.tTitle,
				msg: this.tMsg,
				btnText: this.tBtnText,
				class: this.tClass,
				closeIcon: this.tClose,
				shade: this.tShade,
				shadeClick: this.tShadeClick
			}, (ok) => {
				ok.close();
				askDialogToast({msg:'你点击了确定',class:'info'});
				console.log()
			}, (close) => {
				console.log(close);
			})
		},
		siblings(elem) {
			let matched = [];
			let n = (elem.parentNode || {}).firstChild;
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					matched.push(n);
				}
			}
			return matched;
		}
	}
}

</script>
<style lang="scss">
.ask-flex-2.alert {
	-webkit-align-self: stretch;
	-ms-flex-item-align: stretch;
	-ms-grid-row-align: stretch;
	align-self: stretch;
}

.alert-box {
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	width: 100%;
	max-width: 300px;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-flow: row wrap;
	-moz-box-orient: horizontal;
	-moz-box-direction: normal;
	-ms-flex-flow: row wrap;
	flex-flow: row wrap;
	.ask-button {
		position: relative;
		width: 100%;
		height: 50px;
		margin-top: 10px;
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 100%;
		-moz-box-flex: 0;
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		&.active::before {
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			width: 30px;
			height: 14px;
			margin-top: -10px;
			margin-left: -15px;
			content: '';
			-webkit-transform: rotate(-45deg);
			-moz-transform: rotate(-45deg);
			-ms-transform: rotate(-45deg);
			transform: rotate(-45deg);
			pointer-events: none;
			border-bottom: 3px solid #fff;
			border-left: 3px solid #fff;
		}
	}
	.color-btn.default {
		background-color: #353535;
	}
	.color-btn.success {
		background-color: #00e676;
	}
	.color-btn.info {
		background-color: #1de9b6;
	}
	.color-btn.danger {
		background-color: #ff4081;
	}
	.position-btn {
		height: 0;
		margin: 0;
		padding: 15% 0;
		border: 1px solid #ffe0b2;
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
		border-radius: 0;
		background-color: #ef6c00;
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 33%;
		-moz-box-flex: 0;
		-ms-flex: 0 0 33%;
		flex: 0 0 33%;
		&.active {
			background-color: #ffa726;
		}
	}
}

.alert-select {
	font-size: 1.8rem;
	width: 100%;
	max-width: 500px;
	height: 40px;
	cursor: pointer;
	color: #474443;
	outline: none;
}

.alert-input {
	font-size: 1.8rem;
	width: 100%;
	height: 40px;
	margin: 0 0 20px 0;
	padding: 8px 16px;
	color: #474443;
	border: none;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	outline: none;
	-webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
	-moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
	box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
}

.ask-flex-box .open-btn {
	background-color: #80deea;
}
.alert{
	.ask-check-demo .beautiful-input{
		text-indent: 3em;
	}
}
</style>
