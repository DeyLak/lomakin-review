import {
	getDate_string,
} from './nich-time'

function checkAnyErrorMessages(error) {
	let errorMessage = 'noError';

	//let error = this.props.submitArticle.article.error;
	if ((error.header.nameIdErrorText != '') ||
			(error.header.nameErrorText != '') ||
			(error.header.fullTimeErrorText != '') ||
			(error.header.rateWeekdayErrorText != '') ||
			(error.header.rateWeekendErrorText != '')
		) {
		return 'error';
	}

	for (let i = 0; i < error.main.length; i++) {
		let item = error.main[i];
		if ((item.articleErrorText.length != 0) ||
		(item.timeErrorText.length != 0) ||
		(item.amountErrorText.length != 0) ||
		(item.boxesErrorText.length != 0) ||
		(item.inBoxErrorText.length != 0) ||
		(item.inBoxErrorText.length != 0)
	) {
			errorMessage = 'error';
			break;
		}
	}
	return errorMessage;
}
function checkAllInputsForData(article) {
	let errorMessage = 'noError';
	//let article = this.props.submitArticle.article;

	if ((article.header.date.length == 0) ||
			(article.header.nameId.length == 0) ||
			(article.header.name.length == 0) ||
			(article.header.fullTime.length == 0) ||
			(article.header.rateWeekday.length == 0) ||
			(article.header.rateWeekend.length == 0)
		) {
		return 'error';
	}

	for (let i = 0; i < article.main.length; i++) {
		let item = article.main[i];
		if ((item.article.length == 0) ||
		(item.time.length == 0) ||
		(item.amount.length == 0) ||
		(item.boxes.length == 0) ||
		(item.inBox.length == 0)) {
			errorMessage = 'error';
			break;
		}
	}
	return errorMessage;
}

// async functions
export function asyncGetInputData(submitArticleActions) {
	return new Promise((resolve, reject) => {
		console.log('SendSearchText: GET_INPUT_DATA');
		submitArticleActions.actionGetInputData();

		resolve('ok');
	});
}

export function asyncSendArticle(submitArticle, submitArticleActions, _id) {
	return new Promise((resolve, reject) => {
		let errorError = checkAnyErrorMessages(submitArticle.article.error);
		let errorArticle = checkAllInputsForData(submitArticle.article);
		console.log("Submit MESSAGE: errorError-" + errorError + ", errorArticle-" + errorArticle);
		if (errorError == 'error') {
			reject("ArticleSendForm HAVE ERROR MESSAGES!!! please fix them!");
		} else if (errorArticle == 'error')
			reject("ArticleSendForm HAVE Empty Inputs!!! please fill them!");
		{
			resolve("errorError" + errorError + ", errorArticle:" + errorArticle);
		}
	})
	.then((res) => {
		let article = submitArticle.article;
		let submitData = [];

		try {
			let updateData = getDate_string();

			for(let i = 0; i < article.main.length; i++) {
				submitData.push({
					updateDate: updateData,
					_id: _id,
					nameId: article.header.nameId,
					date: article.header.date,
					name: article.header.name,
					fullTime: article.header.fullTime,
					rateWeekday: article.header.rateWeekday,
					rateWeekend: article.header.rateWeekend,

					article: article.main[i].article,
					time: article.main[i].time,
					amount: article.main[i].amount,
					boxes: article.main[i].boxes,
					inBox: article.main[i].inBox,
					plusBox: article.main[i].plusBox,
				});
			}

			let res = "FINAL SUBMIT DATA /length: " + article.main.length;

			return {submitData, res};
			//this.setState({ submitData});
			//this._dialogHandleOpen();
		} catch (error) {
			let res = "ERROR: SubmitArticle! Can't read Article Data";

			console.log(res, error);
			throw new Error(res);
		}
	})
	.catch(error => {
		console.log(error);
		throw new Error(error);
	});
}
