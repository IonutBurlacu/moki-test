import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeDownloadPdfTeamsListSort,
    openDownloadPdfMenu,
    closeDownloadPdfMenu
} from '../../../actions/reports';

export class SortBy extends Component {
    handleSortSelectMenu = () => {
        if (this.props.downloadPdf.sortSelectOpen) {
            this.props.closeDownloadPdfMenu('sortSelectOpen');
        } else {
            this.props.openDownloadPdfMenu('sortSelectOpen');
        }
    };

    handleCloseSortSelectMenu = () => {
        this.props.closeDownloadPdfMenu('sortSelectOpen');
    };

    handleSortSelectChange = (listSort, listSortLabel) => {
        this.props.changeDownloadPdfTeamsListSort(listSort, listSortLabel);
        this.handleCloseSortSelectMenu();
    };

    render() {
        return (
            <div className="filter-wrapper sort-filter">
                <button
                    type="button"
                    className={
                        this.props.downloadPdf.sortSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleSortSelectMenu}
                >
                    Sort by: {this.props.downloadPdf.listSortLabel}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.downloadPdf.sortSelectOpen
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
                                this.props.downloadPdf.listSort === 'most_steps'
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
                                this.props.downloadPdf.listSort ===
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
                                this.props.downloadPdf.listSort === 'name_asc'
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
                                this.props.downloadPdf.listSort === 'name_desc'
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
                                this.props.downloadPdf.listSort === 'increase'
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
                                this.props.downloadPdf.listSort === 'decrease'
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
    downloadPdf: state.reports.downloadPdf
});

const mapDispatchToProps = dispatch => ({
    openDownloadPdfMenu: menu => dispatch(openDownloadPdfMenu(menu)),
    closeDownloadPdfMenu: menu => dispatch(closeDownloadPdfMenu(menu)),
    changeDownloadPdfTeamsListSort: (listSort, listSortLabel) =>
        dispatch(changeDownloadPdfTeamsListSort(listSort, listSortLabel))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
