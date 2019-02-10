import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'

import Fork from '../components/Fork'
import Todo from '../components/Todo'

import { load as loadPartners, set } from "../store/modules/partners"

class Index extends React.Component {
	static async getInitialProps({ store }) {
		// Adding a default/initialState can be done as follows:
		// store.dispatch({ type: 'ADD_TODO', text: 'It works!' });
		// store.dispatch(loadPartners());

		store.dispatch(set("Yura"))


		return { name: "yura" }
	}

	componentDidMount = () => {
		console.log("Mount", this.props);
	}


	render() {
		const { stars } = this.props
		return (
			<div>
				<div>
					Yura
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		partners: state.partners
	}
}

const mapDispatchToProps = {
	loadPartners
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
