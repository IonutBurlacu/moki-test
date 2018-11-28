import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    addTeamToDataA,
    removeTeamFromDataA,
    openReportsMenu,
    closeReportsMenu
} from '../../../actions/reports';

export class DataATeams extends Component {
    handleDataASelectMenu = () => {
        if (this.props.dataASelectOpen) {
            this.props.closeReportsMenu('dataASelectOpen');
        } else {
            this.props.openReportsMenu('dataASelectOpen');
        }
    };

    handleCloseDataASelectMenu = () => {
        this.props.closeReportsMenu('dataASelectOpen');
    };

    handleTeamModifyToDataA = teamId => {
        this.props.showLoader();
        if (this.props.teamIdsA.includes(teamId)) {
            this.props.removeTeamFromDataA(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA.filter(teamIdA => teamIdA !== teamId),
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA,
                this.props.filterByB
            );
        } else {
            this.props.addTeamToDataA(teamId);
            this.props.statsReportsTeamsRequest(
                [...this.props.teamIdsA, teamId],
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA,
                this.props.filterByB
            );
        }
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.dataASelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDataASelectMenu}
                >
                    Data A: {this.props.teamIdsA.length} Selected
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.dataASelectOpen ? 'block' : 'none'
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
                                key={team.id}
                                className={
                                    this.props.teamIdsA.includes(team.id)
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleTeamModifyToDataA(team.id)
                                    }
                                >
                                    {team.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType,
    chartStartDate: state.reports.chartStartDate,
    chartEndDate: state.reports.chartEndDate,
    filterByA: state.reports.filterByA,
    filterByB: state.reports.filterByB,
    dataASelectOpen: state.reports.dataASelectOpen
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
        startDate,
        endDate,
        filterByA,
        filterByB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByB
            )
        ),
    addTeamToDataA: teamId => dispatch(addTeamToDataA(teamId)),
    removeTeamFromDataA: teamId => dispatch(removeTeamFromDataA(teamId)),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataATeams);
