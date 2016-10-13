import React, {PropTypes, Component} from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RemoveBtn from 'material-ui/svg-icons/content/clear'
import PlusBtn from 'material-ui/svg-icons/content/add'

import InputAutoCompleteAtom from '../atoms/inputAutoComplete'

import {blue500} from 'material-ui/styles/colors'

import style from './main.css'
import styleAll from '../styleAll.css'

export default class Main extends Component {
	constructor(props) {
		super(props);
		console.log(' ========== APP/SUBMITaRTICLE/MAIN: CONSTRUCTOR ', this.props);
	}
	componentWillMount() {
		// if (this.props.updateArticle == true) {
		// //	this.props.submitArticleActions.clearAllInputDataMain(this.props.selectFromTableArticle);
		// }
	}
	componentWillUnmount() {
		console.log(' ========== MAIN: componentWill UNMOUNT');
		this.props.submitArticleActions.clearAllInputDataMain();
	}

	_addNewArticleForm() {
		console.log("ADD NEW ARTICLE FORM!");
		let newErrorMain = this.props.article.error.main;
		newErrorMain.push({
			articleErrorText: '',
			timeErrorText: '',
			amountErrorText: '',
			boxesErrorText: '',
			inBoxErrorText: ''
		});
		this.props.submitArticleActions.actionSendErrorStatusMain(newErrorMain);
		this.props.submitArticleActions.actionAddNewArticleInputForm();
	}
	_removeLastArticleInputForm() {
		console.log("REMOVE LAST ARTICLE FORM!");
		let newErrorMain = this.props.article.error.main;
		newErrorMain.pop();
		this.props.submitArticleActions.actionSendErrorStatusMain(newErrorMain);
		this.props.submitArticleActions.actionRemoveLastArticleInputForm();
	}

	render() {
		//console.log(" ===== MAIN: RENDER", this.props);
		const {main, status, article, selectFromTableArticle,
			getInputData,
			actionSendSearchText,
			actionSendInputDataChanged,
		} = this.props;

		let fetching = status.fetching;
		let labelText = status.text;
		let state = this.state;

		//Action wit FORM
		let _addNewArticleForm = ::this._addNewArticleForm;
		let _removeLastArticleInputForm = ::this._removeLastArticleInputForm;

		let articleInputForm = main.inputData.map(function(inputData, i, arr) {
			let dataArticle = inputData.article;
			let dataTime = inputData.time;
			let dataAmount = inputData.amount;
			let dataBoxes = inputData.boxes;
			let dataInBox = inputData.inBox.map(String); // convert array to String

			let textArticle = '' + article.main[i].article;
			let textTime = '' + article.main[i].time;
			let textAmount = '' + article.main[i].amount;
			let textBoxes = '' + article.main[i].boxes;
			let textInBox = '' + article.main[i].inBox;
			let textPlusBox = '' + article.main[i].plusBox;

			let searchTextArticle;
			let searchTextTime;
			let searchTextAmount;
			let searchTextBoxes;
			let searchTextInBox;
			let searchTextPlusBox;

			let selectFromTableArticleDefined = (selectFromTableArticle!==undefined);

			if (selectFromTableArticleDefined) {
				console.log('selectFromTableArticle DEFINED!,', selectFromTableArticle);
				searchTextArticle = '' + selectFromTableArticle.article;
				searchTextTime = '' + selectFromTableArticle.time;
				searchTextAmount = '' + selectFromTableArticle.amount;
				searchTextBoxes = '' + selectFromTableArticle.boxes;
				searchTextInBox = '' + selectFromTableArticle.inBox;
				searchTextPlusBox = '' + selectFromTableArticle.plusBox;
			} else {
				console.log('selectFromTableArticle Undefined!,', selectFromTableArticle);
				searchTextArticle = '' + article.main[i].article;
				searchTextTime = '' + article.main[i].time;
				searchTextAmount = '' + article.main[i].amount;
				searchTextBoxes = '' + article.main[i].boxes;
				searchTextInBox = '' + article.main[i].inBox;
				searchTextPlusBox = '' + article.main[i].plusBox;
			}

			let articleErrorText = article.error.main[i].articleErrorText;
			let timeErrorText = article.error.main[i].timeErrorText;
			let amountErrorText = article.error.main[i].amountErrorText;
			let boxesErrorText = article.error.main[i].boxesErrorText;
			let inBoxErrorText = article.error.main[i].inBoxErrorText;

			let textStyle = {floatingLabelFocusStyle : {
				color: blue500
			}};

			let plusBoxInput = '';
			if (textPlusBox != 0) {
				plusBoxInput = <TextField key={`TextField=${i}`} className={style.InputPlusBox} floatingLabelStyle={textStyle.floatingLabelFocusStyle} disabled={true} hintText={textPlusBox} floatingLabelText={'Не полная коробка c ' + textPlusBox + ' шт.'}/>;
			}

			let plusBtn = '';
			if ((i == (main.inputData.length - 1) && (selectFromTableArticleDefined == false))
			//&& (updateArticle == false)
			) {
				plusBtn = <div key={`plusBtn=${i}`} className={style.plusBtn}>
					<FloatingActionButton style={style} zDepth={2} onTouchTap={() => _addNewArticleForm()}>
						<PlusBtn />
					</FloatingActionButton>
				</div>
			}
			let removeBtn = '';
			if ((i == (main.inputData.length - 1)) && (main.inputData.length > 1)) {
				removeBtn = <div key={`removeBtn=${i}`} className={style.removeBtn}>
					<FloatingActionButton style={style} zDepth={2} onTouchTap={() => _removeLastArticleInputForm()} mini={true} secondary={true}>
						<RemoveBtn />
					</FloatingActionButton>
				</div>
			}

			/*
			<AutoComplete
				className={styleAll.Input}
				floatingLabelText={fetching? labelText: 'Артикул'}
				dataSource={dataArticle}
				onUpdateInput={(article)=>_onChangeArticle(article, i)}
				onNewRequest={(article)=>_onChangeArticle(article, i)}
				errorText={articleErrorText}
				filter={AutoComplete.caseInsensitiveFilter}
				searchText={textArticle}/>
			<AutoComplete
				className={styleAll.Input}
				floatingLabelText={fetching? labelText: 'Время работы'}
				dataSource={dataTime}
				onUpdateInput={(time) => _onChangeTime(time, i)}
				errorText={timeErrorText}
				searchText={textTime}/>

			<AutoComplete
				className={style.Input}
				floatingLabelText={fetching? labelText: 'Всего штук'}
				dataSource={dataAmount}
				onUpdateInput={(amount)=>_onChangeAmount(amount, i)}
				errorText={amountErrorText}
				searchText={textAmount}/>
			<AutoComplete
				className={style.Input}
				floatingLabelText={fetching? labelText: 'шт. в коробке'}
				dataSource={dataInBox}
				onUpdateInput={(inBox)=>_onChangeInBox(inBox, i)}
				onNewRequest={(inBox)=>_onChangeInBox(inBox, i)}
				errorText={inBoxErrorText}
				searchText={textInBox}
				openOnFocus={true}
				filter={AutoComplete.noFilter}/>
			<AutoComplete
				className={style.Input}
				floatingLabelText={fetching? labelText: 'Коробок шт.'}
				dataSource={dataBoxes}
				onUpdateInput={(boxes)=>_onChangeBoxes(boxes, i)}
				onNewRequest={(boxes)=>_onChangeBoxes(boxes, i)}
				filter={AutoComplete.noFilter}
				errorText={boxesErrorText}
				searchText={textBoxes}/>
			*/

			return (
				<Paper key={`MainPaper=${i}`} className={styleAll.Paper} zDepth={2}>

				<div className={style.header}>
					<InputAutoCompleteAtom
						label={fetching?labelText:'Артикул 2'}
						dataSource={dataArticle}
						type={'article'}
						index={i}
						text={textArticle}
						searchText={searchTextArticle}
						errorText={articleErrorText}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}
					/>
				<InputAutoCompleteAtom
						label={fetching?labelText:'Время работы 2'}
						dataSource={dataTime}
						type={'time'}
						index={i}
						text={textTime}
						searchText={searchTextTime}
						errorText={timeErrorText}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}
					/>
					{plusBoxInput}
				</div>

				<div className={style.box}>
					<InputAutoCompleteAtom
						label={fetching?labelText:'Всего штук 2'}
						dataSource={dataAmount}
						type={'amount'}
						index={i}
						text={textAmount}
						searchText={searchTextAmount}
						errorText={amountErrorText}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}
					/>
				<InputAutoCompleteAtom
						label={fetching?labelText:'шт. в коробке 2'}
						dataSource={dataInBox}
						type={'inBox'}
						index={i}
						text={textInBox}
						searchText={searchTextInBox}
						errorText={inBoxErrorText}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}
					/>
				<InputAutoCompleteAtom
						label={fetching?labelText:'Коробок шт. 2'}
						dataSource={dataBoxes}
						type={'boxes'}
						index={i}
						text={textBoxes}
						searchText={searchTextBoxes}
						errorText={boxesErrorText}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}
					/>
				</div>
				{removeBtn}
				{plusBtn}

			</Paper>
			)
		});

		return <div>
			{articleInputForm}
		</div>
	}
}

Main.propTypes = {
	submitArticleActions: PropTypes.objectOf(PropTypes.func),
	status:
		PropTypes.objectOf(
			PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.bool.isRequired
			])),
	main: PropTypes.object.isRequired,
	article: PropTypes.object.isRequired,
	selectFromTableArticle: PropTypes.object,

	getInputData: PropTypes.bool.isRequired,
	actionSendSearchText: PropTypes.func.isRequired,
	actionSendInputDataChanged: PropTypes.func.isRequired,
}
