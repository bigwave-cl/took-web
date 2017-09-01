<template>
	<div class="ask-lottery-animation-box">
		<div class="lottery-pic-bg">
			<div class="lottery-body">
				<div class="lottery-group" v-for="(i,$i) in lottery" :key="$i">
					<div class="number-box" :data-type="$i">
						<ul>
							<li>0</li>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
							<li>9</li>
						</ul>
						<ul>
							<li>0</li>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
							<li>9</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="lottery-voice">
				<ask-button class="lottery-play" @ask-click="handlerVoiceButton($event)"></ask-button>
			</div>
		</div>
	</div>
</template>
<style src="./ask-lottery-animation.scss" lang="scss"></style>
<script>
import { lotteryKeyframes } from './lottery.keyfrmaes.js';
import { lotteryVoice } from './lottery.voice.js';
import bgm from '@/assets/luck_bgm.mp3'
let ANIMATION_END = false;
export default {
	props: {
		lottery: {
			type: Array,
			default: function() {
				return [0, 0, 0, 0];
			}
		},
		winnings: {
			type: String,
			default: '0000',
		}
	},
	data() {
		return {
			letteryRef: [],
			voiceEl: null
		}
	},
	mounted() {
		ANIMATION_END = false;
		this.voiceEl = lotteryVoice('.lottery-play',bgm);
		this.initRef();
		this.lottertStart();
	},
	destroyed() {
		this.$nextTick(function() {
			this.voiceEl.remove();
		})
	},
	methods: {
		handlerVoiceButton(el){
			if(ANIMATION_END) return;
			this.voiceControll(el);
		},
		voiceControll(el){
			if(!this.voiceEl) return;
			if(!ANIMATION_END && el.classList.contains('pause')){
				el.classList.remove('pause');
				this.voiceEl.play();
			}else{
				this.voiceEl.pause();
				el.classList.add('pause');
			}
		},
		initRef() {
			if (this.winnings.length < 4) return;
			for (let i = 0; i < this.winnings.length; i++) {
				let cur = {
					value: this.winnings.charAt(i),
					state: this.getStateRef(this.lottery[i])
				};

				this.letteryRef.push(cur);
			}
		},
		getStateRef(val) {
			let _state = '';
			switch (val) {
				case 0:
					_state = 'START'
					break;
				case 1:
					_state = 'END'
					break;
				case 2:
					_state = 'OVER'
					break;
				default:
					_state = 'START'
			}
			return _state;
		},
		updateState() {
			let self = this;
			self.lottery.map((key, index) => {
				if (key === 1 && self.letteryRef[index].state === 'START') {
					self.letteryRef[index].state = self.getStateRef(key);
				}
			})
		},
		isOver() {
			let self = this;
			let result = self.lottery.filter(index => index == 1);
			if (result.length === self.lottery.length) return true;
			return false;
		},
		lottertStart() {
			if(this.isOver()) {
				this.lottertProcess();
				return ;
			}

			let numberEl = this.$el.querySelectorAll('.lottery-group');
			let numberElArray = Array.prototype.slice.call(numberEl);
			numberElArray.map(index => {
				lotteryKeyframes(index.querySelector('.number-box'), 'run');
			})
		},
		lottertProcess() {
			/*
			抽奖结果更新
			更新结果包含以前更新过马上需要更新的
			以前更新的不管
			现在更新的马上执行end
			 */
			let self = this;
			let numberEl = self.$el.querySelectorAll('.lottery-group');
			let numberElArray = Array.prototype.slice.call(numberEl);
			self.updateState();
			numberElArray.map(index => {
				let cur = index.querySelector('.number-box');
				let _lindex = cur.getAttribute('data-type');
				if (self.letteryRef[_lindex].state === 'END') {
					lotteryKeyframes(cur, 'end', self.letteryRef[_lindex].value, () => {
						self.letteryRef[_lindex].state = self.getStateRef(2);
						self.animationOver();
					});
				}
			})
		},
		lottertEnd() {
			ANIMATION_END = true;
			this.voiceControll(this.$el.querySelector('.lottery-play'));
			this.$emit('callback');
		},
		animationOver() {
			let self = this;
			let result = self.letteryRef.filter(index => index.state === self.getStateRef(2));
			if (result.length === self.letteryRef.length) {
				self.lottertEnd();
			}
		}
	},
	watch: {
		'lottery': {
			handler: function(n, o) {
				this.lottertProcess();
			},
			deep: true
		}
	}
}

</script>
