import React, {PropTypes, Component} from 'react'

import TextField from 'material-ui/TextField'

import style from '../styleAll.css'

const componentStyle = {
	marginRight: '1em',
}

export default class InputTextAtom extends Component {
	constructor(props) {
		super(props);
		console.log(' ========== ATOM/InputText: CONSTRUCTOR ', this.props);
	}

	_onChange = (text) => {
		console.log(`===== ATOM/InputText: Action onChange = ${text}`);
		::this.fireAction(text);
	}
	fireAction(text) {
		this.props.onChange(text);
	}

	render() {
		console.log(' ========== ATOM/InputText: RENDER ', this.props);

		return (
		<TextField
			defaultValue={this.props.defaultValue}
			floatingLabelText={this.props.floatingLabelText}
			className={style.FilterInput}
			onChange={::this._onChange}
			style={componentStyle}/>
		);
	}
}

InputTextAtom.propTypes = {
	defaultValue: PropTypes.string.isRequired,
	floatingLabelText: PropTypes.string.isRequired,

	onChange: PropTypes.func.isRequired,
}
