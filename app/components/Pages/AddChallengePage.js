import React, { Component } from 'react';
import Footer from '../Footer';
import Loader from '../Loader';
import AddChallengeForm from './AddChallengePage/AddChallengeForm';
import Alert from '../Alert';

export class AddChallengePage extends Component {
    render() {
        return (
            <div className="container">
                <div className="content">
                    <AddChallengeForm
                        handleInputChange={this.handleInputChange}
                    />
                </div>
                <Loader />
                <Footer />
            </div>
        );
    }
}

export default AddChallengePage;
