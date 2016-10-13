import React, {PropTypes, Component} from 'react'

import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import SnackBarAtom from '../../components/atoms/snackBar'

import {
	asyncGetInputData,
	asyncSendArticle,
} from '../../libs/nich-beforeSending'

import style from './submitArticle.css'

export default class SubmitArticle extends Component {
	constructor(props) {
		super(props);
		console.log(" ========== APP/SUBMITaRTICLE: CONSTRUCTOR", this.props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const {tabIndex} = nextProps;
		if (tabIndex != 'a') {
			return false;
		} else {
			return true;
		}
	}

	componentWillMount() {
		this.state = {
			dialog: {
				open: false
			},
			submitData: [],
		}
	}

	_updateInputData() {
		this.props.submitArticleActions.actionGetArticleDataForInputs();
	}

	_dialogHandleClose() {
		this.setState({
			dialog: {...this.state.dialog,
				open: false
			}
		})
	}
	_dialogHandleOpen() {
		this.setState({
			dialog: {...this.state.dialog,
				open: true
			}
		})
	}

// async Functions
	sendDataToServerAfterCheck() {
		::this._dialogHandleClose();
		this.props.submitArticleActions.actionSendArticleDataToServer(this.state.submitData);
		this.refs.snackBarAtomSubmitArticle._snackBarShowMessage('Данные отправлены на сервер');
	}
	checkNewArticleDataToServer() {
		console.log(' SubmitArticle = onTouchTap');

		let getInputData = asyncGetInputData(this.props.submitArticleActions);

		getInputData
			.catch(error => console.log(error));
	}
	checkNewArticleDataToServerThenSend() {
		console.log(' SubmitArticle = onTouchTap| rerander and send Data');

		let sendArticle = asyncSendArticle(this.props.submitArticle, this.props.submitArticleActions);

		sendArticle
		.then((res) => {
			console.log("<<<<<< asyncSendArticle! ",res);
			this.setState({submitData: res.submitData});
			this._dialogHandleOpen();
		})
		.catch(error => {
			console.log(error);
			this.refs.snackBarAtomSubmitArticle._snackBarShowMessage(error.message);
		});
	}

	render() {
		//console.log(" ========== APP/SUBMITaRTICLE: RENDER", this.props);

		const {submitArticle, tableArticle} = this.props;
		const {submitArticleActions} = this.props;

		const getInputData = submitArticle.status.getInputData;

		if (getInputData == true) {
			console.log('======== SUBMITaRTICLE: getInputData = true! ');
			::this.checkNewArticleDataToServerThenSend();
		}

		if (submitArticle.status.updateInputData == true) {
			::this._updateInputData();
		}

		// Actions
		let actionSendSearchText = this.props.submitArticleActions.actionSendSearchText;
		let actionSendInputDataChanged = this.props.submitArticleActions.actionSendInputDataChanged;

		// change RaisedButton status
		let submitBtnDisable = submitArticle.status.fetching;

		// change RefreshIndicator status
		let refreshIndicatorStatus = (submitArticle.status.fetching == true)?'loading':'hide';

		let dialogActions = [
			<FlatButton
				label="Отмена"
				primary={true}
				onTouchTap={::this._dialogHandleClose}
			/>,
			<FlatButton
				label="Отправить"
				primary={true}
				keyboardFocused={true}
				onTouchTap={::this.sendDataToServerAfterCheck}
			/>,
		];

		return <div>
			<Paper className={style.Paper} zDepth={2}>

				<Header
					header={submitArticle.header}
					submitArticleActions={submitArticleActions}
					tableArticle={tableArticle}
					status={submitArticle.status}
					article={submitArticle.article}
					getInputData={getInputData}
					actionSendSearchText={actionSendSearchText}
					actionSendInputDataChanged={actionSendInputDataChanged} />

				<Main
					main={submitArticle.main}
					submitArticleActions={submitArticleActions}
					status={submitArticle.status}
					article={submitArticle.article}
					getInputData={getInputData}
					actionSendSearchText={actionSendSearchText}
					actionSendInputDataChanged={actionSendInputDataChanged} />

				<div className={style.submitBlock}>
					<RefreshIndicator size={36} left={-36 - 18} top={0} status={refreshIndicatorStatus} className={style.submitBlock_RefreshIndicator}/>

					<RaisedButton className={style.submitBlock_RaisedButton} label="Отправить" primary={true} disabled={submitBtnDisable} onTouchTap={::this.checkNewArticleDataToServer}/>
				</div>

				<p>{submitArticle.status.text}</p>

				<SnackBarAtom
					ref='snackBarAtomSubmitArticle'
				/>

				<Dialog
				title="Загрузка данных на сервер"
				actions={dialogActions}
				modal={false}
				open={this.state.dialog.open}
				onRequestClose={::this._dialogHandleClose}
				>
					Отправить данные на сервер?
				</Dialog>

			</Paper>
		</div>
	}
}

// TODO: fix submitArticle propTypes
SubmitArticle.propTypes = {
	submitArticleActions: PropTypes.objectOf(PropTypes.func),
	submitArticle: PropTypes.object.isRequired,
	tableArticle: PropTypes.object.isRequired,

	tabIndex: PropTypes.string.isRequired,
	/*{
		status: {
			fetching: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired,
			btnState: PropTypes.bool.isRequired,
			updateInputData: PropTypes.bool.isRequired
		},
		header: {
			data: PropTypes.array.isRequired,
			inputData: {
				date: PropTypes.array.isRequired,
				nameId: PropTypes.array.isRequired,
				name: PropTypes.array.isRequired,
				fullTime: PropTypes.array.isRequired,
			}
		},
		main: {
			data: PropTypes.array.isRequired,
			inputData: PropTypes.arrayOf({
				article: PropTypes.array.isRequired,
				time: PropTypes.array.isRequired,
				amount: PropTypes.array.isRequired,
				boxes: PropTypes.array.isRequired,
				inBox: PropTypes.array.isRequired
			})
		},
		article: PropTypes.arrayOf({
			date: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			nameId: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			name: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			article: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			time: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			amount: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			boxes: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			inBox: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired]),
			plusBox: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.number.isRequired])
		})
	},*/
}
