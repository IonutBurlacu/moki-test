import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addTeamsListFilter,
    removeTeamsListFilter,
    clearTeamsListFilter,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';

export class FilterBy extends Component {
    handleFilterSelectMenu = () => {
        if (this.props.filterSelectOpen) {
            this.props.closeTeamsMenu('filterSelectOpen');
        } else {
            this.props.openTeamsMenu('filterSelectOpen');
        }
    };

    handleCloseFilterSelectMenu = () => {
        this.props.closeTeamsMenu('filterSelectOpen');
    };

    handleFiltersSelectMenu = filterValue => {
        if (this.props.listFilterValues.includes(filterValue)) {
            this.props.removeTeamsListFilter(filterValue);
        } else {
            this.props.addTeamsListFilter(filterValue);
        }
        this.handleCloseFilterSelectMenu();
    };

    handleClearFilterSelectMenu = () => {
        this.props.clearTeamsListFilter();
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
    listFilterValues: state.teams.listFilterValues,
    teams: state.teams.items,
    filterSelectOpen: state.teams.filterSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    addTeamsListFilter: filterValue =>
        dispatch(addTeamsListFilter(filterValue)),
    removeTeamsListFilter: filterValue =>
        dispatch(removeTeamsListFilter(filterValue)),
    clearTeamsListFilter: () => dispatch(clearTeamsListFilter())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
