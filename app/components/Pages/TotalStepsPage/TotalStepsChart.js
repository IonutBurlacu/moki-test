import React, { Component } from 'react';
import {
    ComposedChart,
    Bar,
    Cell,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import moment from 'moment';

const COLORS = ['#fe335e', '#fc9cac', '#fee300', '#23dec8', '#74ef5c'];

export class TotalStepsChart extends Component {
    getDateLegend = () => {
        switch (this.props.totalSteps.dateByType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(this.props.totalSteps.dateByStartDate).format(
                    'D'
                )} - ${moment(this.props.totalSteps.dateByEndDate).format(
                    'D MMMM YYYY'
                )}`;
            case 'month':
                return `${moment(this.props.totalSteps.dateByStartDate).format(
                    'D'
                )} - ${moment(this.props.totalSteps.dateByEndDate).format(
                    'D MMMM YYYY'
                )}`;
            case 'year':
                return `${moment(this.props.totalSteps.dateByStartDate).format(
                    'MMM'
                )} - ${moment(this.props.totalSteps.dateByEndDate).format(
                    'MMM YYYY'
                )}`;
            case 'interval':
                return `${moment(this.props.totalSteps.dateByStartDate).format(
                    'D MMM YYYY'
                )} - ${moment(this.props.totalSteps.dateByEndDate).format(
                    'D MMM YYYY'
                )}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        const { totalOverview, totalOverviewPrevious } = this.props.totalSteps;
        return (
            <div className="chart-container">
                <div className="legend">
                    {this.props.totalSteps.teamId && this.props.teams.length ? (
                        <div>
                            <p className="team">
                                {
                                    this.props.teams.find(
                                        team =>
                                            team.id ===
                                            this.props.totalSteps.teamId
                                    ).name
                                }
                            </p>
                            <p className="date">{this.getDateLegend()}</p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart">
                    <ResponsiveContainer width="99%">
                        <ComposedChart
                            data={this.props.totalSteps.data.current}
                            barCategoryGap={5}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 10,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid stroke="#53535d" vertical={false} />
                            <XAxis dataKey="x_axis" stroke="#f6f6f7" />
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
                                        return `${(number / 1000).toString()}K`;
                                    }
                                    return number.toString();
                                }}
                            />
                            <Tooltip
                                cursor={false}
                                labelFormatter={label => {
                                    const weekDays = [
                                        'MON',
                                        'TUE',
                                        'WED',
                                        'THU',
                                        'FRI',
                                        'SAT',
                                        'SUN'
                                    ];
                                    switch (this.props.totalSteps.dateByType) {
                                        case 'today':
                                            return moment().format(
                                                'DD/MM/YYYY'
                                            );
                                        case 'week':
                                            return moment()
                                                .startOf('isoWeek')
                                                .day(
                                                    weekDays.indexOf(label) + 1
                                                )
                                                .format('DD/MM/YYYY');
                                        case 'month':
                                            return moment()
                                                .startOf('month')
                                                .date(label)
                                                .format('DD/MM/YYYY');
                                        case 'year':
                                            return moment()
                                                .startOf('year')
                                                .month(label)
                                                .startOf('month')
                                                .format('MMM YYYY');
                                        case 'interval':
                                            if (
                                                this.props.totalSteps.dateByEndDate.diff(
                                                    this.props.totalSteps
                                                        .dateByStartDate,
                                                    'months'
                                                ) >= 1
                                            ) {
                                                return moment(
                                                    this.props.totalSteps
                                                        .dateByStartDate
                                                )
                                                    .startOf('year')
                                                    .month(label)
                                                    .startOf('month')
                                                    .format('MMM YYYY');
                                            }
                                            if (
                                                this.props.totalSteps.dateByEndDate.diff(
                                                    this.props.totalSteps
                                                        .dateByStartDate,
                                                    'weeks'
                                                ) >= 1
                                            ) {
                                                return moment(
                                                    this.props.totalSteps
                                                        .dateByStartDate
                                                )
                                                    .startOf('month')
                                                    .date(label)
                                                    .format('DD/MM/YYYY');
                                            }
                                            if (
                                                this.props.totalSteps.dateByEndDate.diff(
                                                    this.props.totalSteps
                                                        .dateByStartDate,
                                                    'days'
                                                ) >= 1
                                            ) {
                                                return moment(
                                                    this.props.totalSteps
                                                        .dateByStartDate
                                                )
                                                    .startOf('isoWeek')
                                                    .day(
                                                        weekDays.indexOf(
                                                            label
                                                        ) + 1
                                                    )
                                                    .format('DD/MM/YYYY');
                                            }
                                            return moment(
                                                this.props.totalSteps
                                                    .dateByStartDate
                                            ).format('DD/MM/YYYY');

                                        default:
                                            return moment().format(
                                                'DD/MM/YYYY'
                                            );
                                    }
                                }}
                                formatter={value =>
                                    new Intl.NumberFormat('en').format(value)
                                }
                            />
                            <Bar
                                dataKey="total_steps_overview"
                                name="Total Steps"
                                maxBarSize={70}
                            >
                                {this.props.totalSteps.data.current.map(
                                    (entry, index) => {
                                        let color;
                                        if (
                                            entry.total_steps_overview <
                                            this.props.scales.first_step *
                                                this.props.totalSteps
                                                    .playersCount
                                        ) {
                                            color = COLORS[0];
                                        } else if (
                                            entry.total_steps_overview <
                                            this.props.scales.second_step *
                                                this.props.totalSteps
                                                    .playersCount
                                        ) {
                                            color = COLORS[1];
                                        } else if (
                                            entry.total_steps_overview <
                                            this.props.scales.third_step *
                                                this.props.totalSteps
                                                    .playersCount
                                        ) {
                                            color = COLORS[2];
                                        } else if (
                                            entry.total_steps_overview <
                                            this.props.scales.fourth_step *
                                                this.props.totalSteps
                                                    .playersCount
                                        ) {
                                            color = COLORS[3];
                                        } else {
                                            color = COLORS[4];
                                        }
                                        return (
                                            <Cell key={index} fill={color} />
                                        );
                                    }
                                )}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-line">
                        <div className="left-side">
                            <span className="total">
                                Typical:{' '}
                                <span className="number-grey">
                                    {this.props.totalSteps.totalTypical.toLocaleString()}
                                </span>
                                <span className="label-grey">steps</span>
                            </span>
                        </div>
                        <div className="center-side">
                            <span>Trend:</span>
                            {totalOverview - totalOverviewPrevious !== 0 ? (
                                <span
                                    className={
                                        totalOverview > totalOverviewPrevious
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    <span className="percentage">
                                        {totalOverview > totalOverviewPrevious
                                            ? totalOverviewPrevious > 0
                                                ? (
                                                      (totalOverview * 100) /
                                                          totalOverviewPrevious -
                                                      100
                                                  ).toFixed(0)
                                                : totalOverview
                                            : totalOverview > 0
                                                ? (
                                                      ((totalOverviewPrevious -
                                                          totalOverview) *
                                                          100) /
                                                      totalOverviewPrevious
                                                  ).toFixed(0)
                                                : 100}
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
                                <span className="number-green">
                                    {this.props.totalSteps.totalOverview.toLocaleString()}
                                </span>
                                <span className="label-green">steps</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    totalSteps: state.reports.totalSteps,
    scales: state.reports.scales
});

export default connect(
    mapStateToProps,
    null
)(TotalStepsChart);
