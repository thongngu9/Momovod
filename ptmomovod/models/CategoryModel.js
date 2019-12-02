var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	_id: Number,
	title: String,
	titleurl: String,
	image: Array,
	list: Array,
	des: String,
	order: Number,
	status: Number,
	create: Date,
	update: Date
});

module.exports = mongoose.model('category', CategorySchema);