import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getGroupAveragesRequest,
    openGroupAveragesMenu,
    closeGroupAveragesMenu
} from '../../../actions/reports';

export class TeamsFilter extends Component {
    handleTeamSelectMenu = () => {
        if (this.props.groupAverages.teamSelectOpen) {
            this.props.closeGroupAveragesMenu('teamSelectOpen');
        } else {
            this.props.openGroupAveragesMenu('teamSelectOpen');
        }
    };

    handleCloseTeamSelectMenu = () => {
        this.props.closeGroupAveragesMenu('teamSelectOpen');
    };

    handleModifyTeam = teamId => {
        this.handleCloseTeamSelectMenu();
        this.props.showLoader();
        this.props.getGroupAveragesRequest(
            teamId,
            this.props.groupAverages.chartType,
            this.props.groupAverages.chartStartDate,
            this.props.groupAverages.chartEndDate
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.groupAverages.teamSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTeamSelectMenu}
                >
                    {this.props.groupAverages.teamId
                        ? this.props.teams.find(
                              team =>
                                  team.id === this.props.groupAverages.teamId
                          ).name
                        : 'Select team'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.groupAverages.teamSelectOpen
                            ? 'block'
                            : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Team
                        <button
                            type="button"
                            onClick={this.handleCloseTeamSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        {this.props.teams.map(team => (
                            <li
                                key={team.id}
                                className={
                                    this.props.groupAverages.teamId === team.id
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleModifyTeam(team.id)
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
    groupAverages: state.reports.groupAverages,
    teams: state.reports.teams
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openGroupAveragesMenu: menu => dispatch(openGroupAveragesMenu(menu)),
    closeGroupAveragesMenu: menu => dispatch(closeGroupAveragesMenu(menu)),
    getGroupAveragesRequest: (
        teamId,
        chartType,
        chartStartDate,
        chartEndDate
    ) =>
        dispatch(
            getGroupAveragesRequest(
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
)(TeamsFilter);
