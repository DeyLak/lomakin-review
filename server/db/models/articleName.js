var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// incialice db
var schemaArticleName = new Schema({
	nameId: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	rateWeekday: {
		type: Number,
		required: true
	},
	rateWeekend: {
		type: Number,
		required: true
	},
	count: {
		type: Number,
		required: true
	},
});

schemaArticleName.methods.meow = function() {
  console.log( this.get('name') + ' / ' + this.get('nameId') );
}

exports.schemaArticleName = mongoose.model('ArticleName', schemaArticleName);
