import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { shell } from 'electron';
import Footer from '../Footer';
import Loader from '../Loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import ForgotPasswordForm from './ForgotPasswordPage/ForgotPasswordForm';
import Alert from '../Alert';

class ForgotPasswordPage extends Component {
    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    handleVideoTutorials = () => {
        shell.openExternal('https://www.moki.technology/tutorials');
    };

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={<Link to="/login">Back</Link>}
                    rightButton={<div />}
                />
                <div className="content">
                    <PageTitle title="Forgot Password" />
                    <ForgotPasswordForm history={this.props.history} />
                </div>
                <Alert />
                <Loader />
                <Footer />
            </div>
        );
    }
}

export default ForgotPasswordPage;
