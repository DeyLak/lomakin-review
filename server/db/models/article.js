var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// incialice db
var schemaArticle = new Schema({
	updateDate: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	nameId: {
		type: Number,
		required: true
	},
	name: String,
	fullTime: String,

	article: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	boxes: {
		type: Number,
		required: true
	},
	inBox: {
		type: Number,
		required: true
	},
	plusBox: Number,
	rateWeekday: {
		type: Number,
		required: true
	},
	rateWeekend: {
		type: Number,
		required: true
	},
});

schemaArticle.methods.meow = function() {
	console.log(this.get('name'));
}

exports.Article = mongoose.model('Article', schemaArticle);
