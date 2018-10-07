import React, { Component } from 'react';
import Footer from '../Footer';
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
                <Footer />
            </div>
        );
    }
}

export default AddChallengePage;
