import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';

const PairBandsPage = ({}) => (
	<div className="container container-with-title">
		<Header
			leftButton={<div />}
			rightButton={<Link to="/players">Done</Link>}
		/>
		<PageTitle title="Pair Bands" />

		<Loader />
		<Footer />
	</div>
);

export default PairBandsPage;
