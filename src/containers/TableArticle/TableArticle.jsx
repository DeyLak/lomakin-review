import React, {PropTypes, Component} from 'react'

import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'

import Toggle from 'material-ui/Toggle'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import UpdateBtn from 'material-ui/svg-icons/action/update'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import DeleteIcon from 'material-ui/svg-icons/action/delete'

import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

import SnackBarAtom from '../../components/atoms/snackBar'
import TableAtom from '../../components/atoms/table'
import DatePickerAtom from '../../components/atoms/datePicker'
import InputTextAtom from '../../components/atoms/inputText'
import ReportAtom from '../../components/atoms/report'

import {
	getSeconds_split,
	getDate_format_monthDay,
} from '../../libs/nich-time'
import {
	asyncGetInputData,
	asyncSendArticle,
} from '../../libs/nich-beforeSending'

import style from './tableArticle.css'

const componentStyle = {
	propContainer: {
		width: 200,
		overflow: 'hidden',
		margin: '20px auto 0',
	},
	propToggleHeader: {
		margin: '20px auto 10px',
	},
	btn: {
		margin: 12,
	},
	row: {
		fontSize: '16px',
	},
	tableHeader: {
		fontSize: '14px',
	},
	table: {
		height: '100%',
	}
};

const updateDialogStyle = {
  width: '90%',
  maxWidth: 'none',
};

export default class TableArticle extends Component {
	constructor(props) {
		super(props);
		console.log(" ===== APP/TABLEaRticle: CONSTRUCTOR", this.props);

		this.state = {
			height: window.innerHeight - 370,
			width: window.innerWidth,
			table: {
				fixedHeader: true,
				fixedFooter: false,
				stripedRows: true,
				showRowHover: false,
				selectable: true,
				multiSelectable: false,
				enableSelectAll: false,
				deselectOnClickaway: false,
				showCheckboxes: true,
			},
			select: {
				rowIndex: -1,
				currentObject: {},
			},
			dialog: {
				updateArticleOpened: false,
				deleteArticleOpened: false,
			},
			submitData: [],
			datePicker: {
				dateFrom: getDate_format_monthDay('first', 'withoutFormat'),
				dateTo: getDate_format_monthDay('last', 'withoutFormat'),
			}
		};
	}
	shouldComponentUpdate(nextProps, nextState) {
		const {tabIndex} = nextProps;
		if (tabIndex != 'b') {
			return false;
		} else {
			return true;
		}
	}
	componentDidMount() {
		window.addEventListener('resize', this._handleResize);
	}
	componentWillReceiveProps(nextProps) {
		//console.log("NEXT PROPS", nextProps);
		::this.getNewTableDataWithFiltering(nextProps);
	}

	getNewTableDataWithFiltering(nextProps) {
		if (nextProps === undefined) {
			nextProps = this.props;
		}
		console.log(nextProps.tableArticle.filter);
		const filterName = nextProps.tableArticle.filter.name.toLowerCase();
		const filterDateFrom = nextProps.tableArticle.filter.dateFrom.toLowerCase();
		const filterDateTo = nextProps.tableArticle.filter.dateTo.toLowerCase();
		const filterArticle = nextProps.tableArticle.filter.article.toLowerCase();

		let mapForFilteredRows = [];

		let checkName;
		let checkDate;
		let checkArticle;
		let checkAmount;

		let tableFilteredRows =	nextProps.tableArticle.tableData.map((row, index) => {
			checkName = row.name.toLowerCase().search(filterName);
			checkDate = row.date.toLowerCase(); //.search(filterDateFrom);
			checkArticle = row.article.toLowerCase().search(filterArticle);

			console.log(`${filterDateFrom} < ____ < ${filterDateTo}`);

			let secondsForCheck = getSeconds_split(checkDate);
			let secondsFrom = getSeconds_split(filterDateFrom);
			let secondsTo = getSeconds_split(filterDateTo);

			if( filterDateFrom === undefined ) {
				secondsFrom = secondsForCheck - 100;
			}
			if( filterDateTo === undefined ) {
				secondsTo = secondsForCheck + 100;
			}


			console.log(`${secondsFrom} < ${secondsForCheck} < ${secondsTo}`);

			if ((checkName == -1) ||
			(secondsForCheck < secondsFrom) ||
			(secondsForCheck > secondsTo) ||
			(checkArticle == -1)) {
				return;
			} else {
				//console.log(`FILTER: NAME: ${row.name} / ${filterName}| ${checkName} ${checkDate}/ select[${this.state.select.rowIndex}]`);

				let selected = false;
				if (this.state.select.rowIndex == index) {
					selected = true;
				}
				mapForFilteredRows.push(index);
				return (
					<TableRow key={index} selected={selected} className={style.Row}>
						<TableRowColumn style={componentStyle.row}>{row.name}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.nameId}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.date}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.article}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.amount}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.time}</TableRowColumn>
						<TableRowColumn style={componentStyle.row}>{row.fullTime}</TableRowColumn>
					</TableRow>
				)
			}
		});
		//console.log(mapForFilteredRows);
		this.setState({
			filteredMapData: mapForFilteredRows,
			tableFilteredRows: tableFilteredRows
		})
	}

	_handleResize = () => {
		this.setState({
			height: window.innerHeight - 370 + '',
			width: window.innerWidth + '',
		});
		console.log("RESIZED/ STATE: ", this.state);
	}
	_onRowSelection = (row) => {
		let object = this.props.tableArticle.tableData[this.state.filteredMapData[row]];
		//console.log(`Row: ${row}, Map:`, object);

		if (object === undefined) {
			console.log('ROW Undefined!');
			let selectObject = {
				rowIndex: -1,
				currentObject: {},
			}
			this.setState({
				select: selectObject,
			}, function () {
				console.log('SETsTATE:' + this.state.select.rowIndex);
				::this.getNewTableDataWithFiltering();
			});
		} else {
			console.log('ROW Defined!');
			let selectObject = {
				rowIndex: row,
				currentObject: object,
			}
			//this.props.tableArticleActions.sendCurrentSelectedRow(selectObject);
			this.setState({
				select: selectObject,
			}, function () {
				console.log('SETsTATE:' + this.state.select.rowIndex);
				//this.setState(this.state);
				::this.getNewTableDataWithFiltering();
			});
		}
	}

	_unselectObjectSetState() {
		let select = {
			rowIndex: -1,
			currentObject: {},
		}
		this.setState({
			select: select
		});
	}

	_handleInputChangeName = (e) => {
		let name = e.target.value;
		console.log('name changes: ' + name);
		this.props.tableArticleActions.filterInputChangedName(name);
	}
	_handleInputChangeDateFrom = (date) => {
		console.log('date changes FROM: ' + date);
		this.props.tableArticleActions.filterInputChangedDateFrom(date);
	}
	_handleInputChangeDateTo = (date) => {
		console.log('date changes TO: ' + date);
		this.props.tableArticleActions.filterInputChangedDateTo(date);
	}
	_handleInputChangeArticle = (e) => {
		let article = e.target.value;
		console.log('article changes: ' + article);
		this.props.tableArticleActions.filterInputChangedArticle(article);
	}

	_updateDataForArticleTable = () => {
		console.log('UpdateData for ArticleTable', this.props);
		this.props.tableArticleActions.getTableArticleData();
	}

	updateSelectedRowItemInTableArticle = () => {
		console.log('SendSearchText: GET_INPUT_DATA');

		this.setState({
			dialog: {...this.state.dialog,
				deleteArticleOpened: false,
				updateArticleOpened: true,
			}
		});
		this.props.submitArticleActions.actionGetInputData();

		console.log('Update SELECTED ARTICLE: OPEN', this.state);
		//::this.checkNewArticleDataToServer();
	}
	deleteSelectedRowItemInTableArticle = (event) => {
		event.preventDefault();
		this.setState({
			dialog: {...this.state.dialog,
				updateArticleOpened: false,
				deleteArticleOpened: true,
				anchorEl: event.currentTarget,
			}
		});
		console.log('Delete SELECTED ARTICLE', this.state);
	}
	updateSelectedRowItemInTableArticleCloseDialog() {
		this.setState({
			dialog: {...this.state.dialog,
				deleteArticleOpened: false,
				updateArticleOpened: false,
			}
		});
		console.log('Update SELECTED ARTICLE: CLOSE', this.state);
		::this._updateDataForArticleTable();
		//::this.forceUpdate();
	}
	deleteSelectedRowItemInTableArticleCloseDialog = () => {
		this.setState({
			dialog: {...this.state.dialog,
				updateArticleOpened: false,
				deleteArticleOpened: false,
			}
		})
		console.log('Delete SELECTED ARTICLE: CLOSE', this.state);

		::this._updateDataForArticleTable();
		//::this.forceUpdate();
	}

	deleteSelectedRowItemInTableArticle_sendToServer() {
		let _id = this.state.select.currentObject._id;
		if (_id === undefined) {
			console.log("ERROR: ID UNDEFINED!");
			this.refs.snackBarAtomTableArticle._snackBarShowMessage('ERROR: ID UNDEFINED!');
		} else {
			console.log("DELETE!");
			this.refs.snackBarAtomTableArticle._snackBarShowMessage('Отправление данных на сервер');
			this.props.tableArticleActions.actionDeletSelectedArticleInDb({_id: _id});
			::this._updateDataForArticleTable();
			::this._unselectObjectSetState();
		}
		::this.deleteSelectedRowItemInTableArticleCloseDialog()
	}

	// async Functions
	sendDataToServerAfterCheck() {
		::this.updateSelectedRowItemInTableArticleCloseDialog();
		this.props.tableArticleActions.actionUpdateSelectedArticleInDb(this.state.submitData);
		this.refs.snackBarAtomTableArticle._snackBarShowMessage('Данные отправлены на сервер');
	}
	checkNewArticleDataToServer() {
		console.log(' SubmitArticle = onTouchTap');

		let getInputData = asyncGetInputData(this.props.submitArticleActions);

		getInputData
			.catch(error => console.log(error));
	}
	checkNewArticleDataToServerThenSend() {
		console.log(' SubmitArticle = onTouchTap| rerander and send Data');

		let sendArticle = asyncSendArticle(this.props.submitArticle, this.props.submitArticleActions, this.state.select.currentObject._id,);

		sendArticle
		.then((res) => {
			console.log("<<<<<< asyncSendArticle! ",res);
			this.setState({submitData: res.submitData},
			function() {
				::this.sendDataToServerAfterCheck();
			});
		})
		.catch(error => {
			console.log(error);
			this.refs.snackBarAtomTableArticle._snackBarShowMessage(error.message);
		});
	}

	render() {
		//console.log(" ===== APP/TABLEaRticle: RENDER: props", this.props);
		const {tableArticle, submitArticle} = this.props;
		const {submitArticleActions} = this.props;
		const {table, snackBar, datePicker} = this.state;
		const getInputData = submitArticle.status.getInputData;

		if (getInputData == true) {
			console.log('======== SUBMITaRTICLE: getInputData = true! ');
			::this.checkNewArticleDataToServerThenSend();
		}

		// Actions
		let actionSendSearchText = submitArticleActions.actionSendSearchText;
		let actionSendInputDataChanged = submitArticleActions.actionSendInputDataChanged;

		let refreshIndicatorStatus = (tableArticle.status.fetching == true)? 'loading': 'hide';

		let deleteBtnDisabled = (this.state.select.rowIndex == -1)? true: false;

		const deletActions = [
			<RaisedButton label="Нет" onTouchTap={::this.deleteSelectedRowItemInTableArticleCloseDialog} style={componentStyle.btn} disabled={deleteBtnDisabled}/>
			,
			<RaisedButton label="ДА, Удалить." style={componentStyle.btn} className={style.filterBtn, style.btnMargingLeft}  onTouchTap={::this.deleteSelectedRowItemInTableArticle_sendToServer} secondary={true} disabled={deleteBtnDisabled}/>
			,
		]

		//TODO: remove Table to atoms/table.js! <TableAtom/>
		return <div>
			<Paper className={style.PaperMain} zDepth={2}>
				<FloatingActionButton secondary={true} className={style.UpdateBtn} onTouchTap={::this._updateDataForArticleTable}>
					<UpdateBtn />
				</FloatingActionButton>
				<RefreshIndicator size={40} left={this.state.width - 110} top={-43} status={refreshIndicatorStatus} className={style.submitBlock_RefreshIndicator}/>

				<Paper className={style.Paper} zDepth={1}>
					<DatePickerAtom
						defaultDate={datePicker.dateFrom}
						actionOnChange={::this._handleInputChangeDateFrom}
						floatingLabelText={'Дата От:'}
						/>
					<DatePickerAtom
						defaultDate={datePicker.dateTo}
						actionOnChange={::this._handleInputChangeDateTo}
						floatingLabelText={'Дата До:'}
						/>

					<InputTextAtom
						floatingLabelText={"Имя"}
						defaultValue={tableArticle.filter.name}
						onChange={::this._handleInputChangeName}
						/>
					<InputTextAtom
						floatingLabelText={"Артикул"}
						defaultValue={tableArticle.filter.date}
						onChange={::this._handleInputChangeArticle}
						/>

				</Paper>
				<Paper className={style.Paper} zDepth={1}>
					<RaisedButton
						label="Удалить выделенную запись"
						className={style.filterBtn}
						style={componentStyle.btn}
						onTouchTap={::this.deleteSelectedRowItemInTableArticle}
						secondary={true}
						disabled={deleteBtnDisabled}/>
					<RaisedButton
						label="Редактировать выделенную запись"
						className={style.filterBtn}
						style={componentStyle.btn}
						onTouchTap={::this.updateSelectedRowItemInTableArticle}
						primary={true}
						disabled={deleteBtnDisabled}/>
					<ReportAtom />
				</Paper>

				<Paper className={style.Paper} zDepth={1}>
					<Table
						height={this.state.height+'px'}
						fixedHeader={table.fixedHeader}
						fixedFooter={table.fixedFooter}
						selectable={table.selectable} multiSelectable={table.multiSelectable} onRowSelection={this._onRowSelection}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Имя сотрудника">Имя</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Номер для имени">Номер</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Дата работы">Дата</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Название артикула">Артикул</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="The article">Количество</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Время за артикул">Время</TableHeaderColumn>
							<TableHeaderColumn style={componentStyle.tableHeader} tooltip="Полное время за весь день">Время полное</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						displayRowCheckbox={table.showCheckboxes}
						deselectOnClickaway={table.deselectOnClickaway}
						showRowHover={table.showRowHover}
						stripedRows={table.stripedRows}
						className={style.Table}
						style={componentStyle.table}>
						{this.state.tableFilteredRows}
					</TableBody>
				</Table>
				</Paper>

				<Dialog title="Редактирование записи из базы данных" modal={false} open={this.state.dialog.updateArticleOpened} onRequestClose={::this.updateSelectedRowItemInTableArticleCloseDialog} autoScrollBodyContent={true} contentStyle={updateDialogStyle}
				>
					<br/>
					<Header key={'headerTableArticle'}
						header={submitArticle.header}
						submitArticleActions={submitArticleActions}
						status={submitArticle.status}
						article={submitArticle.article}
						selectFromTableArticle={this.state.select.currentObject}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}/>
					<Main key={'mainTableArticle'}
						main={submitArticle.main}
						submitArticleActions={submitArticleActions}
						status={submitArticle.status}
						article={submitArticle.article}
						selectFromTableArticle={this.state.select.currentObject}
						getInputData={getInputData}
						actionSendSearchText={actionSendSearchText}
						actionSendInputDataChanged={actionSendInputDataChanged}/>
					<RaisedButton label="Отмена" style={componentStyle.btn} onTouchTap={::this.updateSelectedRowItemInTableArticleCloseDialog} disabled={deleteBtnDisabled}/>
					<RaisedButton label="Отослать обоновление на сервер" style={componentStyle.btn} className={style.btnMargingLeft} onTouchTap={::this.checkNewArticleDataToServerThenSend} primary={true} disabled={deleteBtnDisabled}/>
				</Dialog>

				<Popover
					open={this.state.dialog.deleteArticleOpened}
					anchorEl={this.state.dialog.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={::this.deleteSelectedRowItemInTableArticleCloseDialog}
					animation={PopoverAnimationVertical}
				>
					<Menu>
						<MenuItem
							primaryText="Удалить!"
							onTouchTap= {::this.deleteSelectedRowItemInTableArticle_sendToServer}
							leftIcon={<DeleteIcon />}
						/>
					</Menu>
				</Popover>

				<SnackBarAtom
					ref='snackBarAtomTableArticle'
				/>
			</Paper>

		</div>
	}
}

TableArticle.propTypes = {
	tableArticleActions: PropTypes.object,
	submitArticleActions: PropTypes.object,
	tableArticle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	submitArticle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

	tabIndex: PropTypes.string.isRequired,
}
