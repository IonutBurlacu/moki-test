import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changePlayersListSort,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';

export class SortBy extends Component {
    handleSortSelectMenu = () => {
        if (this.props.sortSelectOpen) {
            this.props.closePlayersMenu('sortSelectOpen');
        } else {
            this.props.openPlayersMenu('sortSelectOpen');
        }
    };

    handleCloseSortSelectMenu = () => {
        this.props.closePlayersMenu('sortSelectOpen');
    };

    handleSortSelectChange = (listSort, listSortLabel) => {
        this.props.changePlayersListSort(listSort, listSortLabel);
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
                                this.props.listSort === 'most_mvpa'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'most_mvpa',
                                        'Highest MVPA'
                                    )
                                }
                            >
                                Highest MVPA
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'fewest_mvpa'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'fewest_mvpa',
                                        'Lowest MVPA'
                                    )
                                }
                            >
                                Lowest MVPA
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'most_moki_grade'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'most_moki_grade',
                                        'Highest Moki Grade'
                                    )
                                }
                            >
                                Highest Moki Grade
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'fewest_moki_grade'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'fewest_moki_grade',
                                        'Lowest Moki Grade'
                                    )
                                }
                            >
                                Lowest Moki Grade
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
                        <li
                            className={
                                this.props.listSort === 'age_desc'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'age_desc',
                                        'Oldest to Youngest'
                                    )
                                }
                            >
                                Oldest to Youngest
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listSort === 'age_asc'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleSortSelectChange(
                                        'age_asc',
                                        'Youngest to Oldest'
                                    )
                                }
                            >
                                Youngest to Oldest
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listSort: state.players.listSort,
    listSortLabel: state.players.listSortLabel,
    sortSelectOpen: state.players.sortSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu)),
    changePlayersListSort: (listSort, listSortLabel) =>
        dispatch(changePlayersListSort(listSort, listSortLabel))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
