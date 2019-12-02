var change_alias = function(alias) {
	var str = alias;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str = str.replace(/đ/g,"d");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
	str = str.replace(/ + /g," ");
	str = str.trim(); 
	return str;
}

var regex = function(reg,str) {
	try {
		var re = new RegExp(reg,"i");
		var ql = str.match(re);
		if (ql && ql[1])
			return ql[1];

		return 'err';
	} catch (e) {
		return 'err';
	}
}

var myireplace = function(reg,str,rep) {
	try {
		var re = new RegExp(reg,"i");
		return str.replace(re,rep);
	} catch (e) {
		return 'err';
	}
}

module.exports.change_alias = change_alias;
module.exports.regex = regex;
module.exports.myireplace = myireplace;