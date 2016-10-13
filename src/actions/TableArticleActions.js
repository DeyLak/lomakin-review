import {

// SERVER
	GET_TABLE_ARTICLE_DATA,
	GET_TABLE_ARTICLE_DATA_SUCCESS,
	GET_TABLE_ARTICLE_DATA_DENY,

	UPDATE_SELECTED_ARTICLE_IN_DB,
	UPDATE_SELECTED_ARTICLE_IN_DB_SUCCESS,
	UPDATE_SELECTED_ARTICLE_IN_DB_DENY,

	DELET_SELECTED_ARTICLE_IN_DB,
	DELET_SELECTED_ARTICLE_IN_DB_SUCCESS,
	DELET_SELECTED_ARTICLE_IN_DB_DENY,

	// FILTER
	FILTER_INPUT_CHANGED_NAME,
	FILTER_INPUT_CHANGED_DATE_FROM,
	FILTER_INPUT_CHANGED_DATE_TO,
	FILTER_INPUT_CHANGED_ARTICLE,

	// SELECT
	SEND_CURRENT_SELECTED_ROW,
} from '../constants/TableArticle'

import {
	getJsonObject,
	checkStatus,
	parseJSON
} from '../libs/forFetch'

export function getTableArticleData(data) {
	return (dispatch) => {
		dispatch({
			type: GET_TABLE_ARTICLE_DATA,
			payload: {
				status: {
					fetching: true,
					text: 'Getting new Article',
					needUpdate: false,
				}
			}
		})

		var object = getJsonObject(data);

		fetch('/getTableArticleData', object)
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
					type: GET_TABLE_ARTICLE_DATA_SUCCESS,
					payload: {
						status: {
							fetching: false,
							text: 'SUCCESS: ' + data.res,
							needUpdate: false,
						},
						tableData: data
					}
				})
			})
			.catch(err => {
				console.log('request failed:', err)
				console.log('request failed:', err.response.json())

				dispatch({
					type: GET_TABLE_ARTICLE_DATA_DENY,
					payload: {
						status: {
							fetching: false,
							text: 'DENYED: ' + err.message,
							needUpdate: false,
						}
					}
				})
			});
	}
}
export function actionUpdateSelectedArticleInDb(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_SELECTED_ARTICLE_IN_DB,
			payload: {
				btnState: false,
				fetching: true,
				text: 'Sending new Article ...'
			}
		})

		var object = getJsonObject(data);

		fetch('/updateSelectedArticleInDb', object)
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
					type: UPDATE_SELECTED_ARTICLE_IN_DB_SUCCESS,
					payload: {
						btnState: true,
						fetching: false,
						text: 'SUCCESS: ' + data.res,
						updateInputData: true
					}
				})
			})
			.catch(err => {
				//TODO: write correct error handler!

				console.log('request failed:', err)
				console.log('request failed:', err.response.json())

				dispatch({
					type: UPDATE_SELECTED_ARTICLE_IN_DB_DENY,
					payload: {
						btnState: true,
						fetching: false,
						text: 'DENYED: ' + err.message,
						updateInputData: false
					}
				})
			});
	}
}
export function actionDeletSelectedArticleInDb(data) {
	return (dispatch) => {
		dispatch({
			type: DELET_SELECTED_ARTICLE_IN_DB,
			payload: {
				status: {
					fetching: true,
					text: 'Getting new Article',
					needUpdate: false,
				}
			}
		})

		var object = getJsonObject(data);

		fetch('/deleteSelectedArticleInDb', object)
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
					type: DELET_SELECTED_ARTICLE_IN_DB_SUCCESS,
					payload: {
						status: {
							text: 'SUCCESS: ' + data.res,
							fetching: false,
							needUpdate: false,
						}
					}
				})
			})
			.catch(err => {
				console.log('request failed:', err)
				console.log('request failed:', err.response.json())

				dispatch({
					type: DELET_SELECTED_ARTICLE_IN_DB_DENY,
					payload: {
						status: {
							text: 'DENYED: ' + err.message,
							fetching: false,
							needUpdate: false,
						}
					}
				})
			});
	}
}

export function filterInputChangedName(data) {
	return {
		type: FILTER_INPUT_CHANGED_NAME,
		payload: {
			data: data
		}
	}
}
export function filterInputChangedDateFrom(data) {
	return {
		type: FILTER_INPUT_CHANGED_DATE_FROM,
		payload: {
			data: data
		}
	}
}
export function filterInputChangedDateTo(data) {
	return {
		type: FILTER_INPUT_CHANGED_DATE_TO,
		payload: {
			data: data
		}
	}
}
export function filterInputChangedArticle(data) {
	return {
		type: FILTER_INPUT_CHANGED_ARTICLE,
		payload: {
			data: data
		}
	}
}

export function sendCurrentSelectedRow(data) {
	return {
		type: SEND_CURRENT_SELECTED_ROW,
		payload: {
			data: data
		}
	}
}
