import React, { Component } from 'react';
import { shell } from 'electron';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Alert from '../Alert';
import { showLoader } from '../../actions/loader';
import { getVersionRequest } from '../../actions/auth';

import appVersion from '../../constants/appVersion';

class LoginPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getVersionRequest();
    }

    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    handleVideoTutorials = () => {
        shell.openExternal('https://moki.technology/pages/faq');
    };

    handleSignUp = () => {
        shell.openExternal('https://app.moki.technology/register');
    };

    render() {
        return (
            <div className="container container-light">
                <Header
                    leftButton={<div />}
                    rightButton={
                        <button
                            type="button"
                            onClick={this.handleVideoTutorials}
                        >
                            Help Centre
                        </button>
                    }
                />
                <div className="content">
                    <PageTitle title="Hello!" />
                    <LoginForm history={this.props.history} />
                    <p className="sign-up-wrapper">
                        Don't have an account yet?{' '}
                        <button
                            type="button"
                            className="sign-up-button"
                            onClick={this.handleSignUp}
                        >
                            Sign Up
                        </button>
                    </p>
                    <p className="current-app-version">{`Moki App Version: ${appVersion}`}</p>
                </div>
                <Alert />
                <Loader />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    version: state.auth.version
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    getVersionRequest: () => dispatch(getVersionRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
