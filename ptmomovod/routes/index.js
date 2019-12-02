var express = require('express');
var router = express.Router();

var async = require('async');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sm = require('sitemap');
var device = require('express-device');

/***Load IMG***/
var SocksProxyAgent = require('socks-proxy-agent');
var cloudscraper = require('cloudscraper');
/***End Load IMG***/

var CategoryModel = require('../models/CategoryModel.js');
var VideoModel = require('../models/VideoModel.js');

var func = require('../functions/handling.js');

router.use(device.capture());

/* GET home page. */
router.get('/', function(req, res, next) {
	async.series([
		function(callback){CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
		function(callback){CategoryModel.findOne({order:1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:12}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:17}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:13}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:16}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:14}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype:2,idcategory:15}).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idtype: 4}).limit(12).sort({_id : -1}).exec(callback);},
		function(callback){VideoModel.find({idtype: 3}).limit(12).sort({_id : -1}).exec(callback);}
	],function(err, results){
		var device = req.device.type;
		var year = new Date().getFullYear();
		res.render('pages/index',{
			title: 'MoMoVOD-線上視頻網站-海量高清影片影視免費線上看',
			// webdomain: domain,
			// webname: name,
			// description: description,
			// copyright: 'Copyright '+year+' © '+name,
			// footer: footertitle,
			// foot: footer,
			// device: device,
			cate: results[0],
			imgdata: results[1].image,
			top1: results[2],
			top2: results[3],
			top3: results[4],
			top4: results[5],
			top5: results[6],
			top6: results[7],
			top7: results[8],
			top8: results[9]
		});
	});
});

router.get('/vod-type-id-:url*', function(req, res, next) {
	var iid   = func.regex("(\\d{1,2})",req.params.url);
	var ipg   = func.regex("pg-(\\d{1,})",req.params.url);
	if (iid == 'err') {
		res.redirect('/');
	} else {
		var cate  = parseInt(iid);
		var page  = 1;
		var perPage = 36;
		var shorturl;
		if (ipg != 'err') {
			var iurl = func.regex("(\\d{1,2}-pg-\\d{1,})",req.params.url);
			shorturl = func.myireplace(iurl,req.params.url,'');
		} else {
			shorturl = '.html';
		}
		if (ipg != 'err')
			page = parseInt(ipg);
		if (page < 1)
			page = 1;
		async.series([
			function(callback){CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
			function(callback){CategoryModel.findOne({_id:cate}).exec(callback);},
			function(callback){VideoModel.find({$or:[{idtype:cate},{idcategory:cate}]}).skip((perPage*page)-perPage).limit(perPage).sort({_id : -1}).exec(callback);},
			function(callback){VideoModel.find({$or:[{idtype:cate},{idcategory:cate}]}).sort({_id : -1}).exec(callback);}
		],function(err, results){
			var title = results[1].des+' - 第1頁 - 高清影音線上看 - MoMoVOD';
			var banner, menu;
			if (cate == 1) {
				banner 	= {type: 1, data: results[1].image};
				menu 	= {type: 2, data: ''};
			} else if (cate == 2) {
				banner 	= {type: 1, data: results[1].image};
				menu 	= {type: 1, data: ''};
			} else {
				banner 	= {type: 2, data: results[1].image};
				menu 	= {type: 3, data: ''};
			}
			res.render('pages/01-serial',{
				title: 	title,
				active: cate,
				banner: banner,
				cate: 	results[0],
				menu: 	menu,
				data: 	results[2],
				total: 	results[3].length,
				page:   page,
				urltye: 'type',
				pgnate: {idpage:cate, current:page, pages:Math.ceil(results[3].length/perPage), url:shorturl}
			});
		});
	}
});

router.get('/label-top.html', function(req, res, next) {
	async.series([
		function(callback){VideoModel.find({idcategory:2}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:1}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:4}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:3}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:5}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:6}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:7}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:8}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:9}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:10}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:11}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:12}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:17}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:14}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:16}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:13}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:15}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:24}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:25}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:26}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:27}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:28}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:29}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:30}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:31}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:32}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:33}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:34}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:35}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:36}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:44}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:22}).limit(6).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:2}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:1}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:4}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:3}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:5}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:6}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:7}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:8}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:9}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:10}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:11}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:12}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:17}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:14}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:16}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:13}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:15}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:24}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:25}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:26}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:27}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:28}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:29}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:30}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:31}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:32}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:33}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:34}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:35}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:36}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:44}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){VideoModel.find({idcategory:22}).skip(6).limit(12).sort({_id:-1}).exec(callback);},
		function(callback){
			CategoryModel.find().limit(4).sort({order : 1}).exec(callback);
		}
	],async function(err, results){
		var datas = [];
		datas = [{id:2, name:"連續劇排行榜", datavid:results[0], datatxt:results[32]},
		{id:1, name:"電影排行榜", datavid:results[1], datatxt:results[33]},
		{id:4, name:"動漫排行榜", datavid:results[2], datatxt:results[34]},
		{id:3, name:"綜藝排行榜", datavid:results[3], datatxt:results[35]},
		{id:5, name:"動作片排行榜", datavid:results[4], datatxt:results[36]},
		{id:6, name:"喜劇片排行榜", datavid:results[5], datatxt:results[37]},
		{id:7, name:"愛情片排行榜", datavid:results[6], datatxt:results[38]},
		{id:8, name:"科幻片排行榜", datavid:results[7], datatxt:results[39]},
		{id:9, name:"恐怖片排行榜", datavid:results[8], datatxt:results[40]},
		{id:10, name:"劇情片排行榜", datavid:results[9], datatxt:results[41]},
		{id:11, name:"戰爭片排行榜", datavid:results[10], datatxt:results[42]},
		{id:12, name:"大陸劇排行榜", datavid:results[11], datatxt:results[43]},
		{id:17, name:"韓劇排行榜", datavid:results[12], datatxt:results[44]},
		{id:14, name:"日劇排行榜", datavid:results[13], datatxt:results[45]},
		{id:16, name:"台劇排行榜", datavid:results[14], datatxt:results[46]},
		{id:13, name:"港劇排行榜", datavid:results[15], datatxt:results[47]},
		{id:15, name:"歐美劇排行榜", datavid:results[16], datatxt:results[48]},
		{id:24, name:"冒險片排行榜", datavid:results[17], datatxt:results[49]},
		{id:25, name:"懸疑片排行榜", datavid:results[18], datatxt:results[50]},
		{id:26, name:"災難片排行榜", datavid:results[19], datatxt:results[51]},
		{id:27, name:"魔幻片排行榜", datavid:results[20], datatxt:results[52]},
		{id:28, name:"青春片排行榜", datavid:results[21], datatxt:results[53]},
		{id:29, name:"音樂片排行榜", datavid:results[22], datatxt:results[54]},
		{id:30, name:"驚悚片排行榜", datavid:results[23], datatxt:results[55]},
		{id:31, name:"其他片排行榜", datavid:results[24], datatxt:results[56]},
		{id:32, name:"紀錄片排行榜", datavid:results[25], datatxt:results[57]},
		{id:33, name:"犯罪片排行榜", datavid:results[26], datatxt:results[58]},
		{id:34, name:"奇幻片排行榜", datavid:results[27], datatxt:results[59]},
		{id:35, name:"微電影排行榜", datavid:results[28], datatxt:results[60]},
		{id:36, name:"動畫片排行榜", datavid:results[29], datatxt:results[61]},
		{id:44, name:"海外劇排行榜", datavid:results[30], datatxt:results[62]},
		{id:22, name:"其他劇排行榜", datavid:results[31], datatxt:results[63]}];

		var title = '排行榜 - MoMoVOD-線上視頻網站-海量高清影片影視免費線上看';
		res.render('pages/P01-top',{
			title: 	title,
			cate: 	results[64],
			datas: 	datas
		});
	});
});

router.get('/vod-list-id-:url*', function(req, res, next) {
	var iid   = func.regex("(\\d{1,2})",req.params.url);
	var ipg   = func.regex("pg-(\\d*?)-",req.params.url);
	var isort = func.regex("by-([^>]*?)-",req.params.url);
	var iyear = func.regex("year-(\\d*?)-",req.params.url);
	var iarea = func.regex("area-([^>]*?)-",req.params.url);
	if (iid == 'err') {
		res.redirect('/');
	} else {
		var cate  = parseInt(iid);
		var page  = 1;
		var perPage = 36;
		var shorturl;
		if (ipg != 'err') {
			var iurl = func.regex("(\\d{1,2}-pg-\\d*?)-",req.params.url);
			shorturl = func.myireplace(iurl,req.params.url,'');
		} else {
			shorturl = '-order--by--class--year--letter--area--lang-.html';
		}
		if (ipg != 'err')
			page = parseInt(ipg);
		if (page < 1)
			page = 1;
		if (iarea == 'err')
			iarea = '';
		if (iyear == 'err')
			iyear = '';
		if (isort == 'err')
			isort = 'time';
		async.series([
			function(callback){CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
			function(callback){CategoryModel.findOne({$or:[{list:{$elemMatch:{id:cate}}},{_id:cate}]}).sort({'list.order': 1}).exec(callback);},
			function(callback){VideoModel.find({$or:[{idtype:cate},{idcategory:cate}],area:{$regex:iarea,$options:'i'},released:{$regex:iyear,$options:'i'}}).skip((perPage*page)-perPage).limit(perPage).sort({_id : -1}).exec(callback);},
			function(callback){VideoModel.find({$or:[{idtype:cate},{idcategory:cate}],area:{$regex:iarea,$options:'i'},released:{$regex:iyear,$options:'i'}}).sort({_id : -1}).exec(callback);}
		],function(err, results){
			var area = [], anti = [], years = [], sort = [];
			if (results[1] != null) {
				if (results[1]._id == 2) {
					results[1].list.forEach(function(item) {
						anti.push(item.id);
					});
				}
			}
			var checkAnti = anti.indexOf(cate);
			if (checkAnti == -1) {
				area = [{"url":"%E5%A4%A7%E9%99%B8","name":"大陸"},{"url":"%E9%A6%99%E6%B8%AF","name":"香港"},{"url":"%E8%87%BA%E7%81%A3","name":"臺灣"},{"url":"%E6%AD%90%E7%BE%8E","name":"歐美"},{"url":"%E9%9F%93%E5%9C%8B","name":"韓國"},{"url":"%E6%97%A5%E6%9C%AC","name":"日本"},{"url":"%E6%B3%B0%E5%9C%8B","name":"泰國"},{"url":"%E6%96%B0%E5%8A%A0%E5%9D%A1","name":"新加坡"},{"url":"%E9%A6%AC%E4%BE%86%E8%A5%BF%E4%BA%9E","name":"馬來西亞"},{"url":"%E5%8D%B0%E5%BA%A6","name":"印度"},{"url":"%E5%85%B6%E5%AE%83","name":"其它"}];
			}
			var year = new Date().getFullYear();
			for (var i = 0; i <= 14; i++) {
			    years.push(year-i);
			}
			sort = [{"url":"hits","name":"總人氣"},{"url":"monthhits","name":"月人氣"},{"url":"weekhits","name":"週人氣"},{"url":"dayhits","name":"日人氣"}];
			var title, idtype = 0, actname = '';
			if (results[1] != null) {
				if (results[1]._id == cate) {
					actname = results[1].title;
				} else {
					results[1].list.forEach(function(item) {
						if (item.id == cate) {
							actname = item.name;
						}
					});
				}
				title = actname+iyear+iarea+'-第1頁 - 高清影音線上看 - MoMoVOD';
				idtype = results[1]._id;
				var menu = {active:{id:cate, name:actname, area:iarea, year:iyear, sort:isort}, cate:results[1], area:area, year:years, sort:sort};
				res.render('pages/P02-detail',{
					title: 	title,
					active: idtype,
					cate: 	results[0],
					menu: 	menu,
					data: 	results[2],
					total: 	results[3].length,
					page:   page,
					urltye: 'list',
					pgnate: {idpage:cate, current:page, pages:Math.ceil(results[3].length/perPage), url:shorturl}
				});
			} else {
				res.redirect('/');
			}
		});
	}
});

router.get('/vod-detail-id-:url', function(req, res, next) {
	var iid   = func.regex("(\\d{1,})",req.params.url);
	if (iid == 'err') {
		res.redirect('/');
	} else {
		var iurl = func.regex("(\\d{1,})",req.params.url);
		var shorturl = func.myireplace(iurl,req.params.url,'');
		async.series([
			function(callback){
				CategoryModel.find().limit(4).sort({order : 1}).exec(callback);
			},
			function(callback){
				VideoModel.findOne({key:iid}).exec(callback);
			}
		],function(err, results){
			var title = results[1].title+' - '+results[1].category+' - 高清影音線上看 - MoMoVOD';
			res.render('pages/P03-infovid',{
				addstyle: true,
				title: 	title,
				// active: cate,
				// banner: banner,
				cate: 	results[0],
				data: 	{info:results[1]}
			});
		});
	}
});

router.get('/label-new.html', function(req, res, next) {
	res.render('pages/P04-new', { title: 'Express' });
});

router.get('/vod-play-id-:url', function(req, res, next) {
	var iid = func.regex("(\\d{1,})",req.params.url);
	var sev = func.regex("src-(\\d{1,})",req.params.url);
	var epi = func.regex("num-(\\d{1,})",req.params.url);
	if (iid == 'err' || sev == 'err' || epi == 'err') {
		res.redirect('/');
	} else {
		async.series([
			function(callback){CategoryModel.find().limit(4).sort({order:1}).exec(callback);},
			function(callback){VideoModel.findOne({key:iid}).exec(callback);}
		],function(err, results){
			var checksev = results[1].chanel[parseInt(sev)-1];
			if (checksev == undefined) {
				res.redirect('/');
			} else {
				var numepi = results[1].chanel[parseInt(sev)-1].server[parseInt(epi)-1];
				if (numepi == undefined) {
					res.redirect('/');
				} else {
					var datavid = unescape(results[1].data);
					var filevid = func.regex(numepi+".(http.*?.m3u8)",datavid);
					var title = results[1].title+numepi+' '+results[1].category+' 高清影音線上看 - MoMoVOD';
					res.render('pages/P05-video',{
						addstyle: true,
						title: 	title,
						// active: cate,
						// banner: banner,
						cate: 	results[0],
						// data: 	{info:results[1]}
						vid:{sources:[{
							label:numepi,
							type:"hls",
							file:filevid
						}]}
					});
				}
			}
		});
	}
});

router.get("/file/cover/:imageurl*", function(req, res, next){
	var url = req.params.imageurl+req.params[0];
	var proxy = 'socks5://127.0.0.1:1080';
	var agent = new SocksProxyAgent(proxy);
	var options = {
		agent: agent,
		url: url,
		encoding: null
	};

	cloudscraper.get(options)
		.then(function (body) {
			res.set('Content-Type', 'image/png');
			res.send(body);
		})
		.catch(function (err) {
			console.log(err);
		});
});

router.get('/inc/ajax.php*', function(req, res, next) {
	res.send('1489:728');
});

router.get('/code/*', function(req, res, next) {
	res.send('TW');
});

router.get("/*", function(req, res, next){
	res.redirect('/');
});

module.exports = router;
