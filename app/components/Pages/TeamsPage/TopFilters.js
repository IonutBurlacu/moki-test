import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    changeTeamsListDate,
    getTeamsRequest,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';

export class TopFilters extends Component {
    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <SortBy />
                </div>
                <div className="center-side">
                    <DateBy
                        startDate={this.props.listStartDate}
                        endDate={this.props.listEndDate}
                        dateSelectOpen={this.props.dateSelectOpen}
                        fetchNewData={this.props.getTeamsRequest}
                        changeDateType={this.props.changeTeamsListDate}
                        openMenu={this.props.openTeamsMenu}
                        closeMenu={this.props.closeTeamsMenu}
                        type={this.props.listDate}
                    />
                </div>
                <div className="right-side">
                    <FilterBy />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listDate: state.teams.listDate,
    listStartDate: state.teams.listStartDate,
    listEndDate: state.teams.listEndDate,
    dateSelectOpen: state.teams.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    changeTeamsListDate: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) => dispatch(changeTeamsListDate(listDate, listStartDate, listEndDate)),
    getTeamsRequest: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) => dispatch(getTeamsRequest(listDate, listStartDate, listEndDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
