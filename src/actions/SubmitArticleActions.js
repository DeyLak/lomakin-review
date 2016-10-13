import {
// SERVER
	SEND_NEW_ARTICLE,
	SEND_NEW_ARTICLE_SUCCESS,
	SEND_NEW_ARTICLE_DENY,

	GET_ARTICLE_DATA_FOR_INPUT,
	GET_ARTICLE_DATA_FOR_INPUT_DENY,
	GET_ARTICLE_DATA_FOR_INPUT_SUCCESS,

// SEND ARTICLE TEXT FROM Inputs
	SEND_SEARCH_TEXT,
	GET_INPUT_DATA,
	GET_INPUT_DATA_DONE,

// SUBMITaRTICLE
	SEND_INPUT_DATA_CHANGED,

// HEADER
	SEND_INPUT_DATA_CHANGED_DATE,
	SEND_INPUT_DATA_CHANGED_NAME,
	SEND_INPUT_DATA_CHANGED_NAMEID,
	SEND_INPUT_DATA_CHANGED_FULLTIME,
	SEND_INPUT_DATA_CHANGED_RATE_WEEKDAY,
	SEND_INPUT_DATA_CHANGED_RATE_WEEKEND,

// MAIN
	SEND_INPUT_DATA_CHANGED_ARTICLE,
	SEND_INPUT_DATA_CHANGED_TIME,
	SEND_INPUT_DATA_CHANGED_AMOUNT,
	SEND_INPUT_DATA_CHANGED_BOXES,
	SEND_INPUT_DATA_CHANGED_INBOX,

	SEND_ERROR_STATUS_HEADER,
	SEND_ERROR_STATUS_MAIN,

	ADD_NEWA_ARTICLE_INPUT_FORM,
	REMOVE_LAST_ARTICLE_INPUT_FORM,

// TableArticle Actions:
	CLEAR_ALL_INPUT_DATA_MAIN,
	CLEAR_ALL_INPUT_DATA_HEADER,
} from '../constants/SubmitArticle'

import {
	getJsonObject,
	checkStatus,
	parseJSON
} from '../libs/forFetch'

export function actionSendArticleDataToServer(data) {
	return (dispatch) => {
		dispatch({
			type: SEND_NEW_ARTICLE,
			payload: {
				btnState: false,
				fetching: true,
				text: 'Sending new Article ...',
				updateInputData: false,
				getInputData: false,

			}
		})

		var object = getJsonObject(data);
		console.log("SEND", object);

		fetch('/addNewArticle', object)
			.then(function (res) {
				var check = checkStatus(res);
				if (check === 1) {
					return res.json();
				} else {
					throw check;
				}
			})
			.then(function(data) {
				console.log('request succeeded with JSON response', data);
				dispatch({
					type: SEND_NEW_ARTICLE_SUCCESS,
					payload: {
						btnState: true,
						fetching: false,
						text: 'SUCCESS: ' + data.res,
						updateInputData: true,
						getInputData: false,
					}
				})
			})
			.catch(err => {
				//TODO: write correct error handler!

				console.log('request failed:', err)
				console.log('request failed:', err.response.json())

				dispatch({
					type: SEND_NEW_ARTICLE_DENY,
					payload: {
						btnState: true,
						fetching: false,
						text: 'DENYED: ' + err.message,
						updateInputData: false,
						getInputData: false,
					}
				})
			});
	}
}
export function actionGetArticleDataForInputs() {
	return (dispatch) => {
		dispatch({
			type: GET_ARTICLE_DATA_FOR_INPUT,
			payload: {
				btnState: false,
				fetching: true,
				text: 'Get data for React Inputs ...',
				updateInputData: false,
				getInputData: false,
			}
		})

		fetch('/GetArticleDataForInputs')
			.then(function (res) {

				var check = checkStatus(res);
				if (check === 1) {
					return res.json();
				} else {
					throw check;
				}
			})
			.then(function(data) {
				console.log('request succeeded with JSON response', data);
				dispatch({
					type: GET_ARTICLE_DATA_FOR_INPUT_SUCCESS,
					payload: data
				})
			}).catch(function(error) {
				console.log('request failed', error)

				dispatch({
					type: GET_ARTICLE_DATA_FOR_INPUT_DENY,
					payload: {
						btnState: true,
						fetching: false,
						text: 'DENYED Article data for Inputs',
						updateInputData: false,
						getInputData: false,
					}
				})
			});
	}
}

// SEND ARTICLE TEXT FROM Inputs ==============================================
export function actionSendSearchText(data) {
	return {
		type: SEND_SEARCH_TEXT,
		payload: data
	}
}
export function actionGetInputData() {
	return (dispatch) => {
		dispatch({
			type: GET_INPUT_DATA
		});

		setTimeout(() => {
			dispatch({
				type: GET_INPUT_DATA_DONE
			});
		},2);
	}
}
export function actionGetInputDataDone() {
	return {
		type: GET_INPUT_DATA_DONE
	}
}

// SUBMITARTICLE
export function actionSendInputDataChanged(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED,
		payload: data
	}
}

// HEADER COMPONENT ============================================================
export function actionSendInputDataChangedDate(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_DATE,
		payload: data
	}
}
export function actionSendInputDataChangedName(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_NAME,
		payload: data
	}
}
export function actionSendInputDataChangedNameId(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_NAMEID,
		payload: data
	}
}
export function actionSendInputDataChangedFullTime(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_FULLTIME,
		payload: data
	}
}
export function actionSendInputDataChangedRateWeekday(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_RATE_WEEKDAY,
		payload: data
	}
}
export function actionSendInputDataChangedRateWeekend(data) {
	return {
		type: SEND_INPUT_DATA_CHANGED_RATE_WEEKEND,
		payload: data
	}
}


// MAIN COMPONENT ==============================================================
export function actionSendInputDataChangedArticle(data, index) {
	return {
		type: SEND_INPUT_DATA_CHANGED_ARTICLE,
		payload: {
			data: data,
			index: index
		}
	}
}
export function actionSendInputDataChangedTime(data, index) {
	return {
		type: SEND_INPUT_DATA_CHANGED_TIME,
		payload: {
			data: data,
			index: index
		}
	}
}
export function actionSendInputDataChangedAmount(data, index) {
	return {
		type: SEND_INPUT_DATA_CHANGED_AMOUNT,
		payload: {
			data: data,
			index: index
		}
	}
}
export function actionSendInputDataChangedBoxes(data, index) {
	return {
		type: SEND_INPUT_DATA_CHANGED_BOXES,
		payload: {
			data: data,
			index: index
		}
	}
}
export function actionSendInputDataChangedInBox(data, index) {
	return {
		type: SEND_INPUT_DATA_CHANGED_INBOX,
		payload: {
			data: data,
			index: index
		}
	}
}

// ERROR STATUS
export function actionSendErrorStatusMain(mainError) {
	return {
		type: SEND_ERROR_STATUS_MAIN,
		payload: mainError
	}
}
export function actionSendErrorStatusHeader(headerError) {
	return {
		type: SEND_ERROR_STATUS_HEADER,
		payload: headerError
	}
}

// ADD/REMOVE INPUT FORM
export function actionAddNewArticleInputForm() {
	return {
		type: ADD_NEWA_ARTICLE_INPUT_FORM
	}
}
export function actionRemoveLastArticleInputForm() {
	return {
		type: REMOVE_LAST_ARTICLE_INPUT_FORM
	}
}

// TableArticle Actions:
export function clearAllInputDataMain(data) {
	return {
		type: CLEAR_ALL_INPUT_DATA_MAIN,
		payload: data
	}
}
export function clearAllInputDataHeader(data) {
	return {
		type: CLEAR_ALL_INPUT_DATA_HEADER,
		payload: data
	}
}
