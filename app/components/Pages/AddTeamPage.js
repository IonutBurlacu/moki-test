import React, { Component } from 'react';
import Footer from '../Footer';
import Loader from '../Loader';
import AddTeamForm from './AddTeamPage/AddTeamForm';
import Alert from '../Alert';

export class AddTeamPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="content">
                    <AddTeamForm handleInputChange={this.handleInputChange} />
                </div>
                <Loader />
                <Footer />
            </div>
        );
    }
}

export default AddTeamPage;
