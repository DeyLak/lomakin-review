const areIntlLocalesSupported = require('intl-locales-supported');

let timeOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timezone: 'UTC'
}

function reverseDate(string) {
	let dateItems = string.split('.');
	let res = ''+dateItems[2] + '.' + dateItems[1] + '.' + dateItems[0];
	console.log('===== TIME: reverseDate() ', res);
	return res;
}

// module.exports.getDateFromStringWithParse = function (string) {
// 	let dateItems = string.split('.');
// 	let res = new Date(dateItems[2],(dateItems[1]-1),dateItems[0]).toLocaleString("ru", timeOptions);
// 	console.log('===== TIME: getDateFromStringWithParse() ', res);
// 	return res;
// }

module.exports.getSeconds_split = function (string) {
	let dateItems = string.split('.');
	let date = new Date(dateItems[2],(dateItems[1]-1),dateItems[0]);
	let res = (date.getTime()/(60 * 60 * 24 * 1000));
	console.log('===== TIME: getSeconds_split() ', res);
	return res;
}

module.exports.getDate_string = function () { // +++
	let newDate = new Date();
	console.log('TIME: newDate', newDate);
	let date = (newDate).toLocaleString("ru", timeOptions);
	console.log('TIME: ' + date);

	// TODO: WTF when this code runs from server.js this date have '-'?
	// this might be babel problem?
	let dateItems = date.split('-');
	let res = ''+dateItems[0];
	if( dateItems.length == 3) {
		// fix strange problem with new Date() called from serve.js
		console.log('TIME ', dateItems);
		res = ''+dateItems[2] + '.' + dateItems[1] + '.' + dateItems[0];
	}
	console.log('===== TIME: getDate_string() ', res);
	return res;
}

module.exports.getDate_no_format = function (string) { // +++
	let res = new Date();
	console.log('getDate_no_format: res = new Date()', res);
	if (string !== undefined) {
		let dateItems = string.split('.');
		res = new Date(dateItems[2],(dateItems[1]-1),dateItems[0]);
	}
	console.log('===== TIME: getDate_no_format() / [' + string + ']', res);
	return res;
}

module.exports.getDate_format = function (string) {
	let date;
	if (string === undefined) {
		date = ''+(new Date()).toLocaleString("ru", timeOptions);
	} else {
		// reverseDate(string)
		date = ''+(new Date(string)).toLocaleString("ru", timeOptions);
	}
	let res = date.replace(/-/g, ".");
	console.log('===== TIME: getDate_format() ', res);
	return res; // someTimes it's(/-/g) not working???
}

module.exports.getDate_format_monthDay = function (string, format) {
	let today = new Date();
	if(string == 'first') {
		today.setDate(1);
	} else if(string == 'last'){
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		today = new Date(year, month, 0);
	} else {
		console.log('ERROR: nich-time: getDate_format_monthDay/ STRING ERROR!');
	}
	let date = ''+(today).toLocaleString("ru", timeOptions);
	if (format == 'withoutFormat') {
		date = today;
	}
	let res = date;// = date.replace(/-/g, ".");
	console.log('===== TIME: getDate_format() ', res);
	return res; // someTimes it's(/-/g) not working???
}

module.exports.getDateTimeFormat = function () {
	let DateTimeFormat;
	if (areIntlLocalesSupported(['ru'])) {
		DateTimeFormat = global.Intl.DateTimeFormat;
	} else {
		const IntlPolyfill = require('intl');
		DateTimeFormat = IntlPolyfill.DateTimeFormat;
		require('intl/locale-data/jsonp/ru');
	}
	return DateTimeFormat;
}
