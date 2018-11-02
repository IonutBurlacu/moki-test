import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeTeamsListSort,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';

export class SortBy extends Component {
    handleSortSelectMenu = () => {
        if (this.props.sortSelectOpen) {
            this.props.closeTeamsMenu('sortSelectOpen');
        } else {
            this.props.openTeamsMenu('sortSelectOpen');
        }
    };

    handleCloseSortSelectMenu = () => {
        this.props.closeTeamsMenu('sortSelectOpen');
    };

    handleSortSelectChange = (listSort, listSortLabel) => {
        this.props.changeTeamsListSort(listSort, listSortLabel);
        this.handleCloseSortSelectMenu();
    };

    render() {
        return (
            <div className="filter-wrapper sort-filter">
                <button
                    type="button"
                    className={
                        this.props.sortSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleSortSelectMenu}
                >
                    Sort by: {this.props.listSortLabel}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.sortSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Sort By
                        <button
                            type="button"
                            onClick={this.handleCloseSortSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.listSort === 'most_steps'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'most_steps',
                                        'Most steps'
                                    )
                                }
                            >
                                Most steps
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'fewest_steps'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'fewest_steps',
                                        'Fewest steps'
                                    )
                                }
                            >
                                Fewest steps
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'name_asc'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'name_asc',
                                        'Name A-Z'
                                    )
                                }
                            >
                                Name A-Z
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'name_desc'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'name_desc',
                                        'Name Z-A'
                                    )
                                }
                            >
                                Name Z-A
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'increase'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'increase',
                                        '% Increase'
                                    )
                                }
                            >
                                % Increase
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'decrease'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'decrease',
                                        '% Decrease'
                                    )
                                }
                            >
                                % Decrease
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listSort: state.teams.listSort,
    listSortLabel: state.teams.listSortLabel,
    sortSelectOpen: state.teams.sortSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    changeTeamsListSort: (listSort, listSortLabel) =>
        dispatch(changeTeamsListSort(listSort, listSortLabel))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
