import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

import {
	getDate_string
} from './src/libs/nich-time'

// myConfig
import config from './server/config/index'

// express
const app = new(require('express'))();

console.log(process.env.NODE_ENV);

// webpack hmre
const webpackCompiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(webpackCompiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		hash: false,
		version: false,
		timings: false,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: false,
		publicPath: false
	}
	//'errors-only'
}))
app.use(webpackHotMiddleware(webpackCompiler))

// mongodb
import Mongoose from './server/db/db'
let db = new Mongoose(dbReady);

// body-pareser
import bodyParser from 'body-parser'
import _ from 'lodash'

// statistics
import statistics from './server/db/statistics/statisticsArticleName'

// db ready
function dbReady() {
	db.initDb(function initializedDb() {
		console.log(' Db = initialized, OK ');
	})
}

// body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

// server
//app.use(express.static('public'));

var PORT = config.get('port');
app.listen(PORT, function() {
	console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", PORT, PORT);
});

// Middleware
app.use(function mainPage(req, res, next) {
	if (req.url == "/") {
		console.log(" SERVER = request: " + req.url);
		res.sendFile(__dirname + '/index.html');
	} else {
		next();
	}
});

app.use(function addDataToDBPage(req, res, next) {
	if (req.url == "/db/addNewRecord") {

		console.log("Add new record");
		//console.log(req);
		console.log(req.method);
		console.log(req.hostname);
		console.log(req.body);

		var newRecord = JSON.stringify(req.body);

		console.log("newRecord = " + newRecord);

		for (var i = 0; i < req.body.submitData.length; i++) {
			var item = req.body.submitData[i];
			console.log(item.num + " | " + item.name + " | " + item.value);
		}
		//
		// db.addData({
		// 	[req.body.submitData[0].name]: req.body.submitData[0].value,
		// 	[req.body.submitData[1].name]: req.body.submitData[1].value,
		// 	[req.body.submitData[2].name]: req.body.submitData[2].value,
		// 	[req.body.submitData[3].name]: req.body.submitData[3].value
		// }, function(err) {
		//   if (err) throw err;
		//   console.log(" DB = new record was added");
		// });
	} else {
		next();
	}
});

app.use(function updateSelectedArticleInDb(req, res, next) {
	if (req.url == "/updateSelectedArticleInDb") {
		console.log("Server /updateSelectedArticleInDb");

		let article = req.body;
		article = article[0];
		console.log('Server: New sended Article: _id:' + article._id, article);
		db.Article.findByIdAndUpdate(article._id, article, {new: true}, function(err, res) {
			if (err) console.log(err);
			console.log('UPDATED', res);
		});

		res.status(200).send({res: "Данные успешно обновлены."});
	} else {
		next();
	}
});

app.use(function deleteSelectedArticleInDb(req, res, next) {
	if (req.url == "/deleteSelectedArticleInDb") {
		console.log("Server /deleteSelectedArticleInDb");

		let article = req.body;
		let id = article._id;
		console.log('Server: Deleted Article._id:' + id, article);
		db.Article.findByIdAndRemove(id, function (err, res){
			if(err) { throw err; }
			console.log("DELETED: ", res);
		});

		res.status(200).send({res: "Запись успешно удалена из базы данных."});
	} else {
		next();
	}
});

app.use(function addNewArticle(req, res, next) {
	if (req.url == "/addNewArticle") {
		console.log("Server /addNewArticle");

		let article = req.body;
		console.log('Server: New sended Article:', article);

		if (article.length == 0) {
			console.error('Article data didnt have any article!');
			res.status(404).send({
				res: "ERROR: sended array haven't any items!"
			});
			return;
		}

		let newArticle = [];
		for (let i = 0; i < article.length; i++) {
			let itemNewArticle = new db.Article({
				updateDate: article[i].updateDate,
				nameId: article[i].nameId,
				name: article[i].name,
				date: article[i].date,
				fullTime: article[i].fullTime,
				rateWeekday: article[i].rateWeekday,
				rateWeekend: article[i].rateWeekend,

				article: article[i].article,
				time: article[i].time,
				amount: article[i].amount,
				boxes: article[i].boxes,
				inBox: article[i].inBox,
				plusBox: article[i].plusBox
		 });
		 newArticle.push(itemNewArticle);
		}

		db.Article.create(article, function(err, articleArray) {
			if (err) {
				console.error('There was an error', err);
				res.status(404).send({
					res: "ERROR Article added to db"
				});
				return;
			}
			console.log("SAVED+++++");
			console.log(articleArray);

			let respondFromPromise = [];

			for (let index = 0; index < articleArray.length; index++) {
				let article = articleArray[index];

				let respond = {
					res: "Article added to db"
				}

				let findArticleNamePromise = new Promise(function(resolve, reject) {
					let findArticleName = db.ArticleName.find({
						name: article.name
					}).exec();

					findArticleName
					.then(function (findName) {
						console.log('1, findArticleNames: ' + 'length= ' + findName.length, findName);
						if (findName.length == 0) { // if name wasn't found
						let newArticleName = new db.ArticleName({
							nameId: article.nameId,
							name: article.name,
							rateWeekday: article.rateWeekday,
							rateWeekend: article.rateWeekend,
							count: 1
						});
						return newArticleName.save();
					} else if (findName.length == 1) { // if name was found, but nameId is different)
						findName = findName[0];
						if (findName.nameId != article.nameId) {
							findName.nameId = article.nameId;
							findName.rateWeekday = article.rateWeekday;
							findName.rateWeekend = article.rateWeekend;
						} else {
							console.log("Name already have the same nameId");
						}
						findName.count ++;
						return findName.save();
					} else if (findName.length > 1) {
						throw new Error("There more then one ArticleName! ERROR!", findName);
					}
					})
					.then(newArticleName => {
						console.log("2, findArticleNames: New ArticleName was saved!", newArticleName);
						return Object.assign({}, respond, {
							header: {
								data: {
									nameId: article.nameId,
									name: article.name,
									rateWeekday: article.rateWeekday,
									rateWeekend: article.rateWeekend,
									count: newArticleName.count,
								}
							}
						});
					})
					.then(res => {
						console.log("3, findArticleNames: New ArticleName was saved!", res);
						respond = res;
						resolve(respond);
					})
					.catch(err => {
						if (err instanceof Error) {
							console.log("CATCH: REJECT:",err)
							reject(err);
						} else {
							console.log("CATCH: RESOLVE:",err)
							resolve(err);
						}
					})
			});

			let findArticleDataPromise = new Promise(function(resolve, reject) {
				let findArticleData = db.ArticleData.find({
					article: article.article
				}).exec();

				findArticleData
				.then(function (findArticle) {
					console.log('1, findArticleData:', article);
					if (findArticle.length == 0) {
						console.log("1.1 EMPTY, Add newArticleData:");
						let newArticleData = new db.ArticleData({
							article: article.article,
							inBox: [article.inBox],
							count: 1,
						});
						return newArticleData.save();
					} else if (findArticle.length == 1) {
						console.log("1.2 Finded ONE: check him!", findArticle);
						findArticle = findArticle[0];

						let find = _.filter(findArticle, {
							'inBox': [article.inBox]
						});
						console.log("1.3 find: ", find);
						if (find.length == 0) {
							console.log("1.4 Add new InBox value!", findArticle.inBox);
							findArticle.inBox.unshift(article.inBox);
							findArticle.status = 'update';
						} else {
							console.log("ArticleData.inBox already exist in Db");
						}
						findArticle.count ++;
						return findArticle.save();
					} else {
						throw new Error("There was found more then one ArticleData! ERROR!");
					}
				})
				.then(newArticleData => {
					console.log("2. findArticleData: NEW InBox SAVED:", newArticleData);
					return Object.assign({}, respond, {
						main: {
							data: {
								article: article.article,
								inBox: newArticleData.inBox,
								count: newArticleData.count,
							}
						}
					});
				})
				.then(res => {
					respond = res;
					console.log("3. findArticleData: respond= ", respond);
					resolve(respond);
				})
				.catch(err => {
					if (err instanceof Error) {
						console.log("CATCH: REJECT:",err)
						reject(err);
					} else {
						console.log("CATCH: RESOLVE:",err)
						resolve(err);
					}
				});
			});

			let allPromise = Promise.all([
				findArticleNamePromise,
				findArticleDataPromise
			])
			.then(function () {
				console.log("ALL PROMISES ENDed");
			})
			.then(() => {
				console.log('FiNAL .then() END')

				console.log("RESPOND FINAL SEND!", respond);

				respondFromPromise.push('ok');

				//res.status(200).send(respond);
			})
			.catch(err => {
				console.log('Error resopond:', err);
				respond.res = "ERROR Respond: " + err.message;
				//res.status(400).send(respond);
				respondFromPromise.push(respond.res);
			})

			allPromise
		}

		setTimeout(() => {
			console.log("RESPONDS FROM PROMISES!");
			let flag = true;

			for (var i = 0; i < respondFromPromise.length; i++) {
				console.log(respondFromPromise[i]);
				if (respondFromPromise[i] != 'ok') {
					flag = respondFromPromise[i];
				}
			}

			if (flag == true) {
				res.status(200).send({res: "Данные успешно сохранены."});
			} else {
				res.status(400).send(flag);
			}

		}, 1500)

	});
	} else {
		next();
	}
});

app.use(function getTableArticleData(req, res, next) {
	if (req.url == "/getTableArticleData") {
		console.log("Server /getTableArticleData");
		setTimeout(() => {
			let findArticle = db.Article.find({}).exec();

			findArticle
			.then(function (findArticle) {
				console.log('All Article Found!');
				res.status(200).send({
					res: "Данные успешно сохранены.",
					data: findArticle
				});
			})
			.catch((err) => {
				res.status(404).send({
					res: "ERROR: " + err.message
				});
			});
		}, 1000)
	} else {
		next();
	}
});

app.use(function GetArticleDataForInputs(req, res, next) {
	if (req.url == "/GetArticleDataForInputs") {
		console.log("Server /GetArticleDataForInputs");

		db.ArticleData.find({}, function(err, ArticleData) {
			if (err) return new Error(err);

			db.ArticleName.find({}, function(err, ArticleName) {
				if (err) return handleError(err);

				setTimeout(() => {
					//console.log("Server /GetArticleDataForInputs: res", ArticleData, ArticleName);

					let nameArray = statistics.articleNameToArray(ArticleName);
					//console.log('Server /GetArticleDataForInputs: res/nameArray ', nameArray);

					let articleDataArray = statistics.articleDataToArray(ArticleData);
					//console.log('Server /GetArticleDataForInputs: res/articleDataArray ', articleDataArray);

					let date = getDate_string();
					console.log('DEFAULT DATE: ' + date);
					res.status(200).send({
						status: {
							fetching: false,
							text: 'SUCCESSfully got Article data for Inputs',
							btnState: true,
							updateInputData: false,
							getInputData: false,
						},
						header: {
							data: ArticleName,
							inputData: {
								date: [''],
								nameId: [''],
								name: nameArray,
								fullTime: [''],
								rateWeekday: [''],
								rateWeekend: [''],
							}
						},
						main: {
							data: ArticleData,
							inputData: [{
								article: articleDataArray,
								time: [''],
								amount: [''],
								boxes: [''],
								inBox: ['']
							}]
						},
						article: {
							header: {
								date: date,
								nameId: '',
								name: '',
								fullTime: '',
								rateWeekday: '',
								rateWeekend: '',
							},
							main: [{
								article: '',
								time: '',
								amount: '',
								boxes: '',
								inBox: '',
								plusBox: ''
							}],
							error: {
								header: {
									nameIdErrorText: '',
									nameErrorText: '',
									fullTimeErrorText: '',
									rateWeekdayErrorText: '',
									rateWeekendErrorText: '',
								},
								main: [{
									articleErrorText: '',
									timeErrorText: '',
									amountErrorText: '',
									boxesErrorText: '',
									inBoxErrorText: '',
								}]
							}
						}
					});
				}, 500);
			})
		});
	} else {
		next();
	}
});

app.use(function addDataToDBPage(req, res, next) {
	if (req.url == "/test") {
		console.log('Server /test = Server Test', req);
		let newRecord = JSON.stringify(req.body);
		console.log('Server /test = Test body', newRecord);
		console.log('Server /test = hello ', req.body.hello);

		res.status(200).send({
			status: 200,
			res: "Article added to db"
		});

	} else {
		next();
	}
});

// OThervise
app.use(function notFoundPage(req, res) {
	res.status(404).send("Извините, страница не найдена.");
})

process.once('SIGUSR2', function() {
	gracefulShutdown(function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
