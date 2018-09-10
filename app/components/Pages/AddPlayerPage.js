import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import Loader from '../Loader';
import AddPlayerForm from './AddPlayerPage/AddPlayerForm';
import { createPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import Alert from '../Alert';

export class AddPlayerPage extends React.Component {
	componentWillMount() {
		this.props.showLoader();
		this.props.createPlayerRequest();
	}

	render() {
		return (
			<div className="container">
				<Alert />
				{!this.props.loading ? (
					<AddPlayerForm
						handleInputChange={this.handleInputChange}
						handleSuggestionInputChange={
							this.handleSuggestionInputChange
						}
					/>
				) : (
					<div />
				)}
				<Loader />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
	createPlayerRequest: () => dispatch(createPlayerRequest()),
	showLoader: () => dispatch(showLoader())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddPlayerPage);
