import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getTotalStepsRequest,
    openTotalStepsMenu,
    closeTotalStepsMenu
} from '../../../actions/reports';

export class TeamsFilter extends Component {
    componentWillUnmount() {
        this.props.closeTotalStepsMenu('teamSelectOpen');
    }

    handleTeamSelectMenu = () => {
        if (this.props.totalSteps.teamSelectOpen) {
            this.props.closeTotalStepsMenu('teamSelectOpen');
        } else {
            this.props.openTotalStepsMenu('teamSelectOpen');
        }
    };

    handleCloseTeamSelectMenu = () => {
        this.props.closeTotalStepsMenu('teamSelectOpen');
    };

    handleModifyTeam = teamId => {
        this.handleCloseTeamSelectMenu();
        this.props.showLoader();
        this.props.getTotalStepsRequest(
            teamId,
            this.props.totalSteps.dateByType,
            this.props.totalSteps.dateByStartDate,
            this.props.totalSteps.dateByEndDate
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.totalSteps.teamSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTeamSelectMenu}
                >
                    {this.props.totalSteps.teamId && this.props.teams.length
                        ? this.props.teams.find(
                              team => team.id === this.props.totalSteps.teamId
                          ).name
                        : 'Select team'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.totalSteps.teamSelectOpen
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
                                    this.props.totalSteps.teamId === team.id
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
    totalSteps: state.reports.totalSteps,
    teams: state.reports.teams
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openTotalStepsMenu: menu => dispatch(openTotalStepsMenu(menu)),
    closeTotalStepsMenu: menu => dispatch(closeTotalStepsMenu(menu)),
    getTotalStepsRequest: (teamId, dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(
            getTotalStepsRequest(
                teamId,
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsFilter);
