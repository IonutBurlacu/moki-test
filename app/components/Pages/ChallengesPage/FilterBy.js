import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addChallengesListFilter,
    removeChallengesListFilter,
    clearChallengesListFilter,
    openChallengesMenu,
    closeChallengesMenu
} from '../../../actions/challenges';

export class FilterBy extends Component {
    handleFilterSelectMenu = () => {
        if (this.props.filterSelectOpen) {
            this.props.closeChallengesMenu('filterSelectOpen');
        } else {
            this.props.openChallengesMenu('filterSelectOpen');
        }
    };

    handleCloseFilterSelectMenu = () => {
        this.props.closeChallengesMenu('filterSelectOpen');
    };

    handleFiltersSelectMenu = filterValue => {
        if (this.props.listFilterValues.includes(filterValue)) {
            this.props.removeChallengesListFilter(filterValue);
        } else {
            this.props.addChallengesListFilter(filterValue);
        }
    };

    handleClearFilterSelectMenu = () => {
        this.props.clearChallengesListFilter();
        this.handleCloseFilterSelectMenu();
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.filterSelectOpen ||
                        this.props.listFilterValues.length
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterSelectMenu}
                >
                    {this.props.listFilterValues.length
                        ? 'Filters On'
                        : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.filterSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Filter By
                        {this.props.listFilterValues.length ? (
                            <button
                                type="button"
                                className="clear"
                                onClick={this.handleClearFilterSelectMenu}
                            >
                                Clear
                            </button>
                        ) : (
                            ''
                        )}
                        <button
                            type="button"
                            onClick={this.handleCloseFilterSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        {this.props.teams.map(team => (
                            <li
                                key={team.id}
                                className={
                                    this.props.listFilterValues.includes(
                                        team.id
                                    )
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleFiltersSelectMenu(team.id)
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
    listFilterValues: state.challenges.listFilterValues,
    teams: state.challenges.teams,
    filterSelectOpen: state.challenges.filterSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openChallengesMenu: menu => dispatch(openChallengesMenu(menu)),
    closeChallengesMenu: menu => dispatch(closeChallengesMenu(menu)),
    addChallengesListFilter: filterValue =>
        dispatch(addChallengesListFilter(filterValue)),
    removeChallengesListFilter: filterValue =>
        dispatch(removeChallengesListFilter(filterValue)),
    clearChallengesListFilter: () => dispatch(clearChallengesListFilter())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
