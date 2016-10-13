import React, {PropTypes, Component} from 'react'
import Snackbar from 'material-ui/Snackbar'

export default class SnackBarAtom extends Component  {
	constructor(props) {
		super(props);
		console.log(" ===== ATOM/SnackBar: CONSTRUCTOR", this.props);
		this.state = {
			open: false,
			message: '',
			autoHideDuration: 4000,
		}
	}

	_snackBarHandleRequestClose() {
		this.setState({...this.state,
			open: false,
		})
	}
	_snackBarShowMessage(message) {
		this.setState({...this.state,
			open: true,
			message: message,
		});
	}

	componentWillReceiveProps (nextProps) {
		//console.log(" ===== ATOM/Snackbar: componentWillReceiveProps", nextProps);
		let {open = false,
			message = '',
			autoHideDuration = 4000,
		} = nextProps;
		this.setState({
			open,
			message,
			autoHideDuration
		});
		//this.forceUpdate();
	}

	render() {
		//console.log(" ===== ATOM/Snackbar: RENDER", this.state);

		return <div>
			<Snackbar
				open={this.state.open}
				message={this.state.message}
				autoHideDuration={this.state.autoHideDuration}
				onRequestClose={::this._snackBarHandleRequestClose}
			/>
		</div>
	}
}

SnackBarAtom.propTypes = {
	open: PropTypes.bool,
	message: PropTypes.string,
	autoHideDuration: PropTypes.number,
}
