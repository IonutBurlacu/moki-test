import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    addTeamToDataB,
    removeTeamFromDataB,
    openReportsMenu,
    closeReportsMenu
} from '../../../actions/reports';

export class DataBTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBSelectOpen: false
        };
    }

    handleDataBSelectMenu = () => {
        if (this.props.dataBSelectOpen) {
            this.props.closeReportsMenu('dataBSelectOpen');
        } else {
            this.props.openReportsMenu('dataBSelectOpen');
        }
    };

    handleCloseDataBSelectMenu = () => {
        this.props.closeReportsMenu('dataBSelectOpen');
    };

    handleTeamModifyToDataB = teamId => {
        this.props.showLoader();
        if (this.props.teamIdsB.includes(teamId)) {
            this.props.removeTeamFromDataB(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB.filter(teamIdB => teamIdB !== teamId),
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA,
                this.props.filterByB
            );
        } else {
            this.props.addTeamToDataB(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                [...this.props.teamIdsB, teamId],
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
                        this.props.dataBSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDataBSelectMenu}
                >
                    Data B: {this.props.teamIdsB.length} Selected
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.dataBSelectOpen ? 'block' : 'none'
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
                                key={team.id}
                                className={
                                    this.props.teamIdsB.includes(team.id)
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleTeamModifyToDataB(team.id)
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
    dataBSelectOpen: state.reports.dataBSelectOpen
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
    addTeamToDataB: teamId => dispatch(addTeamToDataB(teamId)),
    removeTeamFromDataB: teamId => dispatch(removeTeamFromDataB(teamId)),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataBTeams);
