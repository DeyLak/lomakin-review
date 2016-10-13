import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import {Tabs, Tab} from 'material-ui/Tabs'

import SubmitArticle from '../SubmitArticle/SubmitArticle'
import TableArticle from '../TableArticle/TableArticle'
import * as SubmitArticleActions from '../../actions/SubmitArticleActions'
import * as TableArticleActions from '../../actions/TableArticleActions'

const componentStyle = {
	headline: {
		fontSize: 16,
		paddingTop: -10,
		marginBottom: 0,
		marginTop: 0,
		fontWeight: 500,
		height: 45
	},
	root: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		right: 0,
		boxSizing: 'border-box',
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 'a',
		};

		this.props.tableArticleActions.getTableArticleData();
	}

	tabChanged = (tabIndex) => {
		this.setState({
			tabIndex: tabIndex
		});

		// update TableArticle Data at first time
		if ((tabIndex == 'b')
		//&& (this.props.tableArticle.status.needUpdate == true)
		) {
			this.props.tableArticleActions.getTableArticleData();
		}
	}

	render() {
		//console.log(" ===== APP: RENDER", this.props);
		const {submitArticle, tableArticle} = this.props;
		const {submitArticleActions, tableArticleActions} = this.props;

		console.log(this.state);
		return <div style={componentStyle.root}>
			<Tabs value={this.state.tabIndex}>
				<Tab label="Заполнение" value="a" style={componentStyle.headline} onActive={()=>::this.tabChanged('a')}>
					<div>
						<SubmitArticle
							submitArticle={submitArticle}
							submitArticleActions={submitArticleActions}
							tableArticle={tableArticle}
							tabIndex={this.state.tabIndex}/>
					</div>
				</Tab>
				<Tab label="Таблица" value="b" style={componentStyle.headline} onActive={()=>::this.tabChanged('b')}>
					<div>
						<TableArticle
							tableArticle={tableArticle}
							tableArticleActions={tableArticleActions}
							submitArticle={submitArticle}
							submitArticleActions={submitArticleActions}
							tabIndex={this.state.tabIndex}/>
					</div>
				</Tab>
			</Tabs>
		</div>
	}
}

// REDUX
function mapStateToProps(state) {
	console.log('>>>>> APP.jsx STATE: ', state);
	return {
		submitArticle: state.submitArticle,
		tableArticle: state.tableArticle
	}
}

function mapDispatchToProps(dispatch) {
	let submitArticleActions = bindActionCreators(SubmitArticleActions, dispatch);
	let tableArticleActions = bindActionCreators(TableArticleActions, dispatch);
	console.log(" >>>>> APP: mapDispatchToProps ", submitArticleActions);
	console.log(" >>>>> APP: mapDispatchToProps ", tableArticleActions);
	return {
		submitArticleActions: submitArticleActions,
		tableArticleActions: tableArticleActions
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.propTypes = {
	submitArticleActions: PropTypes.object,
	tableArticleActions: PropTypes.object,
	submitArticle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	tableArticle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}
