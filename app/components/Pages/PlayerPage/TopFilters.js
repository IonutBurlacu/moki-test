import React, { Component } from 'react';
import DateBy from './DateBy';

export class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters">
                <div className="left-side" />
                <div className="center-side">
                    <DateBy />
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button type="button" className="filter-button">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
