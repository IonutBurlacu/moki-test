import React from 'react';
import { Footer } from '../Footer';
import Loader from '../Loader';
import AddTeamForm from './AddTeamPage/AddTeamForm';
import Alert from '../Alert';

export class AddTeamPage extends React.Component {
	render() {
		return (
			<div className="container">
				<Alert />
				<AddTeamForm handleInputChange={this.handleInputChange} />
				<Loader />
				<Footer />
			</div>
		);
	}
}

export default AddTeamPage;
