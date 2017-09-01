<template>
	<div class="luck-detail-box">
		<h4>本期开奖金额</h4>
		<h2><em>{{item.prizeIntegral}}</em>云积分</h2>
		<div class="space-box open-prize-num">
			<p>
				<i class="iconfont icon-participatio"></i>共
				<em>{{item.joinPeople}}</em>人参与
			</p>
		</div>
		<ul class="lucky-list">
			<li v-for="(envoy,$i) in item.list" :key="$i" class="lucky-li">
				<div class="text prize-integral">
					<h5>{{envoy.name}}:</h5>
					<span>{{envoy.integral}}云积分</span>
				</div>
				<div class="text people">
					共{{envoy.people}}名
				</div>
			</li>
		</ul>
		<ask-button v-if="state === btnRef.BEFORE" disabled class="state-btn" :text="'活动未开始'"></ask-button>
		<ask-button v-if="state === btnRef.RECEIVE" class="state-btn" :text="item.receiveState ? '我的兑奖号':'领取兑奖号'" @ask-click="chanceInter"></ask-button>
		<ask-button v-if="state === btnRef.RECEIVEING" :disabled="!item.receiveState" class="state-btn" :text="item.receiveState ? '我的兑奖号':'领号结束'" @ask-click="chanceInter"></ask-button>
		<ask-button v-if="state === btnRef.UNDERWAY" :disabled="!item.receiveState" class="state-btn" :text="item.receiveState ? '我的兑奖号':'领号结束'" @ask-click="chanceInter"></ask-button>
		<ask-button v-if="state === btnRef.FINISH" disabled class="state-btn" :text="'活动已结束'"></ask-button>
	</div>
</template>
<style src="./luck-detail.scss" lang="scss"></style>
<script>
import askInterface from '@/services';
import {
	askDialogAlert,
	askDialogToast,
	amountFormat
} from '@/utils';

export default {
	data() {
		return {
			btnRef: {
				BEFORE: 0, //活动未开始
				RECEIVE: 1, //开始领取兑奖号
				RECEIVEING: 2, //领取兑奖号
				UNDERWAY: 3, //活动进行中
				FINISH: 4, //活动已结束
			},
			state: 0,
			item: {
				prizeIntegral: '',
				joinPeople: 0, //参与人数
				list: [], //中奖情况
				chance: 0, //抽奖机会
				experience: false, //不是体验者
				receiveState: false, //true代表已领号，false代表未领号
			}
		}
	},
	created() {
		this.$nextTick(() => {
			document.body.classList.add('luck');
		})
		this.initDetail();
	},
	destroyed() {
		document.body.classList.remove('luck');
	},
	methods: {
		async initDetail() {
			let self = this;
			let detail = await askInterface.luckDetail();
			let luckRes = detail.data;
			if (!luckRes.ok) {
				askDialogToast({ msg: luckRes.error ? luckRes.error : '接口访问失败', class: 'danger' });
				return;
			}
			self.item.prizeIntegral = amountFormat(luckRes.open_yb);
			self.item.joinPeople = luckRes.join_num;
			self.item.chance = luckRes.times;
			self.item.experience = luckRes.is_try;
			self.state = parseInt(luckRes.state, 10);
			self.item.receiveState = luckRes.has_get_code;
			self.item.list = luckRes.prizes.map(index => {
				let once = {
					name: '',
					integral: '',
					people: ''
				}
				once.name = index.name;
				once.people = index.num;
				once.integral = amountFormat(index.yb);
				return once;
			});
		},
		chanceInter() {
			let self = this;

			if (self.state !== self.btnRef.RECEIVE &&
				self.state !== self.btnRef.RECEIVEING &&
				self.state !== self.btnRef.UNDERWAY) {
				return;
			}

			if (self.item.receiveState || self.item.chance) {
				self.$router.push({ name: 'luckCode' });
				return;
			}

			let alertContent = `
				您的免费${self.item.experience ? '体验期数':'抽奖机会'}已用完
			`;
			askDialogAlert({
				title: '',
				msg: alertContent,
				btnText: '确定',
				class: 'luck-state-0',
				closeIcon: false,
				shade: true,
				shadeClick: false
			}, (ok) => {
				ok.close();
			})
		}
	}
}

</script>
