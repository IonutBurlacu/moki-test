import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import LoginForm from './LoginPage/LoginForm';
import Loader from '../Loader';
import Alert from '../Alert';

const LoginPage = ({ history }) => (
    <div className="container container-with-title">
        <Header
            leftButton={<Link to="/contact-support">Contact Support</Link>}
            rightButton={<Link to="/contact-support">Contact Support</Link>}
        />
        <PageTitle title="Login" />
        <LoginForm history={history} />
        <Alert />
        <Loader />
        <Footer />
    </div>
);

export default LoginPage;
