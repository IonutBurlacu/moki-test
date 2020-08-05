import React, { Component } from 'react';
import { shell, ipcRenderer, Notification } from 'electron';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Alert from '../Alert';
import { showLoader } from '../../actions/loader';
import { showToast } from '../../actions/toast';
import { getVersionRequest } from '../../actions/auth';

import appVersion from '../../constants/appVersion';

class LoginPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getVersionRequest();

        ipcRenderer.on('update_available', () => {
            ipcRenderer.removeAllListeners('update_available');
            this.props.showToast(
                'There is a new version available. Downloading it now.'
            );
        });
        ipcRenderer.on('update_error', () => {
            ipcRenderer.removeAllListeners('update_error');
            this.props.showToast('There was an error while updating the app.');
        });
        ipcRenderer.on('update_downloaded', () => {
            ipcRenderer.removeAllListeners('update_downloaded');
            this.props.showToast('Update downloaded. Click here to restart');
        });
    }

    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    handleVideoTutorials = () => {
        shell.openExternal('https://moki.technology/pages/help-centre');
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
                    <PageTitle title="Hello! 1.25" />
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
    showToast: message => dispatch(showToast(message)),
    getVersionRequest: () => dispatch(getVersionRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
