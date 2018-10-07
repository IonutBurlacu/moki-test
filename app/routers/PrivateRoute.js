import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import PairSound from '../components/PairSound';
import FailSound from '../components/FailSound';
import SyncSound from '../components/SyncSound';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (
                <div>
                    <Component {...props} />
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

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
