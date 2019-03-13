import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './GroupAveragesPage/PageTitle';
import { showLoader } from '../../actions/loader';
import { getGroupAveragesRequest } from '../../actions/reports';
import GroupAveragesChart from './GroupAveragesPage/GroupAveragesChart';
import TopFilters from './GroupAveragesPage/TopFilters';
import { ChartScale } from './GroupAveragesPage/ChartScale';

export class GroupAveragesPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getGroupAveragesRequest(
            this.props.groupAverages.teamId,
            this.props.groupAverages.dateByType,
            this.props.groupAverages.dateByStartDate,
            this.props.groupAverages.dateByEndDate
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
                        <PageTitle title="Group Averages" />
                        <div className="chart-with-scale">
                            <GroupAveragesChart />
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
    groupAverages: state.reports.groupAverages
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    getGroupAveragesRequest: (
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) =>
        dispatch(
            getGroupAveragesRequest(
                teamId,
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupAveragesPage);
