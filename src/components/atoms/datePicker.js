import React, {PropTypes, Component} from 'react'

import DatePicker from 'material-ui/DatePicker'

import {
	getDate_format,
	getDateTimeFormat,
} from '../../libs/nich-time'

import style from '../styleAll.css'

export default class DatePickerAtom extends Component {
	constructor(props) {
		super(props);
		console.log("====== ATOM/datePicker: Constructor");

		this.state = {
			onChange: this.props.onChange,
			actionOnChange: this.props.actionOnChange,
			defaultDate: this.props.defaultDate,
			floatingLabelText: this.props.floatingLabelText,
			style: this.props.style,
		}
	}

	componentWillMount() {
		if(this.state.actionOnChange !== undefined) {
			//this.state.actionOnChange(this.props.defaultDate);
		}
	}

	_onChangeDate = (event, res) => {
		console.log('===== ATOM: DatePicker/ _onChangeDate:', res);
		let date = getDate_format(res);
		console.log("===== ATOM: DatePicker/ _onChangeDate: NEW DATE: " + date);

		let {onChange, actionOnChange} = this.state;

		if(onChange !== undefined) {
			onChange(res); // return date object
		}
		if(actionOnChange !== undefined) {
			actionOnChange(date); // return date string 23.11.2011
		}
	}

	render() {
		return <div>
			<DatePicker
				className={style.DatePicker}
				defaultDate={this.state.defaultDate}
				onChange={::this._onChangeDate}
				floatingLabelText={this.state.floatingLabelText}
				style={this.state.style}
				hintText='Дата'
				firstDayOfWeek={1}
				locale="ru"
				DateTimeFormat={getDateTimeFormat()}
				autoOk={true}
				cancelLabel='Отмена'
			/>

		</div>
	}
}

DatePickerAtom.propTypes = {
	onChange: PropTypes.func,
	actionOnChange: PropTypes.func,
	defaultDate: PropTypes.object.isRequired,
	floatingLabelText: PropTypes.string,

	style: PropTypes.object,
}
