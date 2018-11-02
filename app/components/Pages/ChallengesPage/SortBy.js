import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeChallengesListSort,
    openChallengesMenu,
    closeChallengesMenu
} from '../../../actions/challenges';

export class SortBy extends Component {
    handleSortSelectMenu = () => {
        if (this.props.sortSelectOpen) {
            this.props.closeChallengesMenu('sortSelectOpen');
        } else {
            this.props.openChallengesMenu('sortSelectOpen');
        }
    };

    handleCloseSortSelectMenu = () => {
        this.props.closeChallengesMenu('sortSelectOpen');
    };

    handleSortSelectChange = (listSort, listSortLabel) => {
        this.props.changeChallengesListSort(listSort, listSortLabel);
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
    listSort: state.challenges.listSort,
    listSortLabel: state.challenges.listSortLabel,
    sortSelectOpen: state.challenges.sortSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openChallengesMenu: menu => dispatch(openChallengesMenu(menu)),
    closeChallengesMenu: menu => dispatch(closeChallengesMenu(menu)),
    changeChallengesListSort: (listSort, listSortLabel) =>
        dispatch(changeChallengesListSort(listSort, listSortLabel))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
