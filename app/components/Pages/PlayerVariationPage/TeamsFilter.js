import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getPlayerVariationRequest,
    openPlayerVariationMenu,
    closePlayerVariationMenu
} from '../../../actions/reports';

export class TeamsFilter extends Component {
    handleTeamSelectMenu = () => {
        if (this.props.playerVariation.teamSelectOpen) {
            this.props.closePlayerVariationMenu('teamSelectOpen');
        } else {
            this.props.openPlayerVariationMenu('teamSelectOpen');
        }
    };

    handleCloseTeamSelectMenu = () => {
        this.props.closePlayerVariationMenu('teamSelectOpen');
    };

    handleModifyTeam = teamId => {
        this.handleCloseTeamSelectMenu();
        this.props.showLoader();
        this.props.getPlayerVariationRequest(
            teamId,
            this.props.playerVariation.chartType,
            this.props.playerVariation.chartStartDate,
            this.props.playerVariation.chartEndDate
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.playerVariation.teamSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTeamSelectMenu}
                >
                    {this.props.playerVariation.teamId
                        ? this.props.teams.find(
                              team =>
                                  team.id === this.props.playerVariation.teamId
                          ).name
                        : 'Select team'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.playerVariation.teamSelectOpen
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
                                    this.props.playerVariation.teamId ===
                                    team.id
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
    playerVariation: state.reports.playerVariation,
    teams: state.reports.teams
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openPlayerVariationMenu: menu => dispatch(openPlayerVariationMenu(menu)),
    closePlayerVariationMenu: menu => dispatch(closePlayerVariationMenu(menu)),
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
)(TeamsFilter);
