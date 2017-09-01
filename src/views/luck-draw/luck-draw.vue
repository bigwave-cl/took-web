<template>
	<div class="luck-draw-box">
		<ask-swiper class="luck-draw-swiper" :options="swiperOption" :slideData="luckSwiper">
			<ask-slide v-for="(s,$i) in luckSwiper" :key="$i">
				<a :href="s.link" :title="s.name">
					<div class="luck-draw-swiper-slide">
						<img :src="s.pic">
					</div>
				</a>
			</ask-slide>
			<div class="swiper-pagination luck-draw" slot="pagination"></div>
		</ask-swiper>
		<section>
			<!-- 兑奖开始 开始领号 结束领号 -->
			<div v-if="luckItem.state !== luckRef.UNDERWAY">
				<h4 v-text="luckItem.state === luckRef.FINISH ? '上期开奖金额':'本期开奖金额'"></h4>
				<h2><em>{{luckItem.prizeIntegral}}</em>云积分</h2>
				<h1 v-if="luckItem.state === luckRef.FINISH">已结束，等待下次兑奖</h1>
				<h5 v-if="luckItem.state !== luckRef.FINISH">幸运大使<i @click="luckRuleBomb" class="iconfont icon-help"></i></h5>
				<ul v-if="luckItem.state !== luckRef.FINISH" class="lucky-list">
					<li v-for="(envoy,$i) in luckItem.luckEnvoy" :key="$i" class="lucky-li">
						<div class="img-box">
							<img src='../../assets/luck-draw/logo.png' v-if="!envoy.thumb_pic">
							<img :src='envoy.thumb_pic' v-else>
						</div>
						<div class="text">
							{{envoy.name}}
						</div>
					</li>
				</ul>
			</div>
			<!-- 开始开奖（不包含lev==1的奖项） -->
			<div class="open-prize" v-if="luckItem.state === luckRef.UNDERWAY && luckItem.currentPrize.lev != 1">
				<h2><em>{{luckItem.currentPrize.name}}：</em><em>{{luckItem.currentPrize.yb}}</em>云积分</h2>
				<h5>中奖号码</h5>
				<h2><em>{{luckItem.currentPrize.codes}}</em></h2>
			</div>
			<!-- 开始开奖lev==1的奖项 -->
			<div class="open-prize" v-if="luckItem.state === luckRef.UNDERWAY && luckItem.currentPrize.lev == 1">
				<h2><em>{{luckItem.currentPrize.name}}：</em><em>{{luckItem.currentPrize.yb}}</em>云积分</h2>
				<div class="space-box open-prize-num">
					<p>
						<i class="iconfont icon-participatio"></i>共
						<em>{{luckItem.joinPeople}}</em>人参与
					</p>
				</div>
				<ask-lottery-animation  class="luck-draw-lottery" 
										:lottery="luckItem.lastPrize" 
										:winnings="luckItem.currentPrize.codes" 
										@callback="lotteryAnimationEnd"></ask-lottery-animation>
				<div class="lottery-animation-box"></div>
				<h5>中奖号码:<span v-if="luckItem.animationEnd">{{luckItem.currentPrize.codes}}</span></h5>
			</div>
			<!-- 开始开奖lev==1的奖项不展示倒计时文本 -->
			<p class="single-p" v-if="luckItem.state !== luckRef.FINISH && (luckItem.state !== luckRef.UNDERWAY || luckItem.currentPrize.lev != 1)" v-html="luckItem.timeText"></p>
			<!-- 开始开奖和结束领号不展示次数文本 -->
			<p class="single-p" v-if="luckItem.state !== luckRef.FINISH && luckItem.state !== luckRef.UNDERWAY && luckItem.state !== luckRef.RECEIVEING">
				<i class="iconfont icon-chance"></i>
				<span v-if="luckItem.experience">剩余体验次数</span>
				<span v-else>您共有兑奖机会</span>
				<em>{{luckItem.chance}}</em>次
				<i @click="freeRuleBomb" class="iconfont icon-help"></i>
			</p>
			<!-- 开始开奖lev==1的奖项不在这个地方展示参与人数 -->
			<div class="space-box" v-if="(luckItem.state !== luckRef.UNDERWAY || luckItem.currentPrize.lev != 1)">
				<p>
					<i class="iconfont icon-participatio"></i>共
					<em>{{luckItem.joinPeople}}</em>人参与
				</p>

				<router-link to="luck-detail" >
					<ask-button class="space-btn" :text="'奖项详情'"></ask-button>
				</router-link>
				
			</div>
			
			<div class="space-box has-margin">
				<a :href="luckItem.urls.record" title="往期开奖记录">
					<ask-button class="ordinary-btn" :text="'往期开奖记录'"></ask-button>
				</a>
				<a :href="luckItem.urls.rule" title="兑奖规则">
					<ask-button class="ordinary-btn" :text="'兑奖规则'"></ask-button>
				</a>
			</div>
			<ask-button class="play-btn" 
						:disabled="(luckItem.state === luckRef.RECEIVEING || luckItem.state === luckRef.UNDERWAY) && !luckItem.receiveState" 
						:text="mainButtonText" 
						@ask-click="handlerMainButtonClick($event)">
			</ask-button>
		</section>
	</div>
</template>
<style src="./luck-draw.scss" lang="scss">
</style>
<script>
import askInterface from '@/services';
import {
	askDialogModal,
	askDialogAlert,
	askDialogToast,
	sessionStorage,
	amountFormat,
	handlerTimeDifference
} from '@/utils';

//轮播图配置和状态码
import luckDrawRef from './luck-draw-ref.js'
//页面弹框
import luckDrawPopup from './luck-draw-popup.js'
let LUCK_COUNT_DOWN = null, //倒计时索引
	LUCK_REQUEST_AGAIN_TIMER = null; //是否重新请求接口倒计时索引
export default {
	mixins: [luckDrawRef, luckDrawPopup],
	data() {
		return {
			luckSwiper: [],
			mainButtonText: '领取兑奖号',
			luckItem: {
				state: 0, //开奖状态
				prizeIntegral: 0, //开奖积分
				luckEnvoy: [], //幸运大使
				chance: 0, //剩余机会
				joinPeople: 0, //参与人数
				experience: false, //是否体验者
				timeText: '', //倒计时文本内容
				urls: { //三个按钮的跳转路径
					detail: '',
					rule: '',
					record: ''
				},
				receiveState: false, //true代表已领号，false代表未领号
				receiveBegin: null, //开始领号时间
				receiveEnd: null, //结束领号时间,
				luckyEnvoyState: false, //true代表幸运大使
				currentPrize: {}, //当前开奖信息
				lastPrize: [0, 0, 0, 0], //lev==1奖项开启状况
				animationEnd: false //抽奖动画是否完成
			},
			serverDifference: 0, //服务器和本地时间差值
		}
	},
	created() {
		this.$nextTick(() => {
			document.body.classList.add('luck');
		})
	},
	destroyed() {
		document.body.classList.remove('luck');

		if (LUCK_REQUEST_AGAIN_TIMER) clearTimeout(LUCK_REQUEST_AGAIN_TIMER);
		LUCK_REQUEST_AGAIN_TIMER = null;
	},
	async mounted() {
		let self = this;

		await self.getLuckDrawInterface();
		await self.getSwiperPic();
	},
	methods: {
		async getSwiperPic() {
			let self = this;
			let luckSwiperData = await askInterface.luckSwiper();

			let luckRes = luckSwiperData.data;
			if (!luckRes.ok) {
				askDialogToast({ msg: luckRes.error ? luckRes.error : '接口访问失败', class: 'danger' });
				return;
			}
			self.luckSwiper = luckRes.list;
		},
		//数据初始化
		async getLuckDrawInterface() {
			let self = this;
			let luckDraw = await askInterface.luckInit();

			if (!luckDraw.data.ok) {
				askDialogToast({ msg: luckDraw.data.error ? luckDraw.data.error : '接口访问失败', class: 'danger' });
				return;
			}
			self.handlerLuckDraw(luckDraw.data);
		},
		handlerLuckDraw(data) {

			let self = this;
			let luckRes = data,
				sLuckNumber = sessionStorage.getItem('luck_number');
			// 状态
			self.luckItem.state = parseInt(luckRes.lot.state, 10);
			let currTime = Date.now();
			self.serverDifference = luckRes.servertime * 1000 - currTime;

			//积分
			self.luckItem.prizeIntegral = amountFormat(luckRes.lot.open_yb);

			//幸运大使信息列表
			self.luckItem.luckEnvoy = self.getLuckEnvoy(luckRes.lot.luck_user);

			//参与人数
			self.luckItem.joinPeople = luckRes.lot.join_num;

			//次数
			self.luckItem.chance = luckRes.lot.times;

			//体验者
			self.luckItem.experience = luckRes.lot.is_try;

			//三大链接
			self.luckItem.urls.detail = luckRes.lot.detail;
			self.luckItem.urls.rule = luckRes.lot.rule_url;
			self.luckItem.urls.record = luckRes.lot.records;

			self.luckItem.receiveState = luckRes.lot.has_get_code;
			if (luckRes.lot.state === self.luckRef.BEFORE) {

				if (sLuckNumber) sessionStorage.removeItem('luck_number');

				//开始领号时间
				self.luckItem.receiveBegin = luckRes.lot.get_code_begin;

				self.luckCountDown(luckRes.lot.open_time);
				self.requestAgainCountDown(luckRes.lot.get_code_begin);
			}

			if (luckRes.lot.state === self.luckRef.RECEIVE) {

				if (sLuckNumber) sessionStorage.removeItem('luck_number');
				self.mainButtonText = !luckRes.lot.has_get_code ? '领取兑奖号' : '我的兑奖号';

				self.luckCountDown(luckRes.lot.open_time);
				self.requestAgainCountDown(luckRes.lot.get_code_end);
			}
			if (luckRes.lot.state === self.luckRef.RECEIVEING) {
				//抽奖次数隐藏
				if (sLuckNumber) sessionStorage.removeItem('luck_number');
				self.mainButtonText = !luckRes.lot.has_get_code ? '领号结束' : '我的兑奖号';

				self.luckCountDown(luckRes.lot.open_time);
				self.requestAgainCountDown(luckRes.lot.open_time);
			}
			if (luckRes.lot.state === self.luckRef.UNDERWAY) {
				//执行开奖操作
				self.mainButtonText = !luckRes.lot.has_get_code ? '领号结束' : '我的兑奖号';
				if (luckRes.lot.has_get_code) {
					self.mainButtonText = (luckRes.lot.cur_prize_lev == 1 && luckRes.lot.is_lucky) ? '幸运大使抽号' : self.mainButtonText;

				}
				if (sLuckNumber) {
					self.mainButtonText = `您抽的幸运数字:${sLuckNumber}`;
				}
				self.luckItem.luckyEnvoyState = luckRes.lot.is_lucky;

				self.luckItem.currentPrize = luckRes.lot.prizes.filter(index => {
					return index.lev == luckRes.lot.cur_prize_lev;
				})[0];

				self.luckItem.lastPrize = luckRes.lot.lucky_open.map(index => {
					return parseInt(index, 10);
				});

				self.handlerOnLevOne();

				if (luckRes.lot.cur_prize_lev != 1) self.handlerIsWinning();

				if (self.luckItem.currentPrize.codes == '' || luckRes.lot.cur_prize_lev == 1) {
					self.luckItem.timeText = "奖项已全部开启完毕";
				} else {
					self.luckCountDown(self.luckItem.currentPrize.next_open_time);
					self.requestAgainCountDown(self.luckItem.currentPrize.next_open_time);
				}
			}
			if (luckRes.lot.state === self.luckRef.FINISH) {
				self.mainButtonText = '本期中奖记录';
			}
		},
		//兼容state为0的时候幸运大使没有图片路径的情况
		getLuckEnvoy(items) {
			if (!items || items.length === 0) return;
			items = items.map(index => {
				if (!index.thumb_pic) {
					index.thumb_pic == '';
				}
				return index;
			})
			return items;
		},
		//根据传递过来的time倒计时结束后重新初始化数据
		requestAgainCountDown(time) {
			let self = this;
			let difference = self.getDifference(time);

			if (LUCK_REQUEST_AGAIN_TIMER) clearTimeout(LUCK_REQUEST_AGAIN_TIMER);
			if (Math.floor(difference / 1000) < -1) return;
			if (Math.floor(difference / 1000) == -1) {

				self.getLuckDrawInterface();
				LUCK_REQUEST_AGAIN_TIMER = null;
				return;
			};
			LUCK_REQUEST_AGAIN_TIMER = setTimeout(() => {
				self.requestAgainCountDown(time);
			}, 1000);
		},
		//开奖剩余时间倒计时
		luckCountDown(time) {
			let self = this;
			let difference = self.getDifference(time);

			let cur = handlerTimeDifference(difference);

			self.luckItem.timeText = `<i class="iconfont icon-time"></i>
					开奖时间剩余
					${cur.d > 0 ? `<em>${cur.d}</em>天`:''}
					${cur.d > 0 || cur.h > 0 ? `<em>${cur.h}</em>时`:''}
					${cur.d > 0 || cur.h > 0 || cur.m > 0 ? `<em>${cur.m}</em>分`:''}
					<em>${cur.d > 0 || cur.h > 0 || cur.m > 0 || cur.s > 0 ? cur.s:0}</em>秒
				`.trim();
			if (Math.floor(difference / 1000) <= -1) return;

			if (LUCK_COUNT_DOWN) clearTimeout(LUCK_COUNT_DOWN);

			LUCK_COUNT_DOWN = setTimeout(() => {
				self.luckCountDown(time);
			}, 1000);

		},
		//根据传递过来的time计算与当前时间的差值，毫秒
		getDifference(time) {
			let _time = time * 1000, //传过来的时间戳是从秒获取的，转换成毫秒
				curTime = Date.now() + this.serverDifference;
			let delay = 3000;
			curTime -= delay;

			let difference = _time - curTime;
			return difference;
		},
		//主按钮点击事件处理
		handlerMainButtonClick(event) {
			let self = this;
			switch (self.luckItem.state) {
				case self.luckRef.BEFORE:
					self.whileStateZero();
					break;
				case self.luckRef.RECEIVE:
					self.whileStateOne();
					break;
				case self.luckRef.RECEIVEING:
					self.whileStateTwo();
					break;
				case self.luckRef.UNDERWAY:
					self.whileStateThree();
					break;
				case self.luckRef.FINISH:
					self.whileStateFour();
					break;
				default:
					console.log(self.luckItem.state);
			}
		},
		whileStateZero() {
			let self = this;
			let difference = self.getDifference(self.luckItem.receiveBegin);
			let cur = handlerTimeDifference(difference);

			let text = `${cur.d > 0 ? cur.d+'天':''}
						${cur.d > 0 || cur.h > 0 ? cur.h+'时':''}
						${cur.d > 0 || cur.h > 0 || cur.m > 0 ? cur.m+'分':''}
						${cur.d > 0 || cur.h > 0 || cur.m > 0 || cur.s > 0 ? cur.s:0}秒`.trim();

			askDialogAlert({
				title: '',
				msg: `剩余${text}开始领号`,
				btnText: '确定',
				class: 'luck-state-0',
				closeIcon: false,
				shade: true,
				shadeClick: false
			}, (ok) => {
				ok.close();
			})
		},
		whileStateOne() {
			this.warnChanceAlert();
		},
		whileStateTwo() {
			this.whileStateOne();
		},
		whileStateThree() {
			let self = this;
			if (self.luckItem.luckyEnvoyState && self.luckItem.currentPrize.lev == 1) {
				let sLuckNumber = sessionStorage.getItem('luck_number');
				if (sLuckNumber) return;
				askInterface.luckNumber().then(res => {
					let luckRes = res.data;
					if (!luckRes.ok) {
						askDialogToast({ msg: luckRes.error ? luckRes.error : '接口访问失败', class: 'danger' });
						return;
					}
					askDialogModal({
						class: 'luck-number',
						title: '',
						closeIcon: true,
						time: 3000,
						content: `
							<div class="luck-number-body">
								<div class="luck-number-bg">
									<div class="luck-number-result num-${luckRes.num}"></div>
								</div>
							</div>
						`
					}, () => {
						sessionStorage.setItem('luck_number', luckRes.num);
						self.mainButtonText = `您抽的幸运数字:${luckRes.num}`;
					});
				})
			} else {
				self.$router.push({ name: 'luckCode' });
			}
		},
		whileStateFour() {
			window.location.href = this.luckItem.urls.detail;
		},
		//抽奖动画结束回调
		lotteryAnimationEnd() {
			this.luckItem.animationEnd = true;
			this.handlerIsWinning();
		},
		//当lev==1的时候轮询获取抽奖进行状态
		handlerOnLevOne() {
			let self = this;
			if (self.luckItem.currentPrize.lev != 1) return;
			let result = self.luckItem.lastPrize.filter(index => index == 1);
			if (result.length === self.luckItem.lastPrize.length) return;
			let timer = setTimeout(function() {
				clearTimeout(timer);
				self.getLuckDrawInterface();
			}, 5000);
		}
	}
}

</script>
