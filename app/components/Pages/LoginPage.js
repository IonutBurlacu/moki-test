import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { shell } from 'electron';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Alert from '../Alert';

class LoginPage extends Component {
    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={
                        <button
                            type="button"
                            onClick={this.handleContactSupport}
                        >
                            Contact Support
                        </button>
                    }
                    rightButton={<div />}
                />
                <div className="content">
                    <PageTitle title="Login" />
                    <LoginForm history={this.props.history} />
                </div>
                <Alert />
                <Footer />
            </div>
        );
    }
}

export default LoginPage;
