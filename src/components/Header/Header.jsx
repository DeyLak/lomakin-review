import React, {PropTypes, Component} from 'react'

import Paper from 'material-ui/Paper'

import InputAutoCompleteAtom from '../atoms/inputAutoComplete'
import DatePickerAtom from '../atoms/datePicker'

import {
	getDate_no_format,
} from '../../libs/nich-time'

import style from './header.css'
import styleAll from '../styleAll.css'

export default class Header extends Component {
	constructor(props) {
		super(props);
		console.log(' ========== APP/SUBMITaRTICLE/HEADER: CONSTRUCTOR ', this.props);
	}
	componentWillMount() {
		// if (this.props.updateArticle == true) {
		// //	this.props.submitArticleActions.clearAllInputDataHeader(this.props.selectFromTableArticle);
		// }
	}
	componentWillUnmount() {
		console.log(' ========== APP/SUBMITaRTICLE/HEADER: componentWill UNMOUNT');
		this.props.submitArticleActions.clearAllInputDataHeader();
	}

	render() {
		//console.log(" ===== HEADER: RENDER", this.props);
		const {header, status, article, selectFromTableArticle, getInputData, actionSendSearchText, actionSendInputDataChanged} = this.props;

		// console.log("header",header);
		// console.log("status",status);
		// console.log("article",article);
		// console.log("selectFromTableArticle",selectFromTableArticle);
		// console.log("getInputData",getInputData);
		// console.log("actionSendSearchText",actionSendSearchText);
		// console.log("actionSendInputDataChanged",actionSendInputDataChanged);

		let fetching = status.fetching;
		let labelText = status.text;

		let dataNameId = header.inputData.nameId;
		let dataName = header.inputData.name;
		let dataFullTime = header.inputData.fullTime;
		let dataRateWeekday = header.inputData.rateWeekday;
		let dataRateWeekend = header.inputData.rateWeekend;

		let textDate = getDate_no_format(article.header.date);
		let textNameId = '' + article.header.nameId;
		let textName = '' + article.header.name;
		let textFullTime = '' + article.header.fullTime;
		let textRateWeekday = '' + article.header.rateWeekday;
		let textRateWeekend = '' + article.header.rateWeekend;

		//let searchTextDate;
		let searchTextNameId;
		let searchTextName;
		let searchTextFullTime;
		let searchTextRateWeekday;
		let searchTextRateWeekend;

		if (selectFromTableArticle !== undefined) {
			console.log('selectFromTableArticle DEFINED!,', selectFromTableArticle);
			// TEXT DATE !!!
			textDate = getDate_no_format(selectFromTableArticle.date);

			searchTextNameId = '' + selectFromTableArticle.nameId;
			searchTextName = '' + selectFromTableArticle.name;
			searchTextFullTime = '' + selectFromTableArticle.fullTime;
			searchTextRateWeekday = '' + selectFromTableArticle.rateWeekday;
			searchTextRateWeekend = '' + selectFromTableArticle.rateWeekend;
		} else {
			console.log('selectFromTableArticle Undefined!,', selectFromTableArticle);
			//searchTextDate = getDate_no_format(article.header.date);
			searchTextNameId = '' + article.header.nameId;
			searchTextName = '' + article.header.name;
			searchTextFullTime = '' + article.header.fullTime;
			searchTextRateWeekday = '' + article.header.rateWeekday;
			searchTextRateWeekend = '' + article.header.rateWeekend;
		}

		let nameIdErrorText = article.error.header.nameIdErrorText;
		let nameErrorText = article.error.header.nameErrorText;
		let fullTimeErrorText = article.error.header.fullTimeErrorText;
		let rateWeekdayErrorText = article.error.header.rateWeekdayErrorText;
		let rateWeekendErrorText = article.error.header.rateWeekendErrorText;

		/* <AutoComplete className={style.InputName} floatingLabelText={fetching?labelText:'Фамилия Имя'} dataSource={dataName} onUpdateInput={::this._onChangeName} onNewRequest={::this._onNewRequestName} errorText={nameErrorText} searchText={textName} filter={AutoComplete.caseInsensitiveFilter}/>
		<AutoComplete className={style.InputFullTime} floatingLabelText={fetching?labelText:'Общее время рабочего дня'} dataSource={dataFullTime} onUpdateInput={::this._onChangeFullTime} errorText={fullTimeErrorText} filter={AutoComplete.caseInsensitiveFilter} searchText={textFullTime}/>
		<AutoComplete className={style.InputNameId} floatingLabelText={fetching?labelText:'Личный номер'} dataSource={dataNameId} onUpdateInput={::this._onChangeNameId} errorText={nameIdErrorText} filter={AutoComplete.caseInsensitiveFilter} searchText={textNameId}/>

		<AutoComplete className={style.InputRateWeekday} floatingLabelText={fetching?labelText:'Тариф:Будни'} dataSource={dataRateWeekday} onUpdateInput={::this._onChangeRateWeekday} errorText={rateWeekdayErrorText} filter={AutoComplete.caseInsensitiveFilter} searchText={textRateWeekday}/>

		<AutoComplete className={style.InputRateWeekend} floatingLabelText={fetching?labelText:'Тариф:Выходные'} dataSource={dataRateWeekend} onUpdateInput={::this._onChangeRateWeekend} errorText={rateWeekendErrorText} filter={AutoComplete.caseInsensitiveFilter} searchText={textRateWeekend}/>
		*/

		return (
			<Paper className={styleAll.Paper} zDepth={2}>
				<div className={style.top}>
					<div className={style.topRows}>
						<DatePickerAtom
							actionOnChange={::this.props.submitArticleActions.actionSendInputDataChangedDate}
							defaultDate={textDate}
							floatingLabelText={'Дата'}
							style={{width: '256px',}}
							/>

						<InputAutoCompleteAtom
							label={fetching?labelText:'Фамилия Имя 2'}
							dataSource={dataName}
							type={'name'}
							text={textName}
							searchText={searchTextName}
							errorText={nameErrorText}
							getInputData={getInputData}
							actionSendSearchText={actionSendSearchText}
							actionSendInputDataChanged={actionSendInputDataChanged}
						/>

					<InputAutoCompleteAtom
							label={fetching?labelText:'Общее время рабочего дня 2'}
							dataSource={dataFullTime}
							type={'fullTime'}
							text={textFullTime}
							searchText={searchTextFullTime}
							errorText={fullTimeErrorText}
							getInputData={getInputData}
							actionSendSearchText={actionSendSearchText}
							actionSendInputDataChanged={actionSendInputDataChanged}
						/>

					</div>

					<div className={style.topRows}>
						<InputAutoCompleteAtom
							label={fetching?labelText:'Личный номер 2'}
							dataSource={dataNameId}
							type={'nameId'}
							text={textNameId}
							searchText={searchTextNameId}
							errorText={nameIdErrorText}
							getInputData={getInputData}
							actionSendSearchText={actionSendSearchText}
							actionSendInputDataChanged={actionSendInputDataChanged}
						/>
					<InputAutoCompleteAtom
							label={fetching?labelText:'Тариф:Будни 2'}
							dataSource={dataRateWeekday}
							type={'rateWeekday'}
							text={textRateWeekday}
							searchText={searchTextRateWeekday}
							errorText={rateWeekdayErrorText}
							getInputData={getInputData}
							actionSendSearchText={actionSendSearchText}
							actionSendInputDataChanged={actionSendInputDataChanged}
						/>
					<InputAutoCompleteAtom
							label={fetching?labelText:'Тариф:Выходные 2'}
							dataSource={dataRateWeekend}
							type={'rateWeekend'}
							text={textRateWeekend}
							searchText={searchTextRateWeekend}
							errorText={rateWeekendErrorText}
							getInputData={getInputData}
							actionSendSearchText={actionSendSearchText}
							actionSendInputDataChanged={actionSendInputDataChanged}
						/>
					</div>
				</div>
			</Paper>
		);
	}
}

Header.propTypes = {
	submitArticleActions: PropTypes.objectOf(PropTypes.func.isRequired),
	status:
		PropTypes.objectOf(
			PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.bool.isRequired
			])),
	header: PropTypes.object.isRequired,
	article: PropTypes.object.isRequired,
	selectFromTableArticle: PropTypes.object,

	getInputData: PropTypes.bool.isRequired,
	actionSendSearchText: PropTypes.func.isRequired,
	actionSendInputDataChanged: PropTypes.func.isRequired,
}
