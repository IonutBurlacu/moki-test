import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import OverviewChart from './ReportsPage/OverviewChart';
import TypicalChart from './ReportsPage/TypicalChart';
import TopFilters from './ReportsPage/TopFilters';
import { showLoader } from '../../actions/loader';
import { getReportsTeamsRequest } from '../../actions/reports';

export class ReportsPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getReportsTeamsRequest();
    }

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
                {!this.props.loading ? (
                    <div className="content">
                        <PageTitle title="Reports" />
                        <TopFilters />
                        <div className="charts-container">
                            <OverviewChart />
                            <TypicalChart />
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.reports.loading
});

const mapDispatchToProps = dispatch => ({
    getReportsTeamsRequest: () => dispatch(getReportsTeamsRequest()),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsPage);
