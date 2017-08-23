<template>
	<div class="luck-detail-box">
		<h4>本期开奖金额</h4>
		<h2><em>50,000.00</em>云积分</h2>
		<div class="space-box open-prize-num">
			<p>
				<i class="iconfont icon-participatio"></i>共
				<em>12</em>人参与
			</p>
		</div>
		<ul class="lucky-list">
			<li v-for="(envoy,$i) in item.list" :key="$i" class="lucky-li">
				<div class="text prize-integral">
					<h5>{{envoy.name}}:</h5><span>{{envoy.integral}}云积分</span>
				</div>
				<div class="text people">
					共{{envoy.people}}名
				</div>
			</li>
		</ul>
		<ask-button v-if="state === btnRef.DISABLED" disabled class="state-btn" :text="'领号结束'"></ask-button>
		<router-link v-else to="luck-code">
			<ask-button class="state-btn" :text="state === btnRef.MYSELF ? '我的兑奖号':'领取兑奖号'"></ask-button>
		</router-link>
	</div>
</template>
<style src="./luck-detail.scss" lang="scss"></style>
<script>
import askInterface from '@/services';
import { askDialogAlert,askDialogToast } from '@/utils/ask.dialog.js';
import { refreshTitle } from '@/utils/refresh.title.js';
export default {
	data() {
		return {
			btnRef:{
				MYSELF:2, //我的兑奖号
				RECEIVE:1, //领取兑奖号
				DISABLED:0 //领号结束
			},
			state: 0,
			item: {
				prizeIntegral: '',
				joinPeople: 0, //参与人数
				list: [], //中奖情况
			}
		}
	},
	created() {
		refreshTitle('奖项详情');
		if(this.$route.query.state != undefined){
			this.state = parseInt(this.$route.query.state,10);
		}
		this.$nextTick(() => {
			document.body.classList.add('luck');
		})
		this.initDetail();
	},
	destroyed() {
		document.body.classList.remove('luck');
	},
	methods:{
		async initDetail() {
			let self = this;
			let detail = await askInterface.luckDetail();
			let luckRes = detail.data;
			if(!luckRes.ok) {
				askDialogToast({ msg: luckRes.error ? luckRes.error:'接口访问失败', class: 'danger' });
				return;
			}
			self.item.prizeIntegral = luckRes.open_yb;
			self.item.joinPeople = luckRes.join_num;
			self.item.list = luckRes.prizes.map(index=>{
				let once = { 
						name:'',
						integral:'',
						people:''
					}
				once.name = index.name;
				once.people = index.num;
				once.integral = self.getPrizeIntegral(index.yb);
				return once;
			});
		},
		//过滤积分展示为1,000,000.00这种形式
		getPrizeIntegral(num) {
			var num = (num || 0).toString().replace(/\,/g, "").split('\.'),
				result = '';
			while (num[0].length > 3) {
				result = ',' + num[0].slice(-3) + result;
				num[0] = num[0].slice(0, num[0].length - 3);
			}
			if (num[0]) { result = num[0] + result; }
			if (num.length > 1) result += '.' + num[1];
			return result;
		}
	}
}

</script>
