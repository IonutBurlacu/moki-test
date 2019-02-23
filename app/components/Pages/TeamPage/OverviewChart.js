import React, { Component } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    statsTeamRequest,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';
import { showLoader } from '../../../actions/loader';

export class OverviewChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.chartStartDate,
            endDate: props.chartEndDate
        };
    }

    componentWillUnmount() {
        // We do this to close all the dropdowns on screen change.
        this.props.openTeamsMenu();
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

    handleDateChange = type => {
        this.props.showLoader();
        this.props.closeTeamsMenu('dateSelectOverviewOpen');
        this.props.statsTeamRequest(
            this.props.team.id,
            type,
            this.props.chartStartDate,
            this.props.chartEndDate
        );
    };

    handleDateSelectMenu = () => {
        if (this.props.dateSelectOverviewOpen) {
            this.props.closeTeamsMenu('dateSelectOverviewOpen');
        } else {
            this.props.openTeamsMenu('dateSelectOverviewOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeTeamsMenu('dateSelectOverviewOpen');
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
                this.props.showLoader();
                this.props.closeTeamsMenu('dateSelectOverviewOpen');
                this.props.statsTeamRequest(
                    this.props.team.id,
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
            }
        }, 1);
    };

    render() {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h1>Overview</h1>
                    <div className="chart-select-wrapper">
                        <div className="chart-select">
                            <button
                                type="button"
                                className={
                                    this.props.dateSelectOverviewOpen
                                        ? 'chart-select-button active'
                                        : 'chart-select-button'
                                }
                                onClick={this.handleDateSelectMenu}
                            >
                                {this.getSelectedDateType(this.props.chartType)}
                            </button>
                            <div
                                className="chart-select-list-wrapper"
                                style={{
                                    display: this.props.dateSelectOverviewOpen
                                        ? 'block'
                                        : 'none'
                                }}
                            >
                                <div className="chart-select-list-header">
                                    Select Date
                                    <button
                                        type="button"
                                        onClick={this.handleCloseDateSelectMenu}
                                    >
                                        ⨉
                                    </button>
                                </div>
                                <ul className="chart-select-list">
                                    <li
                                        className={
                                            this.props.chartType === 'today'
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('today')
                                            }
                                        >
                                            Today
                                        </button>
                                    </li>
                                    <li
                                        className={
                                            this.props.chartType === 'week'
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('week')
                                            }
                                        >
                                            This Week
                                        </button>
                                    </li>
                                    <li
                                        className={
                                            this.props.chartType === 'month'
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('month')
                                            }
                                        >
                                            This Month
                                        </button>
                                    </li>
                                    <li
                                        className={
                                            this.props.chartType === 'year'
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('year')
                                            }
                                        >
                                            This Year
                                        </button>
                                    </li>
                                    <li
                                        className={
                                            this.props.chartType === 'interval'
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        <DateRange
                                            ranges={[
                                                {
                                                    startDate: this.state
                                                        .startDate,
                                                    endDate: this.state.endDate
                                                }
                                            ]}
                                            className="date-range-picker"
                                            direction="horizontal"
                                            showDateDisplay={false}
                                            rangeColors={['#66667b']}
                                            onChange={
                                                this.handleDateRangeSelect
                                            }
                                            locale={enGb}
                                            onRangeFocusChange={
                                                this.handleDateRangeFocus
                                            }
                                            maxDate={new Date()}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart">
                    {this.props.team.overview.length ? (
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={this.props.team.overview}
                                margin={{
                                    top: 10,
                                    right: 15,
                                    left: 10,
                                    bottom: 10
                                }}
                            >
                                <CartesianGrid
                                    stroke="#53535d"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="x_axis"
                                    stroke="#f6f6f7"
                                    interval={0}
                                />
                                <YAxis
                                    stroke="#f6f6f7"
                                    tickFormatter={number => {
                                        if (number > 1000000000) {
                                            return `${(
                                                number / 1000000000
                                            ).toString()}B`;
                                        }
                                        if (number > 1000000) {
                                            return `${(
                                                number / 1000000
                                            ).toString()}M`;
                                        }
                                        if (number > 1000) {
                                            return `${(
                                                number / 1000
                                            ).toString()}K`;
                                        }
                                        return number.toString();
                                    }}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="total_steps"
                                    name="Steps"
                                    stroke="#fe335e"
                                    strokeWidth="2"
                                    dot={{
                                        stroke: '#fe335e',
                                        strokeWidth: 5
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-line">
                        <div className="left-side" />
                        <div className="center-side">
                            <span>Trend:</span>
                            {this.props.team.totalOverview -
                                this.props.team.totalOverviewPrevious !==
                            0 ? (
                                <span
                                    className={
                                        this.props.team.totalOverview >
                                        this.props.team.totalOverviewPrevious
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    <span className="percentage">
                                        {this.props.team.totalOverview >
                                        this.props.team.totalOverviewPrevious
                                            ? (
                                                  ((this.props.team
                                                      .totalOverview -
                                                      this.props.team
                                                          .totalOverviewPrevious) /
                                                      this.props.team
                                                          .totalOverview) *
                                                  100
                                              ).toFixed(0)
                                            : (
                                                  ((this.props.team
                                                      .totalOverviewPrevious -
                                                      this.props.team
                                                          .totalOverview) /
                                                      this.props.team
                                                          .totalOverviewPrevious) *
                                                  100
                                              ).toFixed(0)}
                                        %
                                    </span>
                                </span>
                            ) : (
                                <span className="positive">
                                    <span className="percentage-icon" />
                                    <span className="percentage">0%</span>
                                </span>
                            )}
                        </div>
                        <div className="right-side">
                            <span className="total">
                                Total:{' '}
                                {this.props.team.totalOverview.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    team: state.teams.team,
    chartType: state.teams.chartType,
    chartStartDate: state.teams.chartStartDate,
    chartEndDate: state.teams.chartEndDate,
    dateSelectOverviewOpen: state.teams.dateSelectOverviewOpen
});

const mapDispatchToProps = dispatch => ({
    statsTeamRequest: (id, type, startDate, endDate) =>
        dispatch(statsTeamRequest(id, type, startDate, endDate)),
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewChart);
