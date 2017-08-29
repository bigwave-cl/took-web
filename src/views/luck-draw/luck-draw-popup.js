import { 
	askDialogModal, 
	askDialogAlert, 
	askDialogToast 
} from '@/utils';

import winnerNo from '../../assets/luck-draw/picture_failure.png';
import winnerYes from '../../assets/luck-draw/picture_winning.png';
export default{
	methods:{
		warnChanceAlert(){
			let self = this;
			if(self.luckItem.chance){
				self.$router.push({ name: 'luckCode' });
				return;
			}

			let alertContent = `
				您的免费${self.luckItem.experience ? '体验期数':'抽奖机会'}已用完
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
		},
		//处理每轮抽奖弹框提示是否中奖
		handlerIsWinning() {
			let self = this;
			let _winner = self.luckItem.currentPrize.is_winner;

			let alertContent = `
				<div class="winner-header">
					<img src="${_winner ? winnerYes:winnerNo}">
				</div>
				<div class="winner-body ${_winner ? 'yes':''}">
					<h3>${_winner ? '恭喜你中奖啦':'谢谢参与'}</h3>
					<h3>${_winner ? self.luckItem.currentPrize.name+':'+ self.luckItem.currentPrize.yb:'您本轮没有中奖'}</h3>
					<p>
						温馨提示：抽奖机会越多，中大奖几率越高哦，赶快去商家商城购买商品增加抽奖机会吧！
					</p>
				</div>
			`;
			self.$nextTick(()=>{
				let recordV = sessionStorage.getItem(self.luckItem.currentPrize.id);
				if(recordV) return;

				sessionStorage.setItem(self.luckItem.currentPrize.id,true);

				askDialogAlert({
					title: '',
					msg: alertContent,
					btnText: '我知道了',
					class: 'luck-winner-box',
					closeIcon: true,
					closeBtn: _winner,
					shade: true,
					shadeClick: true
				}, (ok) => {
					ok.close();
				})
			})
		},
		//幸运大使弹框
		luckRuleBomb(){
			let self = this;

			let alertContent = `
				<div class="rule-body">
					<p>
						1、领取抽奖号码结束后，系统将随机挑选多位幸运大使。
					</p>
					<p>
						2、多位幸运大使将在开启最终大奖时共同揭晓中奖号码。
					</p>
				</div>
			`;
			self.$nextTick(()=>{
				askDialogAlert({
					title: '什么是幸运大使？',
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
		//体验次数说明弹框
		freeRuleBomb(){
			let self = this;

			let alertContent = `
				<div class="rule-body">
					<p>
						1、为让每个人都有参与抽奖的机会，每个用户拥有共计6期的免费体验机会，每期体验机会仅可获得一个抽奖号码。
					</p>
					<p>
						2、免费体验机会次数不可和普通抽奖机会次数叠加。
					</p>
				</div>
			`;
			self.$nextTick(()=>{
				askDialogAlert({
					title: '什么是免费体验期数？',
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
		}
	}
}