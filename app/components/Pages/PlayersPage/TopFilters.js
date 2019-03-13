import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';
import {
    changePlayersDateByType,
    getPlayersRequest,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';
import { changeTeamsDateByType } from '../../../actions/teams';

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
                        fetchNewData={this.props.getPlayersRequest}
                        changeDateType={this.changeDateByType}
                        openMenu={this.props.openPlayersMenu}
                        closeMenu={this.props.closePlayersMenu}
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
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate,
    dateSelectOpen: state.players.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu)),
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
    getPlayersRequest: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) => dispatch(getPlayersRequest(dateByType, dateByStartDate, dateByEndDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
