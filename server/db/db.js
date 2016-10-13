import config from '../config/index'
import mongoose from 'mongoose'
import {schemaArticle} from './models/article'
import {schemaArticleData} from './models/articleData'
import {schemaArticleName} from './models/articleName'

import _array from 'lodash/array'

const analyseFullDb_enable = false;

function Mongoose(callback) {

	mongoose.Promise = global.Promise;
	mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

	this.db = mongoose.connection;

	// CONNECTION EVENTS
	this.db.on('error', console.error.bind(console, 'connection error:'));

	this.db.once('open', function() {
		console.log(' Db = Mongoose default connection opened, OK');
		callback();
	});
}

// Mongoose METHODS
// initialize db
Mongoose.prototype.initDb = function(callback) {
	// init collections
	// all articles
	this.Article = mongoose.model('Article', schemaArticle);

	// data for React Inputs in Main component
	this.ArticleData = mongoose.model('ArticleData', schemaArticleData);

	// this.ArticleData.remove({}, function(err) {
	// 	if (err) throw err;
	// });

	// names for React Inputs in Header component
	this.ArticleName = mongoose.model('ArticleName', schemaArticleName);

	// this.ArticleName.remove({}, function(err) {
	// 	if (err) throw err;
	// });

	if (config.get('mongoose:options:server:analyse:analyseFullDbEnable') == true) {
		this.analyseFullDb(callback);
	} else {
		callback();
	}
}


// ArticleName
Mongoose.prototype.findArticleName = function (name) {
	return this.ArticleName.find({name}).exec();
}
Mongoose.prototype.addNewArticleNameDb = function (res, articleName) {
	console.log('ENTER: Mongoose.prototype.addNewArticleNameDb', articleName);
	console.log('ADD:', res);
	return new Promise((resolve, reject) => {
		if (res.length == 0) {
			let newArticleName = new this.ArticleName({
				name: articleName.name,
				nameId: articleName.nameId,
				rateWeekday: articleName.rateWeekday,
				rateWeekend: articleName.rateWeekend,
				count: 1
			});
			newArticleName.save(function(err, articleName) {
				//console.log(articleName);
				if (err) reject(err);
				resolve('ARTICLENAME SAVED');
			});
		} else {
			console.log("ARTICLENAME ALREADY EXIST IN DB");
			try {
				this.findArticleName(res[0].name)
				.then(articleName => {
					console.log('ArticleName find: ', articleName);
					articleName[0].count ++;
					articleName[0].save().then(
						resolve("ArticleName: Update Count++")
					)
					.catch(err => reject(err));
				})
			} catch (err) {
				console.log(err);
				reject("ArticleName: Can't Update Count++");
			}
		}
	});
}
Mongoose.prototype.findArticleNamePromiseFunction = function (article) {
	return new Promise((resolve, reject) => {
		this.ArticleName.find({
			name: article.name
		}).exec()
		.then(res => this.addNewArticleNameDb(res, article))
		.then(res => {
			console.log("fill RESULT: ", res);
			resolve(res);
		})
		.catch(err => reject(err));
	});
}
Mongoose.prototype.asyncFindArticleName = async function (article) {
	for (let i = 0; i < article.length; i++) {
		console.log('i' + ' name:' + article[i].name);
		try {
			let res = await this.findArticleNamePromiseFunction(article[i]);
			console.log(res);
		} catch(err) {
			console.log(err);
		};
	}
	return 'EXIT ASYNC';
}
Mongoose.prototype.fillArticleNameDb = function (article) {
	console.log('ENTER: Mongoose.prototype.fillArticleNameDb');
	return new Promise((resolve, reject) => {
		this.asyncFindArticleName(article)
		.then(res => {
			console.log(res)
		})
		.catch(err => console.log(err));
	});
}

// ArticleDate
Mongoose.prototype.findArticleData = function (article) {
	return this.ArticleData.find({article}).exec();
}
Mongoose.prototype.findArticleDataInBoxItems = function (inBox) {
	return this.ArticleData.find({article}).exec();
}
Mongoose.prototype.addNewArticleDataDb = function (res, articleData) {
	console.log('ENTER: Mongoose.prototype.addNewArticleDataDb', articleData);
	console.log('ADD:', res);
	return new Promise((resolve, reject) => {
		if (res.length == 0) {
			let newArticleData = new this.ArticleData({
				article: articleData.article,
				inBox: articleData.inBox,
				count: 1
			});
			newArticleData.save(function(err, articleData) {
				//console.log(articleData);
				if (err) reject(err);
				resolve('ARTICLEData SAVED');
			});
		} else {
			console.log("ARTICLEData ALREADY EXIST IN DB");
			try {
				this.findArticleData(res[0].article)
				.then(findArticleData => {
					console.log('ArticleData find: ', findArticleData);

					let arrayInBox = _array.union(findArticleData[0].inBox, [articleData.inBox]);
					console.log('NEW ARRAY:', arrayInBox);

					findArticleData[0].count ++;
					findArticleData[0].inBox = arrayInBox;
					findArticleData[0].save().then(
						resolve("ArticleData: Update Count++")
					)
					.catch(err => reject(err));
				})
			} catch (err) {
				reject("ArticleData: Can't Update Count++");
			}
		}
	});
}
Mongoose.prototype.findArticleDataPromiseFunction = function (article) {
	return new Promise((resolve, reject) => {
		this.ArticleData.find({article: article.article}).exec()
		.then(res => this.addNewArticleDataDb(res, article))
		.then(res => {
			console.log("fill RESULT: ", res);
			resolve(res);
		})
		.catch(err => {
			console.log('Error findArticleDataPromiseFunction:', err);
			reject(err);
		});
	});
}
Mongoose.prototype.asyncFindArticleData = async function (article) {
	for (let i = 0; i < article.length; i++) {
		console.log('i' + ' article:' + article[i].article);
		try {
			let res = await this.findArticleDataPromiseFunction(article[i]);
			//console.log(res);
		} catch(err) {
			console.log(err);
		};
	}
	return 'EXIT ASYNC';
}
Mongoose.prototype.fillArticleDataDb = function (article) {
	console.log('ENTER: Mongoose.prototype.fillArticleDataDb');
	return new Promise((resolve, reject) => {
		this.asyncFindArticleData(article)
		.then(res => {
			console.log(res)
		})
		.catch(err => console.log(err));
	});
};

Mongoose.prototype.analyseFullDb = function (callback) {
	console.log("SERVER/ DB: ENTER /analyseFullDb");
	let findArticle = this.Article.find({}).exec();
	let removeArticleName = this.ArticleName.remove({}).exec();
	let removeArticleData = this.ArticleData.remove({}).exec();

	Promise.all([
		findArticle,
		removeArticleData,
		removeArticleName,
	])
	.then((res) => {
		console.log('ALLPROMISE');
		let articles = res[0];

		Promise.all([
			this.fillArticleNameDb(articles),
			this.fillArticleDataDb(articles)
		])
		.then((res) => {
			console.log("END: ",res);
			callback();
		})
		.catch(error => {
			throw error;
		})
	})
}

Mongoose.prototype.getDataForReactInput = function(callback) {

}

module.exports = Mongoose;
