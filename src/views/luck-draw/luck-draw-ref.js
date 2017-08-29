export default{
	data() {
		return{
			luckRef : {
				BEFORE: 0,//活动未开始
				RECEIVE: 1, //开始领取兑奖号
				RECEIVEING: 2, //领取兑奖号
				UNDERWAY: 3,//活动进行中
				FINISH: 4,//活动已结束
			},
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
				observer:true,
                observeParents: true,
                loop: true,
                onSlideChangeEnd(swiper){
                	// console.log(swiper.activeIndex)
                	// console.log(swiper.realIndex)
                }
            }
		}
	}
}