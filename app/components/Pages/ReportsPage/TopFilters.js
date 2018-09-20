import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    getReportsTeamsRequest,
    statsReportsTeamsRequest,
    applyFilterToDataA,
    applyFilterToDataB,
    removeFilterFromDataA,
    removeFilterFromDataB
} from '../../../actions/reports';
import DataBTeams from './DataBTeams';
import DataATeams from './DataATeams';
import DataAFilters from './DataAFilters';
import DataBFilters from './DataBFilters';

export class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <DataATeams />
                    <DataAFilters />
                </div>
                <div className="center-side">
                    <div className="filter-wrapper">
                        <button type="button" className="filter-button">
                            Export
                        </button>
                    </div>
                </div>
                <div className="right-side">
                    <DataBTeams />
                    <DataBFilters />
                </div>
            </div>
        );
    }
}

export default TopFilters;
