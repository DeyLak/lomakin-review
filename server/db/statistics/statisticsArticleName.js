// Load the core build.
var _ = require('lodash/core');

module.exports.articleNameToArray = function articleNameToArray(articleName) {
	return _.map(articleName, 'name');
	// return _.map(articleName, function(item) {
	// 	return {
	// 		name: item.name,
	// 		rateWeekday: item.rateWeekday,
	// 		rateWeekend: item.rateWeekend,
	// 	}
	// });
}

module.exports.articleDataToArray = function articleDataToArray(articleData) {
	return _.map(articleData, 'article');
}
