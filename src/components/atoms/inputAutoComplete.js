import React, {PropTypes, Component} from 'react'

import AutoComplete from 'material-ui/AutoComplete'

import style from '../styleAll.css'

const componentStyle = {
	marginRight: '1em',
}

export default class InputAutoCompleteAtom extends Component {
	constructor(props) {
		super(props);
		console.log(' ========== ATOM/InputAutoComplete: CONSTRUCTOR ', this.props);
		this.state = {
			text: ''+this.props.searchText,
			type: this.props.type,
			index: this.props.index,
		}
	}
	componentWillMount() {
		::this.fireActionSendSearchText();
	}
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if ((this.state.text != nextProps.searchText) ||
	// 		(this.state.text != nextState.text) ||
	// 		(this.state.text != nextProps.text) ||
	// 		(this.props.dataSource != nextProps.dataSource) ||
	// 		(this.props.errorText != nextProps.errorText)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }
	componentWillReceiveProps(nextProps) {
		//console.log("Input componentWillReceiveProps", nextProps);
		let text = nextProps.text;
		this.setState({text}, function() {
			const {getInputData} = nextProps;
			console.log("===== INPUT getInputData:  ", getInputData);
			if (getInputData == true) {
				::this.fireActionSendSearchText();
			}
		});
	}

	fireActionSendSearchText() {
		let sendInputData = {
			type: this.state.type,
			text: this.state.text,
			index: this.state.index,
		}
		console.log("===== INPUT getInputData: Action SendSearchText/", sendInputData);
		this.props.actionSendSearchText(sendInputData);
	}
	_onChange = (text) => {
		this.setState({text});
		console.log(`Input Changed: ${text}`);
	}
	_onBlur() {
		console.log(`BLUR: ${this.state.type}`);
		let data = {
			type: this.state.type,
			text: this.state.text,
			index: this.state.index,
		}
		let action = this.props.actionSendInputDataChanged(data);
	}
	_onNewRequest = (text) => {
		console.log(`New REQUEST: ${this.state.type}`);
		let data = {
			type: this.state.type,
			text: text,
			index: this.state.index,
		}
		let action = this.props.actionSendInputDataChanged(data);
	}

	render() {
		console.log(' ========== ATOM/InputAutoComplete: RENDER ', this.props);
		let dataSource = this.props.dataSource;
		console.log('DataSource: ', dataSource);

		return (
			<AutoComplete
				openOnFocus={true}
				style={componentStyle}
				className={style.InputAutoComplete}
				floatingLabelText={this.props.label}
				dataSource={dataSource}
				onUpdateInput={::this._onChange}
				onNewRequest={::this._onNewRequest}
				onBlur={::this._onBlur}

				errorText={this.props.errorText}
				searchText={this.state.text}
				filter={(this.props.type == 'inBox')?AutoComplete.noFilter:AutoComplete.fuzzyFilter}

				maxSearchResults={10}
			/>
		);

		// filte: AutoComplete.caseInsensitiveFilter AutoComplete.fuzzyFilter
	}
}

InputAutoCompleteAtom.propTypes = {
	type: PropTypes.string.isRequired,
	index: PropTypes.number,
	dataSource: PropTypes.array.isRequired,

	text: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	errorText: PropTypes.string.isRequired,

	searchText: PropTypes.string.isRequired,
	getInputData: PropTypes.bool.isRequired,

	actionSendSearchText: PropTypes.func.isRequired,
	actionSendInputDataChanged: PropTypes.func.isRequired,
}
