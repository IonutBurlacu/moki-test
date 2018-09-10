import React, {Component} from 'react';
import Footer from '../Footer';
import Loader from '../Loader';
import AddChallengeForm from './AddChallengePage/AddChallengeForm';
import Alert from '../Alert';

export class AddChallengePage extends Component {
	render() {
		return (
			<div className="container">
				<Alert />
				<AddChallengeForm handleInputChange={this.handleInputChange} />
				<Loader />
				<Footer />
			</div>
		);
	}
}

export default AddChallengePage;
