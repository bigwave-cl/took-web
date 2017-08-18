<template>
	<div class="home">
		<template v-if="1">
			我是首页1
		</template>
		<template v-else>
			我是首页2
		</template>
		<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
		<label for="jack">Jack</label>
		<input type="checkbox" id="john" value="John" v-model="checkedNames">
		<label for="john">John</label>
		<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
		<label for="mike">Mike</label>
		<br>
		<span>Checked names: {{ checkedNames }}</span>
		<div id="example-5">
		  <select v-model="selected">
		    <option disabled value="">请选择</option>
		    <option>A</option>
		    <option>B</option>
		    <option>C</option>
		  </select>
		  <span>Selected: {{ selected }}</span>
		</div>

		<input
		  type="checkbox"
		  v-model="toggle"
		  v-bind:true-value="'1'"
		  v-bind:false-value="'2'"
		>{{toggle}}

		<div id="message_t">异步数据处理{{message}}</div>
		<ask-button :text="'触发confirm'" @ask-click="open"></ask-button>
	</div>
</template>
<script>
	import askInterface from '@/services';
	import { askDialogConfirm } from '@/utils/ask.dialog.js';
	export default{
		data() {
			return {
				checkedNames:[],
				selected:'',
				toggle:'',
				message:'没有更新'
			}
		},
		mounted(){
			askInterface.home().then(res=>{
				console.log(res);
			},res=>{
				console.log(res);
			})
			let vm = this;
			vm.message = '更新完成';
			console.log(vm.$el.querySelector('#message_t').textContent);
			vm.$nextTick(function(){
				console.log(vm.$el.querySelector('#message_t').textContent);
			})
		},
		methods:{
			open(){
				askDialogConfirm({
					title:'信息',
					msg:'你是不是认为我是最帅的弹框呢？'
				},(vm)=>{
					console.log('真有品位');
					askDialogConfirm({
						title:'真的很不错',
						msg:'想继续深入吗？',
						closeIcon: true,
						shadeClick: false
					},()=>{
						
						askDialogConfirm({
							title:'来吧',
							msg:'想继续深入吗？',
							closeIcon: true,
							shadeClick: false
						},()=>{
							console.log('没有啦')
						},()=>{
							console.log('没有恒心')
						})
					},()=>{
						console.log('没有恒心')
					})
				},()=>{
					console.log('哼哼')
				},()=>{
					console.log('关我干嘛')
				});
			}
		}
	}
</script>