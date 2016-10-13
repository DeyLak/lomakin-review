import React, {PropTypes, Component} from 'react';

import {makeFile} from 'nich-xlsx';

import style from '../styleAll.css';

const componentStyle = {
//	marginRight: '1em',
}

export default class ReportAtom extends Component {
	constructor(props) {
		super(props);
		console.log(' ========== ATOM/Report: CONSTRUCTOR ', this.props);
	}

	// _onChange = (text) => {
	// 	console.log(`===== ATOM/Report: Action onChange = ${text}`);
	// 	::this.fireAction(text);
	// }
	// fireAction(text) {
	// 	//this.props.onChange(text);
	// }

	render() {
		console.log(' ========== ATOM/Report: RENDER ', this.props);

		return <p> REPORT </p>
	}
}

// ReportAtom.propTypes = {
// 	// defaultValue: PropTypes.string.isRequired,
// 	// floatingLabelText: PropTypes.string.isRequired,
// 	//
// 	// onChange: PropTypes.func.isRequired,
// }
