import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getReportsTeamsRequest,
    statsReportsTeamsRequest,
    addTeamToDataA,
    addTeamToDataB,
    removeTeamFromDataA,
    removeTeamFromDataB
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

    handleTeamModifyToDataA = teamId => {
        this.props.showLoader();
        if (this.props.teamIdsA.includes(teamId)) {
            this.props.removeTeamFromDataA(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA.filter(teamIdA => teamIdA !== teamId),
                this.props.teamIdsB,
                this.props.chartType
            );
        } else {
            this.props.addTeamToDataA(teamId);
            this.props.statsReportsTeamsRequest(
                [...this.props.teamIdsA, teamId],
                this.props.teamIdsB,
                this.props.chartType
            );
        }
    };

    handleTeamModifyToDataB = teamId => {
        this.props.showLoader();
        if (this.props.teamIdsB.includes(teamId)) {
            this.props.removeTeamFromDataB(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB.filter(teamIdB => teamIdB !== teamId),
                this.props.chartType
            );
        } else {
            this.props.addTeamToDataB(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                [...this.props.teamIdsB, teamId],
                this.props.chartType
            );
        }
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
                                    <li
                                        className={
                                            this.props.teamIdsA.includes(
                                                team.id
                                            )
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleTeamModifyToDataA(
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
                                    <li
                                        className={
                                            this.props.teamIdsB.includes(
                                                team.id
                                            )
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleTeamModifyToDataB(
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
    removeTeamFromDataA: teamId => dispatch(removeTeamFromDataA(teamId)),
    removeTeamFromDataB: teamId => dispatch(removeTeamFromDataB(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
