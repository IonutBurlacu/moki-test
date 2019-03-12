import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getPlayerAveragesRequest,
    openPlayerAveragesMenu,
    closePlayerAveragesMenu
} from '../../../actions/reports';

export class TeamsFilter extends Component {
    componentWillUnmount() {
        this.props.closePlayerAveragesMenu('teamSelectOpen');
    }

    handleTeamSelectMenu = () => {
        if (this.props.playerAverages.teamSelectOpen) {
            this.props.closePlayerAveragesMenu('teamSelectOpen');
        } else {
            this.props.openPlayerAveragesMenu('teamSelectOpen');
        }
    };

    handleCloseTeamSelectMenu = () => {
        this.props.closePlayerAveragesMenu('teamSelectOpen');
    };

    handleModifyTeam = teamId => {
        this.handleCloseTeamSelectMenu();
        this.props.showLoader();
        this.props.getPlayerAveragesRequest(
            teamId,
            this.props.playerAverages.chartType,
            this.props.playerAverages.chartStartDate,
            this.props.playerAverages.chartEndDate
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.playerAverages.teamSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTeamSelectMenu}
                >
                    {this.props.playerAverages.teamId && this.props.teams.length
                        ? this.props.teams.find(
                              team =>
                                  team.id === this.props.playerAverages.teamId
                          ).name
                        : 'Select team'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.playerAverages.teamSelectOpen
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
                                    this.props.playerAverages.teamId === team.id
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
    playerAverages: state.reports.playerAverages,
    teams: state.reports.teams
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openPlayerAveragesMenu: menu => dispatch(openPlayerAveragesMenu(menu)),
    closePlayerAveragesMenu: menu => dispatch(closePlayerAveragesMenu(menu)),
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
)(TeamsFilter);
