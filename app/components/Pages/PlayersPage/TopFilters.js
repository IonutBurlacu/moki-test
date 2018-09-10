import React, { Component } from 'react';

export class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters">
                <div className="filter">
                    <button
                        type="button"
                        className="filter-button sort-by filter-with-tick"
                    >
                        Sort by: Fewest steps
                    </button>
                </div>
                <div className="filter align-center">
                    <button
                        type="button"
                        className="filter-button date filter-with-tick"
                    >
                        Today
                    </button>
                </div>
                <div className="filter align-right">
                    <button
                        type="button"
                        className="filter-button filter-by filter-with-tick"
                    >
                        Filter
                    </button>
                </div>
            </div>
        );
    }
}

export default TopFilters;
