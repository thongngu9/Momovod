var express = require('express');
var router = express.Router();

var async = require('async');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sm = require('sitemap');
var device = require('express-device');

/***Server Socks TW***/
var socks = require('socksv5');
var Client = require('ssh2').Client;
var SocksProxyAgent = require('socks-proxy-agent');
var cloudscraper = require('cloudscraper');
var localPort = 5000;

var ssh_config = {
	host:'118.163.135.17',
	port:22,
	username:'admin',
	password:'admin'
};

socks.createServer((info, accept, deny) => {
	var conn = new Client();
	conn.on('ready',() => {
		conn.forwardOut(info.srcAddr, info.srcPort, info.dstAddr, info.dstPort, (err, stream) => {
			if (err) {
				conn.end();
				return deny();
			}

			var clientSocket;
			if (clientSocket = accept(true)) {
				stream.pipe(clientSocket).pipe(stream).on('close',() => {
					conn.end();
				});
			} else
				conn.end();
		});
	}).on('error',(err) => {
		deny();
	}).connect(ssh_config);
}).listen(localPort, 'localhost',() => {
	console.log('Forwarding connections on ' + localPort);
}).useAuth(socks.auth.None());
/***End Server Socks TW***/

var CategoryModel = require('../models/CategoryModel.js');
var VideoModel = require('../models/VideoModel.js');

var func = require('../functions/handling.js');

router.use(device.capture());

/* GET home page. */
router.get('/', function(req, res, next) {
	var idcate = [12,17,13,16,14,15], idtype = [4,3];
	async.series([
		(callback)=>{CategoryModel.find().limit(4).sort({order:1}).exec(callback);},
		(callback)=>{CategoryModel.findOne({order:1}).exec(callback);},
		(callback)=>{VideoModel.aggregate([{$match:{idcategory:{$in:idcate}}},{$group:{_id:'$idcategory',firstidcate:{$first:'$idcategory'}}},{$lookup:{from:'videos',let:{order_idcate:'$firstidcate'},pipeline:[{$match:{idtype:2,$expr:{$and:[{$eq:['$idcategory','$$order_idcate']}]}}},{$sort:{_id:-1}},{$limit:12}],as:'details'}}]).exec(callback);},
		(callback)=>{VideoModel.aggregate([{$match:{idtype:{$in:idtype}}},{$group:{_id:'$idtype',firstidtype:{$first:'$idtype'}}},{$lookup:{from:'videos',let:{order_idtype:'$firstidtype'},pipeline:[{$match:{$expr:{$and:[{$eq:['$idtype','$$order_idtype']}]}}},{$sort:{_id:-1}},{$limit:12}],as:'details'}}]).exec(callback);}		
	],function(err, results){
		var device = req.device.type;
		var year = new Date().getFullYear();
		var arrtops = [], tops = [];
		var titles = ['大陸劇','韓劇','港劇','台劇','日劇','歐美劇','動漫','綜藝'];
		if (results[2]!=undefined) {
			let dataidcate = results[2];
			idcate.forEach((i)=>{
				let id = i;
				dataidcate.forEach((i)=>{
					if (i._id==id)
						arrtops.push(i);
				});
			});
		}
		if (results[3]!=undefined) {
			let dataidtype = results[3];
			idtype.forEach((i)=>{
				let id = i;
				dataidtype.forEach((i)=>{
					if (i._id==id)
						arrtops.push(i);
				});
			});
		}
		let num = 0;
		arrtops.forEach((i)=>{
			tops.push({id:i._id,title:titles[num],data:i.details});
			num++;
		});
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
			tops:tops
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
			(callback)=>{CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
			(callback)=>{CategoryModel.findOne({_id:cate}).exec(callback);},
			(callback)=>{VideoModel.find({$or:[{idtype:cate},{idcategory:cate}]}).skip((perPage*page)-perPage).limit(perPage).sort({_id : -1}).exec(callback);},
			(callback)=>{VideoModel.find({$or:[{idtype:cate},{idcategory:cate}]}).sort({_id : -1}).exec(callback);}
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
	var idcate = [2,1,4,3,5,6,7,8,9,10,11,12,17,14,16,13,15,24,25,26,27,28,29,30,31,32,33,34,35,36,44,22];
	async.series([
		(callback)=>{VideoModel.aggregate([{$match:{idcategory:{$in:idcate}}},{$group:{_id:'$idcategory',firstidcate:{$first:'$idcategory'}}},{$lookup:{from:'videos',let:{order_idcate:'$firstidcate'},pipeline:[{$match:{$expr:{$and:[{$eq:['$idcategory','$$order_idcate']}]}}},{$sort:{_id:-1}},{$limit:6}],as:'details'}}]).exec(callback);},
		(callback)=>{VideoModel.aggregate([{$match:{idcategory:{$in:idcate}}},{$group:{_id:'$idcategory',firstidcate:{$first:'$idcategory'}}},{$lookup:{from:'videos',let:{order_idcate:'$firstidcate'},pipeline:[{$match:{$expr:{$and:[{$eq:['$idcategory','$$order_idcate']}]}}},{$sort:{_id:-1}},{$skip:6},{$limit:12}],as:'details'}}]).exec(callback);},
		(callback)=>{CategoryModel.find().limit(4).sort({order:1}).exec(callback);}
	],async function(err, results){
		var datas = [];
		var titles = ['連續劇排行榜','電影排行榜','動漫排行榜','綜藝排行榜','動作片排行榜','喜劇片排行榜','愛情片排行榜','科幻片排行榜','恐怖片排行榜','劇情片排行榜','戰爭片排行榜','大陸劇排行榜','韓劇排行榜','日劇排行榜','台劇排行榜','港劇排行榜','歐美劇排行榜','冒險片排行榜','懸疑片排行榜','災難片排行榜','魔幻片排行榜','青春片排行榜','音樂片排行榜','驚悚片排行榜','其他片排行榜','紀錄片排行榜','犯罪片排行榜','奇幻片排行榜','微電影排行榜','動畫片排行榜','海外劇排行榜','其他劇排行榜'];
		let num = 0;
		titles.forEach((i)=>{
			datas.push({id:idcate[num],name:i,datavid:[],datatxt:[]});
			num++;
		});
		if (results[0]!=undefined) {
			let vid = results[0];
			vid.forEach((i)=>{
				let id = i;
				datas.forEach((i)=>{
					if (id._id==i.id)
						i.datavid=id.details;
				});
			});
		}
		if (results[1]!=undefined) {
			let txt = results[1];
			txt.forEach((i)=>{
				let id = i;
				datas.forEach((i)=>{
					if (id._id==i.id)
						i.datatxt=id.details;
				});
			});
		}

		var title = '排行榜 - MoMoVOD-線上視頻網站-海量高清影片影視免費線上看';
		res.render('pages/P01-top',{
			title: 	title,
			cate: 	results[2],
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
			(callback)=>{CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
			(callback)=>{CategoryModel.findOne({$or:[{list:{$elemMatch:{id:cate}}},{_id:cate}]}).sort({'list.order': 1}).exec(callback);},
			(callback)=>{VideoModel.find({$or:[{idtype:cate},{idcategory:cate}],area:{$regex:iarea,$options:'i'},released:{$regex:iyear,$options:'i'}}).skip((perPage*page)-perPage).limit(perPage).sort({_id : -1}).exec(callback);},
			(callback)=>{VideoModel.find({$or:[{idtype:cate},{idcategory:cate}],area:{$regex:iarea,$options:'i'},released:{$regex:iyear,$options:'i'}}).sort({_id : -1}).exec(callback);}
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
			(callback)=>{CategoryModel.find().limit(4).sort({order : 1}).exec(callback);},
			(callback)=>{VideoModel.findOne({key:iid}).exec(callback);}
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
			(callback)=>{CategoryModel.find().limit(4).sort({order:1}).exec(callback);},
			(callback)=>{VideoModel.findOne({key:iid}).exec(callback);}
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
	var proxy = 'socks5://127.0.0.1:5000';
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
