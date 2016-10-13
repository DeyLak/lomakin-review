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

//import Immutable from 'immutable'
import {
	getDate_format,
	getDate_format_monthDay,
} from '../libs/nich-time'

const initState = {
	status: {
		fetching: false,
		text: 'Init Status',
		needUpdate: true,
	},
	filter: {
		name: '',
		dateFrom: getDate_format_monthDay('first'),
		dateTo: getDate_format_monthDay('last'),
		article: '',
	},
	select: {
		rowIndex: -1,
		currentObject: {},
	},
	tableData: [],
	tableColumnName: [],
}

export default function tableArticle(state = initState, action) {

	switch (action.type) {

		case GET_TABLE_ARTICLE_DATA:
			return {...state,
				status: action.payload.status
			}
		case GET_TABLE_ARTICLE_DATA_SUCCESS:
			return {...state,
				status: action.payload.status,
				tableData: action.payload.tableData.data
			}
		case GET_TABLE_ARTICLE_DATA_DENY:
			return {...state,
				status: action.payload.status
			}

		case DELET_SELECTED_ARTICLE_IN_DB:
			return {...state,
				status: action.payload.status
			}
		case DELET_SELECTED_ARTICLE_IN_DB_SUCCESS:
			return {...state,
				status: action.payload.status
			}
		case DELET_SELECTED_ARTICLE_IN_DB_DENY:
			return {...state,
				status: action.payload.status
			}

		// FILTER
		case FILTER_INPUT_CHANGED_NAME: {
			return {...state,
				filter: {...state.filter,
					name: action.payload.data
				}
			}
		}
		case FILTER_INPUT_CHANGED_DATE_FROM: {
			console.log('FILTER_INPUT_CHANGED_DATE_FROM', action.payload.data);
			return {...state,
				filter: {...state.filter,
					dateFrom: action.payload.data,
				}
			}
		}
		case FILTER_INPUT_CHANGED_DATE_TO: {
			console.log('FILTER_INPUT_CHANGED_DATE_TO', action.payload.data);
			return {...state,
				filter: {...state.filter,
					dateTo: action.payload.data,
				}
			}
		}
		case FILTER_INPUT_CHANGED_ARTICLE: {
			return {...state,
				filter: {...state.filter,
					article: action.payload.data
				}
			}
		}

		// SELECT
		case SEND_CURRENT_SELECTED_ROW: {
			return {...state,
				select: {...state.select,
					currentObject: action.payload.currentObject,
				}
			}
		}

		default:
			return state;
	}
}
