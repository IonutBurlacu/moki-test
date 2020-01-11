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
import SideDetails from '../SideDetails';

export class PlayerAveragesPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayerAveragesRequest(
            this.props.playerAverages.teamId,
            this.props.playerAverages.dateByType,
            this.props.playerAverages.dateByStartDate,
            this.props.playerAverages.dateByEndDate
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
                        <PageTitle title="Player Variation" />
                        <TopFilters />
                        <div className="chart-with-scale">
                            <PlayerAveragesChart />
                            <SideDetails
                                extraStyle={{ marginTop: '5vmin' }}
                                daily_steps={
                                    this.props.playerAverages.average
                                        .daily_steps
                                }
                                mvpa_minutes={
                                    this.props.playerAverages.average
                                        .mvpa_minutes
                                }
                                grade={this.props.playerAverages.average.grade}
                            />
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
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) =>
        dispatch(
            getPlayerAveragesRequest(
                teamId,
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAveragesPage);
