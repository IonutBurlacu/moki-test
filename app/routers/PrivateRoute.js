import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import PairSound from '../components/PairSound';
import FailSound from '../components/FailSound';
import SyncSound from '../components/SyncSound';
import { closeAllChallengesMenu } from '../actions/challenges';
import { closeAllPlayersMenu } from '../actions/players';
import { closeAllReportsMenu } from '../actions/reports';
import { closeAllTeamsMenu } from '../actions/teams';

export class PrivateRoute extends Component {
    render() {
        return (
            <Route
                component={props =>
                    this.props.isAuthenticated ? (
                        <div
                            onClick={event => {
                                if (
                                    !event.target.classList.contains(
                                        'filter-button'
                                    )
                                ) {
                                    this.props.closeAllChallengesMenu();
                                    this.props.closeAllPlayersMenu();
                                    this.props.closeAllReportsMenu();
                                    this.props.closeAllTeamsMenu();
                                }
                            }}
                        >
                            <this.props.component {...props} />
                            <Alert />
                            <Loader />
                            <PairSound />
                            <FailSound />
                            <SyncSound />
                        </div>
                    ) : (
                        <Redirect to="/login" />
                    )
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
    closeAllChallengesMenu: () => dispatch(closeAllChallengesMenu()),
    closeAllPlayersMenu: () => dispatch(closeAllPlayersMenu()),
    closeAllReportsMenu: () => dispatch(closeAllReportsMenu()),
    closeAllTeamsMenu: () => dispatch(closeAllTeamsMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);
