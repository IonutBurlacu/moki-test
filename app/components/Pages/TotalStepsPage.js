import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './TotalStepsPage/PageTitle';
import { showLoader } from '../../actions/loader';
import { getTotalStepsRequest } from '../../actions/reports';
import TotalStepsChart from './TotalStepsPage/TotalStepsChart';
import TopFilters from './TotalStepsPage/TopFilters';
import { ChartScale } from './TotalStepsPage/ChartScale';

export class TotalStepsPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getTotalStepsRequest(
            this.props.totalSteps.teamId,
            this.props.totalSteps.dateByType,
            this.props.totalSteps.dateByStartDate,
            this.props.totalSteps.dateByEndDate
        );
    }

    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/reports">Back</Link>}
                    rightButton={<div />}
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageTitle title="Total Steps" />
                        <TopFilters />
                        <div className="charts-container chart-with-scale">
                            <TotalStepsChart />
                            <ChartScale />
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
    loading: state.reports.loading,
    totalSteps: state.reports.totalSteps
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    getTotalStepsRequest: (
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) =>
        dispatch(
            getTotalStepsRequest(
                teamId,
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalStepsPage);
