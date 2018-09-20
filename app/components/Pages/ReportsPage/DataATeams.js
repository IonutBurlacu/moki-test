import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    addTeamToDataA,
    removeTeamFromDataA
} from '../../../actions/reports';

export class DataATeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataASelectOpen: false
        };
    }

    handleDataASelectMenu = () => {
        this.setState({ dataASelectOpen: !this.state.dataASelectOpen });
    };

    handleCloseDataASelectMenu = () => {
        this.setState({ dataASelectOpen: false });
    };

    handleTeamModifyToDataA = teamId => {
        this.props.showLoader();
        if (this.props.teamIdsA.includes(teamId)) {
            this.props.removeTeamFromDataA(teamId);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA.filter(teamIdA => teamIdA !== teamId),
                this.props.teamIdsB,
                this.props.chartType,
                this.props.filterByA,
                this.props.filterByValueA,
                this.props.filterByB,
                this.props.filterByValueB
            );
        } else {
            this.props.addTeamToDataA(teamId);
            this.props.statsReportsTeamsRequest(
                [...this.props.teamIdsA, teamId],
                this.props.teamIdsB,
                this.props.chartType,
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
                    className="filter-button filter-with-tick"
                    onClick={this.handleDataASelectMenu}
                >
                    Data A: {this.props.teamIdsA.length} Selected
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.state.dataASelectOpen ? 'block' : 'none'
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
                filterByA,
                filterByValueA,
                filterByB,
                filterByValueB
            )
        ),
    addTeamToDataA: teamId => dispatch(addTeamToDataA(teamId)),
    removeTeamFromDataA: teamId => dispatch(removeTeamFromDataA(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataATeams);
