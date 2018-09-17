import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getReportsTeamsRequest,
    statsReportsTeamsRequest,
    addTeamToDataA,
    addTeamToDataB
} from '../../../actions/reports';

export class TopFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataASelectOpen: false,
            dataBSelectOpen: false
        };
    }

    handleDataASelectMenu = () => {
        this.setState({ dataASelectOpen: !this.state.dataASelectOpen });
    };

    handleDataBSelectMenu = () => {
        this.setState({ dataBSelectOpen: !this.state.dataBSelectOpen });
    };

    handleCloseDataASelectMenu = () => {
        this.setState({ dataASelectOpen: false });
    };

    handleCloseDataBSelectMenu = () => {
        this.setState({ dataBSelectOpen: false });
    };

    handleTeamAddToDataA = teamId => {
        this.props.addTeamToDataA(teamId);
        this.props.showLoader();
        this.props.statsReportsTeamsRequest(
            [...this.props.teamIdsA, teamId],
            this.props.teamIdsB,
            this.props.chartType
        );
    };

    handleTeamAddToDataB = teamId => {
        this.props.addTeamToDataB(teamId);
        this.props.showLoader();
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            [...this.props.teamIdsB, teamId],
            this.props.chartType
        );
    };

    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button filter-with-tick"
                            onClick={this.handleDataASelectMenu}
                        >
                            Data A: {this.props.teamIdsA.length} Selected
                        </button>
                        <div
                            className="filter-select-list-wrapper"
                            style={{
                                display: this.state.dataASelectOpen
                                    ? 'block'
                                    : 'none'
                            }}
                        >
                            <div className="filter-select-list-header">
                                Select Teams
                                <button
                                    type="button"
                                    onClick={this.handleCloseDataASelectMenu}
                                >
                                    ⨉
                                </button>
                            </div>
                            <ul className="filter-select-list">
                                {this.props.teams.map(team => (
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleTeamAddToDataA(
                                                    team.id
                                                )
                                            }
                                        >
                                            {team.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button filter-with-tick"
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div className="center-side">
                    <div className="filter-wrapper">
                        <button type="button" className="filter-button">
                            Export
                        </button>
                    </div>
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button filter-with-tick"
                            onClick={this.handleDataBSelectMenu}
                        >
                            Data B: {this.props.teamIdsB.length} Selected
                        </button>
                        <div
                            className="filter-select-list-wrapper"
                            style={{
                                display: this.state.dataBSelectOpen
                                    ? 'block'
                                    : 'none'
                            }}
                        >
                            <div className="filter-select-list-header">
                                Select Teams
                                <button
                                    type="button"
                                    onClick={this.handleCloseDataBSelectMenu}
                                >
                                    ⨉
                                </button>
                            </div>
                            <ul className="filter-select-list">
                                {this.props.teams.map(team => (
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleTeamAddToDataB(
                                                    team.id
                                                )
                                            }
                                        >
                                            {team.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button filter-with-tick"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType
});

const mapDispatchToProps = dispatch => ({
    getReportsTeamsRequest: () => dispatch(getReportsTeamsRequest()),
    statsReportsTeamsRequest: (teamIdsA, teamIdsB, type) =>
        dispatch(statsReportsTeamsRequest(teamIdsA, teamIdsB, type)),
    addTeamToDataA: teamId => dispatch(addTeamToDataA(teamId)),
    addTeamToDataB: teamId => dispatch(addTeamToDataB(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
