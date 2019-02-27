import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './PlayerVariationPage/PageTitle';
import { showLoader } from '../../actions/loader';
import { getPlayerVariationRequest } from '../../actions/reports';
import PlayerVariationChart from './PlayerVariationPage/PlayerVariationChart';
import TopFilters from './PlayerVariationPage/TopFilters';
import { ChartScale } from './PlayerVariationPage/ChartScale';

export class PlayerVariationPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayerVariationRequest(
            this.props.playerVariation.teamId,
            this.props.playerVariation.chartType,
            this.props.playerVariation.chartStartDate,
            this.props.playerVariation.chartEndDate
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
                        <PageTitle title="Player Variation" />
                        <div className="chart-with-scale">
                            <PlayerVariationChart />
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
    playerVariation: state.reports.playerVariation
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    getPlayerVariationRequest: (
        teamId,
        chartType,
        chartStartDate,
        chartEndDate
    ) =>
        dispatch(
            getPlayerVariationRequest(
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
)(PlayerVariationPage);
