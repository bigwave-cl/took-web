<template>
	<div>
		<h1>模态框<small>提示框</small></h1>
		<p>
			调用代码
		</p>
		<p v-html="showCode" v-highlight>
		</p>
		<h4>
			自定义弹框
		</h4>
		<div class="ask-flex-box">
			<div class="ask-flex-2 toast">
				<p>
					选择弹框颜色
				</p>
				<div class="toast-box">
					<ask-button class="color-btn default active" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn success" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn info" @ask-click="choseColor($event)"></ask-button>
					<ask-button class="color-btn danger" @ask-click="choseColor($event)"></ask-button>
				</div>
			</div>
			<div class="ask-flex-2 toast">
				<p>
					选择弹框位置
				</p>
				<div class="toast-box">
					<ask-button class="position-btn" @ask-click="chosePosition($event,'top-left')"></ask-button>
					<ask-button class="position-btn active" @ask-click="chosePosition($event,'top-center')"></ask-button>
					<ask-button class="position-btn" @ask-click="chosePosition($event,'top-right')"></ask-button>
					<ask-button class="position-btn" @ask-click="chosePosition($event,'bottom-left')"></ask-button>
					<ask-button class="position-btn" @ask-click="chosePosition($event,'bottom-center')"></ask-button>
					<ask-button class="position-btn" @ask-click="chosePosition($event,'bottom-right')"></ask-button>
				</div>
			</div>
		</div>
		<p>
			选择时间
		</p>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<select class="toast-select" name="time" v-model="selectTime">
					<option value='1000'>1s</option>
					<option value='2000'>2s</option>
					<option value='3000'>3s</option>
					<option value='5000'>5s</option>
					<option value='30000'>30s</option>
					<option value='60000'>1Minute</option>
				</select>
			</div>
		</div>
		<p>
			内容设置
		</p>
		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<input type="text" placeholder="提示框内容" v-model="tMsg" class="toast-input">			
			</div>
		</div>

		<div class="ask-flex-box">
			<div class="ask-flex-1">
				<ask-button class="open-btn" @ask-click="ordinary" :text="'触发toast'"></ask-button>
			</div>
		</div>
	</div>
</template>
<script>
import { askDialogToast } from '@/utils/ask.dialog.js';
export default {
	data(){
		return{
			tMsg:'toast',
			tPosition:'top-center',
			tClass:'',
			selectTime:3000
		}
	},
	created(){
	},
	computed:{
		tTime(){
			return this.selectTime;
		},
		showCode(){
			return `
			<pre>
				<code class="javascript">
					import { askDialogToast } from '@/utils/ask.dialog.js';
					askDialogToast({
						msg:'${this.tMsg}',
						time:${this.tTime},
						position:'${this.tPosition}',
						class:'${this.tClass}'
					}).then(success=>{
						//do somting
					},error=>{
						//do somting
					})
				</code>
			</pre>`
		}
	},
	methods: {
		choseColor(e){
			e.classList.add('active');
			this.siblings(e).map(index=>{
				index.classList.remove('active');
			})
			if(e.classList.item(2) === 'default') this.tClass = '';
			else this.tClass = e.classList.item(2);
		},
		chosePosition(e,type){
			e.classList.add('active');
			this.siblings(e).map(index=>{
				index.classList.remove('active');
			})
			this.tPosition = type;
		},
		ordinary() {
			askDialogToast({
				msg:this.tMsg,
				time:this.tTime,
				position:this.tPosition,
				class:this.tClass
			}).then(success=>{
				//do somting
			},error=>{
				//do somting
			})
		},
		siblings(elem) {
			let matched = [];
			let n = ( elem.parentNode || {} ).firstChild;
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}
			return matched;
		}
	}
}

</script>
<style lang="scss">
	
	.ask-flex-2.toast {
		-webkit-align-self: stretch;
		-ms-flex-item-align: stretch;
		-ms-grid-row-align: stretch;
		align-self: stretch;
	}

	.toast-box {
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

	.toast-select {
		font-size: 1.8rem;
		width: 100%;
		max-width: 500px;
		height: 40px;
		cursor: pointer;
		color: #474443;
		outline: none;
	}

	.toast-input {
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
</style>