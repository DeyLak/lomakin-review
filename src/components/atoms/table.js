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

export default class TableAtom extends Component{
	constructor(props) {
		super(props);
		console.log(" ===== ATOM/TABLE: CONSTRUCTOR", this.props);
	}

	render() {
		return <div>
			TAble!
		</div>
	}
}

TableAtom.propTypes = {
	
}
