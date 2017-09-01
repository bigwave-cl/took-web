<template>
	<div class="luck-code-box">
		<div class="luck-code-header">
			<h3>
				<span v-if="item.experience">剩余体验次数</span>
				<span v-else>您共有抽奖机会</span>
				:{{item.chance}}次
			</h3>
			<a href="javascript:void(0);" @click="rule">如何获得或增加抽奖机会？</a>
		</div>
		<p v-if="item.luckyEnvoyState">恭喜您被选为“幸运大使”,请您</p>
		<p v-if="item.luckyEnvoyState">在开奖时来抽取幸运数字，开出本期的大奖</p>
		<div class="luck-code-body">
			<div class="img-box">
				<img src="../../assets/luck-draw/picture_gift.png">
			</div>
			<div class="luck-number" v-if="item.codes.length > 0">
				<div class="text large">您参与抽奖的号码为</div>
				<div class="number-box" v-for="(once,$i) in item.codes" :key="$i">
					<span v-for="(c,$j) in once" :key="$j" 
						v-text="$i == item.codes.length-1 && $j == once.length-1? c.code:c.code+'、'">
					</span>
				</div>
			</div>
			<div class="text small">提前来抽奖中心，就不怕错过大奖！</div>
		</div>
	</div>
</template>
<style src="./luck-code.scss" lang="scss"></style>
<script>
import askInterface from '@/services';
import {
	askDialogAlert,
	sessionStorage
} from '@/utils';

export default {
	data() {
		return {
			item: {
				chance: 0, //剩余机会
				experience: false, //是否体验者
				codes: [], //兑换码
				luckyEnvoyState: false, //true代表幸运大使
			}
		}
	},
	created() {
		let self = this;
		askInterface.luckCode().then(res => {
			let luckRes = res.data;

			self.item.chance = luckRes.times;
			self.item.experience = luckRes.is_try;
			self.item.luckyEnvoyState = luckRes.is_lucky;
			self.item.codes = self.hadlerCode(luckRes.codes);

			self.item.price = luckRes.order_min_yb;
		})
	},
	methods: {
		rule() {
			let self = this;

			let alertContent = `
				<div class="rule-body">
					<p>
						您在抽奖活动所属商家购买商品，单笔订单的金额达到${self.item.price}元，增加一次抽奖机会，即可多获得一个抽奖号码，参与抽奖次数无上限，若在领号时间结束后，新增加的抽奖次数将在下一次的抽奖活动中生效，本期活动不增加。
					</p>
				</div>
			`;
			self.$nextTick(() => {
				askDialogAlert({
					title: '如何获得或增加抽奖机会？',
					msg: alertContent,
					btnText: '我知道了',
					class: 'luck-rule-box',
					closeIcon: false,
					closeBtn: true,
					shade: true,
					shadeClick: true
				}, (ok) => {
					ok.close();
				})
			})
		},
		hadlerCode(codes){
			//为了兼容低配手机不支持flex-flow的wrap特性
			let l = codes.length,
				_c = [],
				standard = 3;
				console.log(l);
			for(let i = 0; i<l;i+=standard){
				let _cur = [];
				if(codes[i]) _cur.push(codes[i]);
				if(codes[i+1]) _cur.push(codes[i+1]);
				if(codes[i+2]) _cur.push(codes[i+2]);

				_c.push(_cur);
			}
			return _c;
		}
	}
}

</script>
