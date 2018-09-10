import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';

const ReportsPage = ({}) => (
	<div className="container container-with-title">
		<Header
			leftButton={<Link to="/contact-support">Contact Support</Link>}
			rightButton={<Link to="/contact-support">Contact Support</Link>}
		/>
		<PageTitle title="Reports" />

		<Loader />
		<Footer />
	</div>
);

export default ReportsPage;
