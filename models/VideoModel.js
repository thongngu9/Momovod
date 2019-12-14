var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
	_id: Number,
	key: String,
	title: String,
	titleurl: String,
	url: String,
	image: String,
	format: String,
	like: Number,
	unlike: Number,
	description: String,
	cast: Array,
	manager: Array,
	released: String,
	area: String,
	idcategory: Number,
	category: String,
	chanel: Array,
	data: String,
	idtype: Number,
	status: Number,
	create: Date,
	update: Date
});

module.exports = mongoose.model('video', VideoSchema);