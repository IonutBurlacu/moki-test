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
import duration from '../../../utils/duration';
import dateLegend from '../../../utils/dateLegend';
import tickFormatter from '../../../utils/tickFormatter';

const COLORS = ['#fe335e', '#fc9cac', '#fee300', '#23dec8', '#74ef5c'];

export class TotalStepsChart extends Component {
    render() {
        const chartData =
            this.props.totalSteps.chartType === 'steps'
                ? this.props.totalSteps.data.steps
                : this.props.totalSteps.data.mvpa;
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
                            <p className="date">
                                {dateLegend(
                                    this.props.totalSteps.dateByType,
                                    this.props.totalSteps.dateByStartDate,
                                    this.props.totalSteps.dateByEndDate
                                )}
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart">
                    <ResponsiveContainer width="99%">
                        <ComposedChart
                            data={chartData}
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
                                tickFormatter={tickFormatter}
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
                                {chartData.map((entry, index) => {
                                    const color = COLORS[4];
                                    // if (
                                    //     entry.total_steps_overview <
                                    //     this.props.scales.first_step *
                                    //         this.props.totalSteps
                                    //             .playersCount
                                    // ) {
                                    //     color = COLORS[0];
                                    // } else if (
                                    //     entry.total_steps_overview <
                                    //     this.props.scales.second_step *
                                    //         this.props.totalSteps
                                    //             .playersCount
                                    // ) {
                                    //     color = COLORS[1];
                                    // } else if (
                                    //     entry.total_steps_overview <
                                    //     this.props.scales.third_step *
                                    //         this.props.totalSteps
                                    //             .playersCount
                                    // ) {
                                    //     color = COLORS[2];
                                    // } else if (
                                    //     entry.total_steps_overview <
                                    //     this.props.scales.fourth_step *
                                    //         this.props.totalSteps
                                    //             .playersCount
                                    // ) {
                                    //     color = COLORS[3];
                                    // } else {
                                    //     color = COLORS[4];
                                    // }
                                    return <Cell key={index} fill={color} />;
                                })}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-line">
                        <div className="left-side">
                            <span className="total">
                                MVPA:{' '}
                                <span className="number-grey">
                                    {duration(this.props.totalSteps.totalMvpa)}
                                </span>
                            </span>
                            {this.props.totalSteps.totalMvpa -
                                this.props.totalSteps.previous.mvpa !==
                            0 ? (
                                <span
                                    className={
                                        this.props.totalSteps.totalMvpa >
                                        this.props.totalSteps.previous.mvpa
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.totalSteps.previous.mvpa > 0 ? (
                                        <span className="percentage">
                                            {this.props.totalSteps.totalMvpa >
                                            this.props.totalSteps.previous.mvpa
                                                ? this.props.totalSteps.previous
                                                      .mvpa > 0
                                                    ? (
                                                          (this.props.totalSteps
                                                              .totalMvpa *
                                                              100) /
                                                              this.props
                                                                  .totalSteps
                                                                  .previous
                                                                  .mvpa -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.totalSteps
                                                          .totalMvpa
                                                : this.props.totalSteps
                                                      .totalMvpa > 0
                                                ? (
                                                      ((this.props.totalSteps
                                                          .previous.mvpa -
                                                          this.props.totalSteps
                                                              .totalMvpa) *
                                                          100) /
                                                      this.props.totalSteps
                                                          .previous.mvpa
                                                  ).toFixed(0)
                                                : 100}
                                            %
                                        </span>
                                    ) : (
                                        <span className="percentage">NA</span>
                                    )}
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
                                Steps:{' '}
                                <span className="number-green">
                                    {this.props.totalSteps.totalSteps.toLocaleString()}
                                </span>
                                <span className="label-green">steps</span>
                            </span>
                            {this.props.totalSteps.totalSteps -
                                this.props.totalSteps.previous.steps !==
                            0 ? (
                                <span
                                    className={
                                        this.props.totalSteps.totalSteps >
                                        this.props.totalSteps.previous.steps
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.totalSteps.previous.steps >
                                    0 ? (
                                        <span className="percentage">
                                            {this.props.totalSteps.totalSteps >
                                            this.props.totalSteps.previous.steps
                                                ? this.props.totalSteps.previous
                                                      .steps > 0
                                                    ? (
                                                          (this.props.totalSteps
                                                              .totalSteps *
                                                              100) /
                                                              this.props
                                                                  .totalSteps
                                                                  .previous
                                                                  .steps -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.totalSteps
                                                          .totalSteps
                                                : this.props.totalSteps
                                                      .totalSteps > 0
                                                ? (
                                                      ((this.props.totalSteps
                                                          .previous.steps -
                                                          this.props.totalSteps
                                                              .totalSteps) *
                                                          100) /
                                                      this.props.totalSteps
                                                          .previous.steps
                                                  ).toFixed(0)
                                                : 100}
                                            %
                                        </span>
                                    ) : (
                                        <span className="percentage">NA</span>
                                    )}
                                </span>
                            ) : (
                                <span className="positive">
                                    <span className="percentage-icon" />
                                    <span className="percentage">0%</span>
                                </span>
                            )}
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
    scales: state.reports.scales,
    loading: state.reports.loading
});

export default connect(mapStateToProps, null)(TotalStepsChart);
