import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './PlayerAveragesPage/PageTitle';
import { showLoader } from '../../actions/loader';
import { getPlayerAveragesRequest } from '../../actions/reports';
import PlayerAveragesChart from './PlayerAveragesPage/PlayerAveragesChart';
import TopFilters from './PlayerAveragesPage/TopFilters';
import { ChartScale } from './PlayerAveragesPage/ChartScale';

export class PlayerAveragesPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayerAveragesRequest(
            this.props.playerAverages.teamId,
            this.props.playerAverages.chartType,
            this.props.playerAverages.chartStartDate,
            this.props.playerAverages.chartEndDate
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
                        <PageTitle title="Player Averages" />
                        <div className="chart-with-scale">
                            <PlayerAveragesChart />
                            <ChartScale />
                        </div>
                        <p className="below-chart">PLAYERS</p>
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
    playerAverages: state.reports.playerAverages
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    getPlayerAveragesRequest: (
        teamId,
        chartType,
        chartStartDate,
        chartEndDate
    ) =>
        dispatch(
            getPlayerAveragesRequest(
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
)(PlayerAveragesPage);
