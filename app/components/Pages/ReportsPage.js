import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';

export class ReportsPage extends Component {
    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={
                        <Link to="/contact-support">Contact Support</Link>
                    }
                    rightButton={
                        <Link to="/contact-support">Contact Support</Link>
                    }
                />
                <div className="content">
                    <PageTitle title="Reports" />
                </div>
                <Loader />
                <Footer />
            </div>
        );
    }
}

export default ReportsPage;
