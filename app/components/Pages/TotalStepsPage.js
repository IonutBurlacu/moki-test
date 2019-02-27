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
            this.props.totalSteps.chartType,
            this.props.totalSteps.chartStartDate,
            this.props.totalSteps.chartEndDate
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
                        <TopFilters />
                        <PageTitle title="Total Steps" />
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
    getTotalStepsRequest: (teamId, chartType, chartStartDate, chartEndDate) =>
        dispatch(
            getTotalStepsRequest(
                teamId,
                chartType,
                chartStartDate,
                chartEndDate
            )
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TotalStepsPage);
