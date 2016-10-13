var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// incialice db
var schemaArticleData = new Schema({
	article: {
		type: String,
		required: true
	},
	// time: [Number],
	// amount: [Number],
	// boxes: [Number],
	inBox: {
		type: [Number],
		required: true
	},
	count: {
		type: Number,
		required: true
	},
});

schemaArticleData.methods.meow = function() {
  console.log(this.get('article'));
}

exports.schemaArticleData = mongoose.model('ArticleData', schemaArticleData);
