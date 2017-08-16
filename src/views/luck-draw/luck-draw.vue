<template>
	<div class="luck-draw-box">
		<swiper class="luck-draw-swiper" :options="swiperOption">
			<swiper-slide v-for="(s,$i) in luckSwiper" :key="$i">
				<a :href="s.link" :title="s.name">
					<div class="luck-draw-swiper-slide">
						<img :src="s.pic">
					</div>
				</a>
			</swiper-slide>
			<div class="swiper-pagination luck-draw" slot="pagination"></div>
		</swiper>
		<section>
			<div v-if="luckItem.state !== 3">
				<h4>本期开奖金额</h4>
				<h2><em>{{luckItem.prizeIntegral}}</em>云积分</h2>
				<h5>幸运大使<i class="iconfont icon-help"></i></h5>
				<ul class="lucky-list">
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
			<div class="open-prize" v-if="luckItem.state === 3">
				<h2><em>{{luckItem.currentPrize.name}}：</em><em>{{luckItem.currentPrize.yb}}</em>云积分</h2>
				<h5>中奖号码</h5>
				<h2><em>{{luckItem.currentPrize.codes}}</em></h2>
			</div>

			<p class="single-p" v-html="luckItem.timeText"></p>
			<p class="single-p" v-if="luckItem.state !== 2 && luckItem.state !== 3">
				<i class="iconfont icon-chance"></i>
				<span v-if="luckItem.experience">剩余体验次数</span>
				<span v-else>您共有兑奖机会</span>
				<em>{{luckItem.chance}}</em>次
				<i class="iconfont icon-help"></i>
			</p>
			<div class="space-box">
				<p>
					<i class="iconfont icon-participatio"></i>共
					<em>{{luckItem.joinPeople}}</em>人参与
				</p>
				<a :href="luckItem.urls.detail" title="奖项详情">
					<ask-button class="space-btn" :text="'奖项详情'"></ask-button>
				</a>
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
						:disabled="(luckItem.state === 2 || luckItem.state === 3) && !luckItem.receiveState" 
						:text="mainButtonText" 
						@ask-click="handlerMainButtonClick($event)">
			</ask-button>
		</section>
	</div>
</template>
<style src="./luck-draw.scss" lang="scss"></style>
<script>
// import { luckInitDataInterface,luckSwiperDataInterface } from '@/services';
import { luckInitDataInterface,luckSwiperDataInterface } from '@/services/local.js';
import { askDialogAlert,askDialogToast } from '@/utils/ask.dialog.js';

let LUCK_COUNT_DOWN = null, //倒计时索引
	LUCK_REQUEST_AGAIN = true, //是否重新请求接口
	LUCK_REQUEST_AGAIN_TIMER = true; //是否重新请求接口倒计时索引
export default {
	data() {
		return {
			swiperOption: {
				notNextTick: true,
				initialSlide: 0,
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				direction: 'horizontal',
				grabCursor: true,
				setWrapperSize: true,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				mousewheelControl: true,
				observeParents: true,
				loop: true,
				onTransitionStart(swiper) {},
			},
			luckSwiper:[],
			mainButtonText: '领取兑奖号',
			luckItem: {
				state: 0,//开奖状态
				prizeIntegral: 0, //开奖积分
				luckEnvoy: [], //幸运大使
				chance: 0, //剩余机会
				joinPeople: 0, //参与人数
				experience: false, //是否体验者
				timeText: '', //倒计时文本内容
				urls: {			//三个按钮的跳转路径
					detail: '',
					rule: '',
					record: ''
				},
				receiveState: false, //true代表已领号，false代表未领号
				receiveBegin: null,//开始领号时间
				receiveEnd: null, //结束领号时间,
				currentPrize: {}, //当前开奖信息
			}
		}
	},
	computed: {},
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
	mounted() {
		let self = this;
		self.getLuckDrawInterface();
		luckSwiperDataInterface().then(res=>{
			let luckRes = res.data;
			self.luckSwiper = luckRes.list;
		});
	},
	methods: {
		//数据初始化
		getLuckDrawInterface() {
			let self = this;
			luckInitDataInterface().then(res => {
				console.log(res.data);
				let luckRes = res.data;
				// begin
				// 1、第一次进入并且state为0
				// 传入领号开始时间
				// 时间倒计时结束请求接口
				// 2、获得state为1 表示开始领号
				// 传入领号结束时间
				// 时间倒计时结束请求接口
				// 3、获得state为2 表示领号结束
				// 传入开奖时间
				// 时间倒计时结束请求接口
				// 4、获得state为3 表示开始开奖
				// 传入当前奖项开启剩余时间
				// 时间倒计时结束请求接口
				// 如果有剩余奖项开启时间则进行重复执行第4步
				// 5、获得state为4 表示开奖结束
				// end
				// 
				self.luckItem.state = luckRes.lot.state;
				if(luckRes.lot.state === 0){
					self.luckItem.prizeIntegral = self.getPrizeIntegral(luckRes.lot.open_yb);

					self.luckItem.luckEnvoy = self.getLuckEnvoy(luckRes.lot.luck_user);

					self.luckItem.chance = luckRes.lot.times;
					self.luckItem.joinPeople = luckRes.lot.join_num;
					self.luckItem.experience = luckRes.lot.is_try;

					self.luckItem.urls.detail = luckRes.lot.detail;
					self.luckItem.urls.rule = luckRes.lot.rule_url;
					self.luckItem.urls.record = luckRes.lot.records;

					self.luckItem.receiveBegin = luckRes.lot.get_code_begin;

					self.luckCountDown(luckRes.lot.open_time);
					self.requestAgainCountDown(luckRes.lot.get_code_begin);
				}
				if(luckRes.lot.state === 1){
					self.luckItem.prizeIntegral = self.getPrizeIntegral(luckRes.lot.open_yb);

					self.luckItem.luckEnvoy = self.getLuckEnvoy(luckRes.lot.luck_user);

					self.luckItem.chance = luckRes.lot.times;
					self.luckItem.joinPeople = luckRes.lot.join_num;
					self.luckItem.experience = luckRes.lot.is_try;

					self.luckItem.urls.detail = luckRes.lot.detail;
					self.luckItem.urls.rule = luckRes.lot.rule_url;
					self.luckItem.urls.record = luckRes.lot.records;

					self.luckItem.receiveState = luckRes.lot.has_get_code;
					self.mainButtonText = !luckRes.lot.has_get_code ? '领取兑奖号':'我的兑奖号';

					self.luckCountDown(luckRes.lot.open_time);
					self.requestAgainCountDown(luckRes.lot.get_code_end);
				}
				if(luckRes.lot.state === 2){
					//抽奖次数隐藏
					self.luckItem.prizeIntegral = self.getPrizeIntegral(luckRes.lot.open_yb);

					self.luckItem.luckEnvoy = self.getLuckEnvoy(luckRes.lot.luck_user);

					self.luckItem.chance = luckRes.lot.times;
					self.luckItem.joinPeople = luckRes.lot.join_num;
					self.luckItem.experience = luckRes.lot.is_try;

					self.luckItem.urls.detail = luckRes.lot.detail;
					self.luckItem.urls.rule = luckRes.lot.rule_url;
					self.luckItem.urls.record = luckRes.lot.records;

					self.luckItem.receiveState = luckRes.lot.has_get_code;
					self.mainButtonText = !luckRes.lot.has_get_code ? '领取兑奖号':'我的兑奖号';

					self.luckCountDown(luckRes.lot.open_time);
					self.requestAgainCountDown(luckRes.lot.open_time);
				}
				if(luckRes.lot.state === 3){
					//执行开奖操作
					
					self.luckItem.urls.detail = luckRes.lot.detail;
					self.luckItem.urls.rule = luckRes.lot.rule_url;
					self.luckItem.urls.record = luckRes.lot.records;

					self.luckItem.receiveState = luckRes.lot.has_get_code;
					self.mainButtonText = !luckRes.lot.has_get_code ? '领取兑奖号':'我的兑奖号';
					self.mainButtonText = (luckRes.lot.cur_prize_lev == 1 && luckRes.lot.is_lucky) ? '幸运大使抽号':self.mainButtonText;

					self.luckItem.currentPrize = luckRes.lot.prizes.filter(index=>{
						return index.lev == luckRes.lot.cur_prize_lev;
					})[0];

					if(self.luckItem.currentPrize.codes == ''){
						self.luckItem.timeText = "奖项已完成";
					}else{
						self.luckCountDown(self.luckItem.currentPrize.open_time);
						self.requestAgainCountDown(self.luckItem.currentPrize.open_time);
					}
				}
				if(luckRes.lot.state === 4){
					self.luckItem.urls.detail = luckRes.lot.detail;
					self.luckItem.urls.rule = luckRes.lot.rule_url;
					self.luckItem.urls.record = luckRes.lot.records;
				}
			})
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
		},
		//兼容state为0的时候幸运大使没有图片路径的情况
		getLuckEnvoy(items) {
			items = items.map(index => {
				if (!index.thumb_pic) {
					index.thumb_pic == '';
				}
				return index;
			})
			return items;
		},
		//根据传递过来的time倒计时结束后重新初始化数据
		requestAgainCountDown(time){
			let self = this;
			let difference = self.getDifference(time);
			console.log(difference);
			console.log(self.handlerCountTime(difference))

			console.log(Math.floor(difference / 1000));

			if (LUCK_REQUEST_AGAIN_TIMER) clearTimeout(LUCK_REQUEST_AGAIN_TIMER);

			if (Math.floor(difference / 1000) < -1) {
				LUCK_REQUEST_AGAIN = true;
				LUCK_REQUEST_AGAIN_TIMER = null;
				return;
			};
			if (Math.floor(difference / 1000) == -1 && LUCK_REQUEST_AGAIN) {
				self.getLuckDrawInterface();
				LUCK_REQUEST_AGAIN = false;
				return;
			};

			console.log('====================================');
			LUCK_REQUEST_AGAIN_TIMER = setTimeout(() => {
				self.requestAgainCountDown(time);
			}, 1000);
		},
		//开奖剩余时间倒计时
		luckCountDown(time) {
			let self = this;
			let difference = self.getDifference(time);

			let cur = self.handlerCountTime(difference);

			self.luckItem.timeText = `
					<i class="iconfont icon-time"></i>
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
		getDifference(time){
			let _time = time * 1000, //传过来的时间戳是从秒获取的，转换成毫秒
				curTime = Date.now();
			let difference = _time - curTime;
			return difference;
		},
		//根据difference计算时间
		handlerCountTime(difference) {
			let self = this;
			let curDay = self.handlerLessTen(Math.floor(difference / (1000 * 60 * 60 * 24))),
				curHours = self.handlerLessTen(Math.floor(difference / (1000 * 60 * 60) % 24)),
				curMinutes = self.handlerLessTen(Math.floor(difference / (1000 * 60) % 60)),
				curSeconds = self.handlerLessTen(Math.floor(difference / (1000) % 60));
			return {
				d: curDay,
				h: curHours,
				m: curMinutes,
				s: curSeconds
			}
		},
		//处理小于10的数字
		handlerLessTen(num) {
			return num < 10 ? '0' + num : num;
		},
		//主按钮点击事件处理
		handlerMainButtonClick(event){
			let self = this;
			switch (self.luckItem.state){
				case 0:
					self.whileStateZero();
					break;
				case 1:
					self.whileStateOne();
					break;
				case 2:
					self.whileStateTwo();
					break;
				case 3: 
					self.whileStateThree();
					break;
				case 4:
					self.whileStateFour();
				default:
					console.log(self.luckItem.state);
			}
		},
		//state===0的时候执行的函数
		whileStateZero(){
			let self = this;
			let difference = self.getDifference(self.luckItem.receiveBegin);
			let cur = self.handlerCountTime(difference);

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

			}, (close) => {
			})
		},
		whileStateOne(){
			let self = this;
			if(self.luckItem.receiveState){
				askDialogToast({msg:'您已领号',class:'success'});
			}else{
				askDialogToast({msg:'正在领号',class:'success'});
			}
		},
		whileStateTwo(){
			this.whileStateOne();
		},
		whileStateThree(){
			askDialogToast({msg:'正在抽取幸运号码',class:'success'});
		},
		whileStateFour(){
			askDialogToast({msg:'往期开奖记录',class:'success'});
		}
	}
}

</script>
