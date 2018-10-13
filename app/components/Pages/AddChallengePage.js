import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { createChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import AddChallengeForm from './AddChallengePage/AddChallengeForm';
import Alert from '../Alert';

export class AddChallengePage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.createChallengeRequest();
    }

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

const mapStateToProps = state => ({
    loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
    createChallengeRequest: () => dispatch(createChallengeRequest()),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChallengePage);
