import React, { Component } from 'react';
import { shell } from 'electron';
import Loader from '../Loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Alert from '../Alert';

class LoginPage extends Component {
    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    handleVideoTutorials = () => {
        shell.openExternal('https://moki.technology/pages/faq');
    };

    render() {
        return (
            <div className="container">
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
                    <PageTitle title="Login" />
                    <LoginForm history={this.props.history} />
                </div>
                <Alert />
                <Loader />
            </div>
        );
    }
}

export default LoginPage;
