import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    addTeamToDataB,
    removeTeamFromDataB
} from '../../../actions/reports';

export class DataBTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBSelectOpen: false
        };
    }

    handleDataBSelectMenu = () => {
        this.setState({ dataBSelectOpen: !this.state.dataBSelectOpen });
    };

    handleCloseDataBSelectMenu = () => {
        this.setState({ dataBSelectOpen: false });
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
                this.props.filterByValueA,
                this.props.filterByB,
                this.props.filterByValueB
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
                this.props.filterByValueA,
                this.props.filterByB,
                this.props.filterByValueB
            );
        }
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.state.dataBSelectOpen
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
                        display: this.state.dataBSelectOpen ? 'block' : 'none'
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
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
        startDate,
        endDate,
        filterByA,
        filterByValueA,
        filterByB,
        filterByValueB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByValueA,
                filterByB,
                filterByValueB
            )
        ),
    addTeamToDataB: teamId => dispatch(addTeamToDataB(teamId)),
    removeTeamFromDataB: teamId => dispatch(removeTeamFromDataB(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataBTeams);
