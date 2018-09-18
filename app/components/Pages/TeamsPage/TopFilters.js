import React, { Component } from 'react';
import SortBy from './SortBy';
import DateBy from './DateBy';
import FilterBy from './FilterBy';

export class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <SortBy />
                </div>
                <div className="center-side">
                    <DateBy />
                </div>
                <div className="right-side">
                    <FilterBy />
                </div>
            </div>
        );
    }
}

export default TopFilters;
