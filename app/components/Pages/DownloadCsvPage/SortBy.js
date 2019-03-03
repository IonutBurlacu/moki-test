import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeDownloadCsvTeamsListSort,
    openDownloadCsvMenu,
    closeDownloadCsvMenu
} from '../../../actions/reports';

export class SortBy extends Component {
    handleSortSelectMenu = () => {
        if (this.props.downloadCsv.sortSelectOpen) {
            this.props.closeDownloadCsvMenu('sortSelectOpen');
        } else {
            this.props.openDownloadCsvMenu('sortSelectOpen');
        }
    };

    handleCloseSortSelectMenu = () => {
        this.props.closeDownloadCsvMenu('sortSelectOpen');
    };

    handleSortSelectChange = (listSort, listSortLabel) => {
        this.props.changeDownloadCsvTeamsListSort(listSort, listSortLabel);
        this.handleCloseSortSelectMenu();
    };

    render() {
        return (
            <div className="filter-wrapper sort-filter">
                <button
                    type="button"
                    className={
                        this.props.downloadCsv.sortSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleSortSelectMenu}
                >
                    Sort by: {this.props.downloadCsv.listSortLabel}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.downloadCsv.sortSelectOpen
                            ? 'block'
                            : 'none'
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
                                this.props.downloadCsv.listSort === 'most_steps'
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
                                this.props.downloadCsv.listSort ===
                                'fewest_steps'
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
                                this.props.downloadCsv.listSort === 'name_asc'
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
                                this.props.downloadCsv.listSort === 'name_desc'
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
                                this.props.downloadCsv.listSort === 'increase'
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
                                this.props.downloadCsv.listSort === 'decrease'
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
    downloadCsv: state.reports.downloadCsv
});

const mapDispatchToProps = dispatch => ({
    openDownloadCsvMenu: menu => dispatch(openDownloadCsvMenu(menu)),
    closeDownloadCsvMenu: menu => dispatch(closeDownloadCsvMenu(menu)),
    changeDownloadCsvTeamsListSort: (listSort, listSortLabel) =>
        dispatch(changeDownloadCsvTeamsListSort(listSort, listSortLabel))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
