import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';
import {
    changeChallengesDateByType,
    getChallengesRequest,
    openChallengesMenu,
    closeChallengesMenu
} from '../../../actions/challenges';

export class TopFilters extends Component {
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
                        fetchNewData={this.props.getChallengesRequest}
                        changeDateType={this.props.changeChallengesDateByType}
                        openMenu={this.props.openChallengesMenu}
                        closeMenu={this.props.closeChallengesMenu}
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
    dateByType: state.challenges.dateByType,
    dateByStartDate: state.challenges.dateByStartDate,
    dateByEndDate: state.challenges.dateByEndDate,
    dateSelectOpen: state.challenges.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openChallengesMenu: menu => dispatch(openChallengesMenu(menu)),
    closeChallengesMenu: menu => dispatch(closeChallengesMenu(menu)),
    changeChallengesDateByType: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeChallengesDateByType(
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        ),
    getChallengesRequest: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            getChallengesRequest(dateByType, dateByStartDate, dateByEndDate)
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
