import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addPlayersListFilter,
    removePlayersListFilter,
    clearPlayersListFilter,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';

export class FilterBy extends Component {
    componentWillUnmount() {
        // We do this to close all the dropdowns on screen change.
        this.props.openPlayersMenu();
    }

    handleFilterSelectMenu = () => {
        if (this.props.filterSelectOpen) {
            this.props.closePlayersMenu('filterSelectOpen');
        } else {
            this.props.openPlayersMenu('filterSelectOpen');
        }
    };

    handleCloseFilterSelectMenu = () => {
        this.props.closePlayersMenu('filterSelectOpen');
    };

    handleFiltersSelectMenu = filterValue => {
        if (this.props.listFilterValues.includes(filterValue)) {
            this.props.removePlayersListFilter(filterValue);
        } else {
            this.props.addPlayersListFilter(filterValue);
        }
    };

    handleClearFilterSelectMenu = () => {
        this.props.clearPlayersListFilter();
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
    listFilterValues: state.players.listFilterValues,
    teams: state.players.teams,
    filterSelectOpen: state.players.filterSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu)),
    addPlayersListFilter: filterValue =>
        dispatch(addPlayersListFilter(filterValue)),
    removePlayersListFilter: filterValue =>
        dispatch(removePlayersListFilter(filterValue)),
    clearPlayersListFilter: () => dispatch(clearPlayersListFilter())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
