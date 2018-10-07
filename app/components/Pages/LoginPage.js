import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Alert from '../Alert';

const LoginPage = ({ history }) => (
    <div className="container">
        <Header
            leftButton={<Link to="/contact-support">Contact Support</Link>}
            rightButton={<div />}
        />
        <div className="content">
            <PageTitle title="Login" />
            <LoginForm history={history} />
        </div>
        <Alert />
        <Footer />
    </div>
);

export default LoginPage;
