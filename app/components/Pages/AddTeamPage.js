import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import AddTeamForm from './AddTeamPage/AddTeamForm';
import { createTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import Alert from '../Alert';

export class AddTeamPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.createTeamRequest();
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    <AddTeamForm handleInputChange={this.handleInputChange} />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    createTeamRequest: () => dispatch(createTeamRequest()),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamPage);
