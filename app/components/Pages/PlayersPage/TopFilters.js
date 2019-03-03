import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';
import {
    changePlayersListDate,
    getPlayersRequest,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';

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
                        fetchNewData={this.props.getPlayersRequest}
                        changeDateType={this.props.changePlayersListDate}
                        openMenu={this.props.openPlayersMenu}
                        closeMenu={this.props.closePlayersMenu}
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
    listDate: state.players.listDate,
    listStartDate: state.players.listStartDate,
    listEndDate: state.players.listEndDate,
    dateSelectOpen: state.players.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu)),
    changePlayersListDate: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) => dispatch(changePlayersListDate(listDate, listStartDate, listEndDate)),
    getPlayersRequest: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) => dispatch(getPlayersRequest(listDate, listStartDate, listEndDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
