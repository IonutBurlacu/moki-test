import React, { Component } from 'react';
import {
    ComposedChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import duration from '../../../utils/duration';
import dateLegend from '../../../utils/dateLegend';
import tickFormatter from '../../../utils/tickFormatter';

export class TeamChart extends Component {
    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    <p className="date">
                        {dateLegend(
                            this.props.dateByType,
                            this.props.dateByStartDate,
                            this.props.dateByEndDate
                        )}
                    </p>
                </div>
                <div className="chart">
                    {this.props.team.data.steps.length ? (
                        <ResponsiveContainer width="99%">
                            <ComposedChart
                                data={
                                    this.props.chartType === 'steps'
                                        ? this.props.team.data.steps
                                        : this.props.team.data.mvpa
                                }
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
                                    tickFormatter={value => {
                                        if (
                                            this.props.dateByEndDate.diff(
                                                this.props.dateByStartDate,
                                                'days'
                                            ) === 0
                                        ) {
                                            if (value % 2 === 0) {
                                                return (value / 2)
                                                    .toString()
                                                    .padStart(2, '0');
                                            }
                                            return (
                                                Math.floor(value / 2) + ':30'
                                            );
                                        }
                                        return value;
                                    }}
                                />
                                <YAxis
                                    stroke="#f6f6f7"
                                    tickFormatter={tickFormatter}
                                />
                                <Tooltip
                                    cursor={false}
                                    labelFormatter={value => {
                                        if (
                                            this.props.dateByEndDate.diff(
                                                this.props.dateByStartDate,
                                                'days'
                                            ) === 0
                                        ) {
                                            if (value % 2 === 0) {
                                                return (value / 2)
                                                    .toString()
                                                    .padStart(2, '0');
                                            }
                                            return (
                                                Math.floor(value / 2) + ':30'
                                            );
                                        }
                                        return value;
                                    }}
                                    formatter={value =>
                                        this.props.chartType === 'steps'
                                            ? new Intl.NumberFormat(
                                                  'en'
                                              ).format(value)
                                            : duration(value)
                                    }
                                />
                                <Bar
                                    dataKey="y_axis"
                                    name={
                                        this.props.chartType === 'steps'
                                            ? 'Steps'
                                            : 'MVPA'
                                    }
                                    maxBarSize={70}
                                    fill="#23dec8"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-line">
                        <div className="left-side">
                            <span className="total">
                                MVPA:{' '}
                                <span
                                    className={
                                        this.props.chartType === 'mvpa'
                                            ? 'number-green'
                                            : 'number-grey'
                                    }
                                >
                                    {duration(this.props.team.totalMvpa)}
                                </span>
                            </span>
                            {this.props.team.totalMvpa -
                                this.props.team.previous.mvpa !==
                            0 ? (
                                <span
                                    className={
                                        this.props.team.totalMvpa >
                                        this.props.team.previous.mvpa
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.team.previous.mvpa > 0 ? (
                                        <span className="percentage">
                                            {this.props.team.totalMvpa >
                                            this.props.team.previous.mvpa
                                                ? this.props.team.previous
                                                      .mvpa > 0
                                                    ? (
                                                          (this.props.team
                                                              .totalMvpa *
                                                              100) /
                                                              this.props.team
                                                                  .previous
                                                                  .mvpa -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.team.totalMvpa
                                                : this.props.team.totalMvpa > 0
                                                ? (
                                                      ((this.props.team.previous
                                                          .mvpa -
                                                          this.props.team
                                                              .totalMvpa) *
                                                          100) /
                                                      this.props.team.previous
                                                          .mvpa
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
                                <span
                                    className={
                                        this.props.chartType === 'steps'
                                            ? 'number-green'
                                            : 'number-grey'
                                    }
                                >
                                    {this.props.team.totalSteps.toLocaleString()}
                                </span>
                                <span
                                    className={
                                        this.props.chartType === 'steps'
                                            ? 'label-green'
                                            : 'label-grey'
                                    }
                                >
                                    steps
                                </span>
                            </span>
                            {this.props.team.totalSteps -
                                this.props.team.previous.steps !==
                            0 ? (
                                <span
                                    className={
                                        this.props.team.totalSteps >
                                        this.props.team.previous.steps
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.team.previous.steps > 0 ? (
                                        <span className="percentage">
                                            {this.props.team.totalSteps >
                                            this.props.team.previous.steps
                                                ? this.props.team.previous
                                                      .steps > 0
                                                    ? (
                                                          (this.props.team
                                                              .totalSteps *
                                                              100) /
                                                              this.props.team
                                                                  .previous
                                                                  .steps -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.team.totalSteps
                                                : this.props.team.totalSteps > 0
                                                ? (
                                                      ((this.props.team.previous
                                                          .steps -
                                                          this.props.team
                                                              .totalSteps) *
                                                          100) /
                                                      this.props.team.previous
                                                          .steps
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
    team: state.teams.team,
    dateByType: state.teams.dateByType,
    dateByStartDate: state.teams.dateByStartDate,
    dateByEndDate: state.teams.dateByEndDate,
    chartType: state.teams.chartType
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamChart);
