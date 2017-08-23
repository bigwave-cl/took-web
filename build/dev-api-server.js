var config = require('../config')
var express = require('express')

var port = config.api.port

var app = express()
var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer({ dest: 'uploads/' })
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var luckDraw = require('../static/luck.json');
var swiperData = require('../static/swiper.json');
var luckNumberData = require('../static/luck-number.json');
var luckCodeData = require('../static/luck-code.json');
var luckDetailData = require('../static/luck-detail.json');

var apiRoutes = express.Router();

apiRoutes.post('/luck_draw', function(req, res) {
	var nowTime = Math.floor(Date.now()/1000);
	if(luckDraw.lot.get_code_begin - nowTime <= 0)  luckDraw.lot.state = 1;
	if(luckDraw.lot.get_code_end - nowTime <= 0)  luckDraw.lot.state = 2;
	if(luckDraw.lot.open_time - nowTime <= 0)  luckDraw.lot.state = 3;
	if(luckDraw.lot.state === 3){
		luckDraw.lot.cur_prize_lev = parseInt(luckDraw.lot.cur_prize_lev,10);
		var curPrize = luckDraw.lot.prizes.filter(index=>{
			return index.lev == luckDraw.lot.cur_prize_lev;
		})[0];
		if(curPrize.open_time - nowTime <= 0) luckDraw.lot.cur_prize_lev = Math.max(1,--luckDraw.lot.cur_prize_lev);
		console.log(nowTime - curPrize.open_time);
		if(luckDraw.lot.cur_prize_lev == 1 && nowTime - curPrize.open_time >= 5 ){
			luckDraw.lot.lucky_open[1] = 1;
			luckDraw.lot.lucky_open[2] = 1;
			if(nowTime - curPrize.open_time >= 500) luckDraw.lot.state = 4;
		}

	}
	// luckDraw.lot.state = 2;
	console.log(luckDraw.lot.state);
	res.json(luckDraw);
});
apiRoutes.post('/swiper', function(req, res) {
	res.json(swiperData);
});

apiRoutes.post('/lottery_getLuckyNum', function(req, res) {
	res.json(luckNumberData);
});

apiRoutes.post('/lottery_getCode', function(req, res) {
	res.json(luckCodeData);
});

apiRoutes.post('/lottery_prizeDetail', function(req, res) {
	res.json(luckDetailData);
});

app.use('/api', apiRoutes);

var uri = 'http://localhost:' + port

console.log('> Starting dev server...')
console.log(uri)

app.listen(port)