import { combineReducers } from 'redux'
import submitArticle from './submitArticle'
import tableArticle from './tableArticle'

export default combineReducers({
	submitArticle,
	tableArticle
})
