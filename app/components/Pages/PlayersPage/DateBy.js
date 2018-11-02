import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    changePlayersListDate,
    getPlayersRequest,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';
import { showLoader } from '../../../actions/loader';

export class DateBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.listStartDate,
            endDate: props.listEndDate
        };
    }

    getSelectedDateType = type => {
        switch (type) {
            case 'today':
                return 'Today';
            case 'week':
                return 'This Week';
            case 'month':
                return 'This Month';
            case 'year':
                return 'This Year';
            case 'interval':
                return 'Interval';
            default:
                return 'Date';
        }
    };

    handleDateSelectMenu = () => {
        if (this.props.dateSelectOpen) {
            this.props.closePlayersMenu('dateSelectOpen');
        } else {
            this.props.openPlayersMenu('dateSelectOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closePlayersMenu('dateSelectOpen');
    };

    handleDateSelectChange = listDate => {
        this.props.closePlayersMenu('dateSelectOpen');
        this.props.changePlayersListDate(listDate);
        this.props.showLoader();
        this.props.getPlayersRequest(listDate);
    };

    handleDateRangeSelect = ranges => {
        this.setState({
            startDate: moment(ranges.range1.startDate),
            endDate: moment(ranges.range1.endDate)
        });
    };

    handleDateRangeFocus = ranges => {
        setTimeout(() => {
            if (ranges[1] === 0) {
                this.props.closePlayersMenu('dateSelectOpen');
                this.props.changePlayersListDate(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
                this.props.showLoader();
                this.props.getPlayersRequest(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
            }
        }, 1);
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.dateSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDateSelectMenu}
                >
                    {this.getSelectedDateType(this.props.listDate)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.dateSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Date
                        <button
                            type="button"
                            onClick={this.handleCloseDateSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.listDate === 'today'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('today')
                                }
                            >
                                Today
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listDate === 'week' ? 'selected' : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('week')
                                }
                            >
                                This Week
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listDate === 'month'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('month')
                                }
                            >
                                This Month
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listDate === 'year' ? 'selected' : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('year')
                                }
                            >
                                This Year
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listDate === 'interval'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <DateRange
                                ranges={[
                                    {
                                        startDate: this.state.startDate,
                                        endDate: this.state.endDate
                                    }
                                ]}
                                className="date-range-picker"
                                direction="horizontal"
                                showDateDisplay={false}
                                rangeColors={['#66667b']}
                                onChange={this.handleDateRangeSelect}
                                locale={enGb}
                                onRangeFocusChange={this.handleDateRangeFocus}
                                maxDate={new Date()}
                            />
                        </li>
                    </ul>
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
    showLoader: () => dispatch(showLoader()),
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
)(DateBy);
