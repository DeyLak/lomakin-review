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

//import Immutable from 'immutable'

import {validate} from '../libs/nich-validation'
import {
	getDate_string,
} from '../libs/nich-time'

const initState = {
	status: {
		fetching: false,
		text: 'InitState',
		btnState: true,
		updateInputData: true,
		getInputData: false, // if true, then fire action for getting allInputData
	},
	header: {
		data: [{
				name: 'Nikita',
				nameId: '1',
				rateWeekday: '100',
				rateWeekend: '120',
			},{
				name: 'Egor',
				nameId: '2',
				rateWeekday: '102',
				rateWeekend: '122',
			},{
				name: 'Pasha',
				nameId: '3',
				rateWeekday: '103',
				rateWeekend: '123',
			}],
		inputData: {
			date: [''],
			nameId: [''],
			name: ['Nikita', 'Egor', 'Pasha'],
			fullTime: [''],
			rateWeekday: [''],
			rateWeekend: [''],
		}
	},
	main: {
		data: [{
			article: ['test Article 1'],
			inBox: [10, 20]
		},
		{
			article: ['test Article 2'],
			inBox: [20, 40]
		},
		{
			article: ['test Article 3'],
			inBox: [30, 60]
		}],
		inputData: [{
			article: [''],
			time: [''],
			amount: [''],
			boxes: [''],
			inBox: ['']
		}]
	},
	article: {
		header: {
			date: getDate_string(),
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
				inBoxErrorText: ''
			}]
		}
	}
}

export default function submitArticle(state = initState, action) {
	switch (action.type) {
		case SEND_NEW_ARTICLE:
			return {...state,
				status: action.payload
			}
		case SEND_NEW_ARTICLE_SUCCESS:
			return {...state,
				status: action.payload
			}
		case SEND_NEW_ARTICLE_DENY:
			return {...state,
				status: action.payload
			}

		case GET_ARTICLE_DATA_FOR_INPUT:
			return {...state,
				status: action.payload
			}
		case GET_ARTICLE_DATA_FOR_INPUT_SUCCESS:
			return {...state,
				status: action.payload.status,
				header: action.payload.header,
				main: action.payload.main,
				article: action.payload.article
			}
		case GET_ARTICLE_DATA_FOR_INPUT_DENY:
			return {...state,
				status: action.payload
			}

// SEND ARTICLE TEXT FROM Inputs ==============================================
		case SEND_SEARCH_TEXT: {
			let type = action.payload.type;
			let text = ('' + action.payload.text).trim();
			let index = action.payload.index;

			let main;
			if (index !== undefined) {
				main = state.article.main;
				main[index][`${type}`] = text;
			}

			let validateErrorObject = validate(text, type);
			let validateError = validateErrorObject.validation == true ?'':`Ошибка ввода! ${type}`;

			let article;
			switch(type) {
				// HEADER
				case 'date': {
					article = {...state.article,
						header: {...state.article.header,
							date: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}
				case 'nameId': {
					article = {...state.article,
						header: {...state.article.header,
							nameId: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}
				case 'name': {
					article = {...state.article,
						header: {...state.article.header,
							name: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}
				case 'fullTime': {
					article = {...state.article,
						header: {...state.article.header,
							fullTime: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}
				case 'rateWeekday': {
					article = {...state.article,
						header: {...state.article.header,
							rateWeekday: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}
				case 'rateWeekend': {
					article = {...state.article,
						header: {...state.article.header,
							rateWeekend: text,
						},
						error: {...state.article.error,
							header: {...state.article.error.header,
								[`${type}ErrorText`]: validateError,
							}
						}
					}
					break;
				}

				// MAIN
				case 'article': {
					let error = state.article.error.main;
					error[index][`${type}ErrorText`] = validateError;

					article = {...state.article,
						main: main,
						error: {...state.article.error,
							main: error,
						}
					}
					break;
				}
				case 'time': {
					let error = state.article.error.main;
					error[index][`${type}ErrorText`] = validateError;

					article = {...state.article,
						main: main,
						error: {...state.article.error,
							main: error,
						}
					}
					break;
				}
				case 'amount': {
					let error = state.article.error.main;
					error[index][`${type}ErrorText`] = validateError;

					article = {...state.article,
						main: main,
						error: {...state.article.error,
							main: error,
						}
					}
					break;
				}
				case 'boxes': {
					let error = state.article.error.main;
					error[index][`${type}ErrorText`] = validateError;

					article = {...state.article,
						main: main,
						error: {...state.article.error,
							main: error,
						}
					}
					break;
				}
				case 'inBox': {
					let error = state.article.error.main;
					error[index][`${type}ErrorText`] = validateError;

					article = {...state.article,
						main: main,
						error: {...state.article.error,
							main: error,
						}
					}
					break;
				}

				default:
				return state;
			}

			return {...state,
				article: article,
				status: {...state.status,
					getInputData: false,
				}
			}
		}
		case GET_INPUT_DATA: {
			return {...state,
				status: {...state.status,
					getInputData: true,
				}
			}
		}
		case GET_INPUT_DATA_DONE: {
			return {...state,
				status: {...state.status,
					getInputData: false,
				}
			}
		}

// SUBMITaRTICLE ===============================================================
		case SEND_INPUT_DATA_CHANGED: {
			let type = action.payload.type;
			let text = ('' + action.payload.text).trim();

			console.log(`Action DataChanged ${text}|${type}`);

			switch(type) {
				// HEADER
				case 'nameId': {
					let nameId = text;
					console.log('inputChanged NameId = ' + nameId);
					return {...state,
						header: {...state.header,
							inputData: {...state.header.inputData,
								nameId: [nameId]
							}
						},
						article: {...state.article,
							header: {...state.article.header,
								nameId: nameId
							}
						}
					}
				}
				case 'name': {
					let name = text;
					console.log('inputChanged Name ', name);
					try {
						let nameId;
						let rateWeekday;
						let rateWeekend;

						let findName = function (data) {
							return data.name === name;
						}

						let dataObjectFromDb = state.header.data.find(findName);

						// if nothing found then return
						if (dataObjectFromDb === undefined) {
							return {...state,
								article: {...state.article,
									header: {...state.article.header,
										name: name,
										nameId: '',
										rateWeekday: '',
										rateWeekend: '',
									}
								}
							}
						}

						if ('nameId' in dataObjectFromDb) {
							nameId = dataObjectFromDb.nameId;
							rateWeekday = dataObjectFromDb.rateWeekday;
							rateWeekend = dataObjectFromDb.rateWeekend;
							console.log(`InputName Changed: ${name}/${nameId}`);
						}
						// TODO: check if it's correct place to return{}! maybe in IF?
						return {...state,
							header: {...state.header,
								inputData: {...state.header.inputData,
									nameId: [nameId],
									rateWeekday: [rateWeekday],
									rateWeekend: [rateWeekend],
								}
							},
							article: {...state.article,
								header: {...state.article.header,
									nameId: nameId,
									name: name,
									rateWeekday: rateWeekday,
									rateWeekend: rateWeekend,
								}
							}
						}
					} catch (e) {
						console.log('Error: ', e);
						return state
					}
				}
				case 'fullTime': {
					let fullTime = text;
					console.log('inputChanged FullTIme = ' + fullTime);
					return {...state,
						header: {...state.header,
							inputData: {...state.header.inputData,
								fullTime: [fullTime]
							}
						},
						article: {...state.article,
							header: {...state.article.header,
								fullTime: fullTime
							}
						}
					}
				}
				case 'rateWeekday': {
					let rateWeekday = text;
					console.log('inputChanged rateWeekday = ' + rateWeekday);
					return {...state,
						header: {...state.header,
							inputData: {...state.header.inputData,
								rateWeekday: [rateWeekday]
							}
						},
						article: {...state.article,
							header: {...state.article.header,
								rateWeekday: rateWeekday
							}
						}
					}
				}
				case 'rateWeekend': {
					let rateWeekend = text;
					console.log('inputChanged rateWeekend = ' + rateWeekend);
					return {...state,
						header: {...state.header,
							inputData: {...state.header.inputData,
								rateWeekend: [rateWeekend]
							}
						},
						article: {...state.article,
							header: {...state.article.header,
								rateWeekend: rateWeekend
							}
						}
					}
				}

				// MAIN
				case 'article': {
					let article = action.payload.text;
					let index = action.payload.index;
					console.log(`ARTICLE = ${article}, index = ${index}`);
					try {
						let inBox;
						let findArticle = function (data) {
							return data.article === article;
						}

						let dataObjectFromDb = state.main.data.find(findArticle);
						let newMain = state.article.main;
						let newInputData = state.main.inputData;

						newMain[index].article = article;

						// if nothing found => return
						if (dataObjectFromDb === undefined) {
							console.log('NEW MAIN ARRAY:', newMain);
							newMain[index].inBox = '';

							newInputData[index].inBox = [''];
						} else
						if ('inBox' in dataObjectFromDb) {
							inBox = dataObjectFromDb.inBox;
							console.log(`InputArticle Changed: ${article}/${inBox}`);
							newMain[index].inBox = inBox[0];

							newInputData[index].inBox = inBox;
						} else {
							throw new Error("inBox wasn't found in dataObjectFromDb!");
						}

						return {...state,
							main: {...state.main,
								inputData: newInputData,
							},
							article: {...state.article,
								main: newMain,
							}
						}
					} catch (e) {
						console.log('Error: ', e);
						return state
					}
				}
				case 'time': {
					let time = action.payload.text;
					let index = action.payload.index;
					let newMainTime = state.article.main;
					newMainTime[index].time = time;

					console.log('inputChanged TIME = ', time);
					return {...state,
						article: {...state.article,
							main: newMainTime
						}
					}
				}
				case 'amount': {
					try {
						let amount = action.payload.text;
						let index = action.payload.index;

						let inBox = state.article.main[index].inBox;
						if (inBox.length == 0) {
							inBox = state.main.inputData[index].inBox[0];
							console.log("EMPTY INBOX!!!!!");
						} else {
							//console.log("NOT EMPTY INBOX!!!!!");
						}

						let plusBox = amount % inBox;
						let boxes = (amount - plusBox)/ inBox;

						console.log('inputChanged AMOUNT: CALC = ' + amount + '/' + inBox + ' = ' + boxes + ' + plusBox= ' + plusBox);
						let newMainAmount = state.article.main;
						newMainAmount[index].amount = amount;
						newMainAmount[index].inBox = inBox;
						newMainAmount[index].boxes = boxes;
						newMainAmount[index].plusBox = plusBox;

						return {...state,
							article: {...state.article,
								main: newMainAmount
							}
						}
					} catch (e) {
						console.log(e);
						return state;
					}
				}
				case 'boxes': {
					let boxes = action.payload.text;
					let index = action.payload.index;
					let inBox = state.article.main[index].inBox;
					let amount = inBox * boxes;
					console.log(`inputChanged BOXES: ${boxes}, amount: ${amount}`);

					let newMainBoxes = state.article.main;
					newMainBoxes[index].boxes = boxes;
					newMainBoxes[index].amount = amount;

					return {...state,
						article: {...state.article,
							main: newMainBoxes
						}
					}
				}
				case 'inBox': {
					let inBox = action.payload.text;
					let index = action.payload.index;
					let amount = state.article.main[index].amount;

					let plusBox = amount % inBox;
					let boxes = (amount - plusBox) / inBox;
					console.log(`inputChanged INBOX: ${boxes}= ${amount}/${inBox}` );

					let newMainInBox = state.article.main;
					newMainInBox[index].amount = amount;
					newMainInBox[index].inBox = inBox;
					newMainInBox[index].boxes = boxes;
					newMainInBox[index].plusBox = plusBox;

					return {...state,
						article: {...state.article,
							main: newMainInBox
						}
					}
				}

				default:
				return state;
			}
		}

// HEADER COMPONENT ============================================================
		case SEND_INPUT_DATA_CHANGED_DATE: {
			let date = action.payload;

			return {...state,
				article: {...state.article,
					header: {...state.article.header,
						date: date
					}
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_NAME:{
			let name = action.payload;
			console.log('inputChanged Name ', name);
			try {
				let nameId;
				let rateWeekday;
				let rateWeekend;

				let findName = function (data) {
					return data.name === name;
				}

				let dataObjectFromDb = state.header.data.find(findName);

				// if nothing found then return
				if (dataObjectFromDb === undefined) {
					return {...state,
						article: {...state.article,
							header: {...state.article.header,
								name: name,
								nameId: '',
								rateWeekday: '',
								rateWeekend: '',
							}
						}
					}
				}

				if ('nameId' in dataObjectFromDb) {
					nameId = dataObjectFromDb.nameId;
					rateWeekday = dataObjectFromDb.rateWeekday;
					rateWeekend = dataObjectFromDb.rateWeekend;
					console.log(`InputName Changed: ${name}/${nameId}`);
				}
				// TODO: check if it's correct place to return{}! maybe in IF?
				return {...state,
					header: {...state.header,
						inputData: {...state.header.inputData,
							nameId: [nameId],
							rateWeekday: [rateWeekday],
							rateWeekend: [rateWeekend],
						}
					},
					article: {...state.article,
						header: {...state.article.header,
							nameId: nameId,
							name: name,
							rateWeekday: rateWeekday,
							rateWeekend: rateWeekend,
						}
					}
				}
			} catch (e) {
				console.log('Error: ', e);
				return state
			}
		}
		case SEND_INPUT_DATA_CHANGED_NAMEID:{
			let nameId = action.payload;
			console.log('inputChanged NameId = ' + nameId);
			return {...state,
				header: {...state.header,
					inputData: {...state.header.inputData,
						nameId: [nameId]
					}
				},
				article: {...state.article,
					header: {...state.article.header,
						nameId: nameId
					}
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_FULLTIME:{
			let fullTime = action.payload;
			console.log('inputChanged FullTIme = ' + fullTime);
			return {...state,
				header: {...state.header,
					inputData: {...state.header.inputData,
						fullTime: [fullTime]
					}
				},
				article: {...state.article,
					header: {...state.article.header,
						fullTime: fullTime
					}
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_RATE_WEEKDAY:{
			let rateWeekday = action.payload;
			console.log('inputChanged rateWeekday = ' + rateWeekday);
			return {...state,
				header: {...state.header,
					inputData: {...state.header.inputData,
						rateWeekday: [rateWeekday]
					}
				},
				article: {...state.article,
					header: {...state.article.header,
						rateWeekday: rateWeekday
					}
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_RATE_WEEKEND:{
			let rateWeekend = action.payload;
			console.log('inputChanged rateWeekend = ' + rateWeekend);
			return {...state,
				header: {...state.header,
					inputData: {...state.header.inputData,
						rateWeekend: [rateWeekend]
					}
				},
				article: {...state.article,
					header: {...state.article.header,
						rateWeekend: rateWeekend
					}
				}
			}
		}

// MAIN COMPONENT ==============================================================
		case SEND_INPUT_DATA_CHANGED_ARTICLE: {
			let article = action.payload.data;
			let index = action.payload.index;
			console.log(`ARTICLE = ${article}, index = ${index}`);
			try {
				let inBox;
				let findArticle = function (data) {
					return data.article === article;
				}

				let dataObjectFromDb = state.main.data.find(findArticle);
				let newMain = state.article.main;
				let newInputData = state.main.inputData;

				newMain[index].article = article;

				// if nothing found => return
				if (dataObjectFromDb === undefined) {
					console.log('NEW MAIN ARRAY:', newMain);
					newMain[index].inBox = '';

					newInputData[index].inBox = [''];
				} else
				if ('inBox' in dataObjectFromDb) {
					inBox = dataObjectFromDb.inBox;
					console.log(`InputArticle Changed: ${article}/${inBox}`);
					newMain[index].inBox = inBox[0];

					newInputData[index].inBox = inBox;
				} else {
					throw new Error("inBox wasn't found in dataObjectFromDb!");
				}

				return {...state,
					main: {...state.main,
						inputData: newInputData,
					},
					article: {...state.article,
						main: newMain,
					}
				}
			} catch (e) {
				console.log('Error: ', e);
				return state
			}
		}
		case SEND_INPUT_DATA_CHANGED_TIME: {
			let time = action.payload.data;
			let index = action.payload.index;
			let newMainTime = state.article.main;
			newMainTime[index].time = time;

			console.log('inputChanged TIME = ', time);
			return {...state,
				article: {...state.article,
					main: newMainTime
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_AMOUNT: {
			try {
				let amount = action.payload.data;
				let index = action.payload.index;

				let inBox = state.article.main[index].inBox;
				if (inBox.length == 0) {
					inBox = state.main.inputData[index].inBox[0];
					console.log("EMPTY INBOX!!!!!");
				} else {
					console.log("NOT EMPTY INBOX!!!!!");
				}

				let plusBox = amount % inBox;
				let boxes = (amount - plusBox)/ inBox;

				console.log('inputChanged AMOUNT: CALC = ' + amount + '/' + inBox + ' = ' + boxes + ' + plusBox= ' + plusBox);
				let newMainAmount = state.article.main;
				newMainAmount[index].amount = amount;
				newMainAmount[index].inBox = inBox;
				newMainAmount[index].boxes = boxes;
				newMainAmount[index].plusBox = plusBox;

				return {...state,
					article: {...state.article,
						main: newMainAmount
					}
				}
			} catch (e) {
				console.log(e);
				return state;
			}
		}
		case SEND_INPUT_DATA_CHANGED_BOXES: {
			let boxes = action.payload.data;
			let index = action.payload.index;
			let inBox = state.article.main[index].inBox;
			let amount = inBox * boxes;
			console.log(`inputChanged BOXES: ${boxes}, amount: ${amount}`);

			let newMainBoxes = state.article.main;
			newMainBoxes[index].boxes = boxes;
			newMainBoxes[index].amount = amount;

			return {...state,
				article: {...state.article,
					main: newMainBoxes
				}
			}
		}
		case SEND_INPUT_DATA_CHANGED_INBOX: {
			let inBox = action.payload.data;
			let index = action.payload.index;
			let amount = state.article.main[index].amount;

			let plusBox = amount % inBox;
			let boxes = (amount - plusBox) / inBox;
			console.log(`inputChanged INBOX: ${boxes}= ${amount}/${inBox}` );

			let newMainInBox = state.article.main;
			newMainInBox[index].amount = amount;
			newMainInBox[index].inBox = inBox;
			newMainInBox[index].boxes = boxes;
			newMainInBox[index].plusBox = plusBox;

			return {...state,
				article: {...state.article,
					main: newMainInBox
				}
			}
		}

// ERROR ACTIONS ===============================================================
		case SEND_ERROR_STATUS_MAIN: {
			return {...state,
				article: {...state.article,
					error: {...state.article.error,
						main: action.payload
					}
				}
			}
		}
		case SEND_ERROR_STATUS_HEADER: {
			return {...state,
				article: {...state.article,
					error: {...state.article.error,
						header: action.payload
					}
				}
			}
		}

// FORM ACTION =================================================================
		case ADD_NEWA_ARTICLE_INPUT_FORM: {
			let newInputData = state.main.inputData;
			console.log(state.main.inputData);
			newInputData.push({
				article: state.main.inputData[0].article,
				time: [''],
				amount: [''],
				boxes: [''],
				inBox: ['']
			});

			let newArticleMain = state.article.main;
			newArticleMain.push({
					article: '',
					time: '',
					amount: '',
					boxes: '',
					inBox: '',
					plusBox: ''
			});
			console.log("newInputData:", newInputData);

			if (newArticleMain.length != state.main.inputData.length) {
				console.log("FIX article.main SIZE");
				if (newArticleMain.length > state.main.inputData.length) {
					for (let i = 0; i < (newArticleMain.length- state.main.inputData.length); i++) {
						newArticleMain.pop();
					}
				} else {
					for (let i = 0; i < (state.main.inputData.length - newArticleMain.length); i++) {
						newArticleMain.push({
								article: '',
								time: '',
								amount: '',
								boxes: '',
								inBox: '',
								plusBox: ''
						});
					}
				}
			}

			return {...state,
				main: {...state.main,
					inputData: newInputData
				},
				article: {...state.article,
					main: newArticleMain
				}
			};
		}
		case REMOVE_LAST_ARTICLE_INPUT_FORM: {
			let newInputData = state.main.inputData;
			console.log(state.main.inputData);
			newInputData.pop();

			let newArticleMain = state.article.main;
			newArticleMain.pop();
			console.log("newInputData:", newInputData);

			return {...state,
				main: {...state.main,
					inputData: newInputData
				},
				article: {...state.article,
					main: newArticleMain
				}
			};
		}

// TableArticle Actions:
		case CLEAR_ALL_INPUT_DATA_MAIN: {
			let item = action.payload;
			if (action.payload === undefined) {
				item = initState.article.main[0];
				//console.log("UNDEFINED:", item);
			}
			return {...state,
				main: {...state.main,
					inputData: [{
						article: state.main.inputData[0].article,
						time: [''],
						amount: [''],
						boxes: [''],
						inBox: ['']
					}]
				},
				article: {...state.article,
					main: [{
							article: item.article,
							time: item.time,
							amount: item.amount,
							boxes: item.boxes,
							inBox: item.inBox,
							plusBox: item.plusBox,
					}],
					error: {...state.article.error,
						main: [{
							articleErrorText: '',
							timeErrorText: '',
							amountErrorText: '',
							boxesErrorText: '',
							inBoxErrorText: '',
						}]
					}
				}
			};
		}
		case CLEAR_ALL_INPUT_DATA_HEADER: {
			let item = action.payload;
			if (action.payload === undefined) {
				item = initState.article.header;
				//console.log("UNDEFINED:", item);
			}
			console.log("DATE:", item.date);
			let date = getDate_string(item.date);
			console.log(date);
			return {...state,
				header: {...state.header,
					inputData: {...state.header.inputData,
						date: [''],
						nameId: [''],
						fullTime: [''],
						rateWeekday: [''],
						rateWeekend: [''],
					}
				},
				article: {...state.article,
					header: {...state.article.header,
						date: ''+item.date,
						nameId: ''+item.nameId,
						name: ''+item.name,
						fullTime: ''+item.fullTime,
						rateWeekday: ''+item.rateWeekday,
						rateWeekend: ''+item.rateWeekend,
					},
					error: {...state.article.error,
						header: {...state.article.error.header,
							nameIdErrorText: '',
							nameErrorText: '',
							fullTimeErrorText: '',
							rateWeekdayErrorText: '',
							rateWeekendErrorText: '',
						}
					}
				}
			};
		}

		default:
			return state;
	}
}
