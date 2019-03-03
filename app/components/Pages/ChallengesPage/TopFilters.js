import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import FilterBy from './FilterBy';
import {
    changeChallengesListDate,
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
                        startDate={this.props.listStartDate}
                        endDate={this.props.listEndDate}
                        dateSelectOpen={this.props.dateSelectOpen}
                        fetchNewData={this.props.getChallengesRequest}
                        changeDateType={this.props.changeChallengesListDate}
                        openMenu={this.props.openChallengesMenu}
                        closeMenu={this.props.closeChallengesMenu}
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
    listDate: state.challenges.listDate,
    listStartDate: state.challenges.listStartDate,
    listEndDate: state.challenges.listEndDate,
    dateSelectOpen: state.challenges.dateSelectOpen
});

const mapDispatchToProps = dispatch => ({
    openChallengesMenu: menu => dispatch(openChallengesMenu(menu)),
    closeChallengesMenu: menu => dispatch(closeChallengesMenu(menu)),
    changeChallengesListDate: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeChallengesListDate(listDate, listStartDate, listEndDate)
        ),
    getChallengesRequest: (
        listDate,
        listStartDate = moment.utc().local(),
        listEndDate = moment.utc().local()
    ) => dispatch(getChallengesRequest(listDate, listStartDate, listEndDate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
