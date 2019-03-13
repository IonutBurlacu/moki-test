import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    changeTeamsDateByType,
    getTeamsRequest,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';
import { changePlayersDateByType } from '../../../actions/players';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';

export class TopFilters extends Component {
    changeDateByType = (dateByType, dateByStartDate, dateByEndDate) => {
        this.props.changePlayersDateByType(
            dateByType,
            dateByStartDate,
            dateByEndDate
        );
        this.props.changeTeamsDateByType(
            dateByType,
            dateByStartDate,
            dateByEndDate
        );
    };

    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <SortBy />
                </div>
                <div className="center-side">
                    <DateBy
                        startDate={this.props.dateByStartDate}
                        endDate={this.props.dateByEndDate}
                        dateSelectOpen={this.props.dateSelectOpen}
                        fetchNewData={this.props.getTeamsRequest}
                        changeDateType={this.changeDateByType}
                        openMenu={this.props.openTeamsMenu}
                        closeMenu={this.props.closeTeamsMenu}
                        type={this.props.dateByType}
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
    dateByType: state.teams.dateByType,
    dateByStartDate: state.teams.dateByStartDate,
    dateByEndDate: state.teams.dateByEndDate,
    dateSelectOpen: state.teams.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    changePlayersDateByType: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            changePlayersDateByType(dateByType, dateByStartDate, dateByEndDate)
        ),
    changeTeamsDateByType: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeTeamsDateByType(dateByType, dateByStartDate, dateByEndDate)
        ),
    getTeamsRequest: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) => dispatch(getTeamsRequest(dateByType, dateByStartDate, dateByEndDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
