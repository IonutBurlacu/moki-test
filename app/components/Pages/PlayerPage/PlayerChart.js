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
import moment from 'moment';
import { showLoader } from '../../../actions/loader';
import duration from '../../../utils/duration';

export class PlayerChart extends Component {
    getDateLegend = () => {
        switch (this.props.dateByType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(this.props.dateByStartDate).format(
                    'D'
                )} - ${moment(this.props.dateByEndDate).format('D MMMM YYYY')}`;
            case 'month':
                return `${moment(this.props.dateByStartDate).format(
                    'D'
                )} - ${moment(this.props.dateByEndDate).format('D MMMM YYYY')}`;
            case 'year':
                return `${moment(this.props.dateByStartDate).format(
                    'MMM'
                )} - ${moment(this.props.dateByEndDate).format('MMM YYYY')}`;
            case 'interval':
                return `${moment(this.props.dateByStartDate).format(
                    'D MMM YYYY'
                )} - ${moment(this.props.dateByEndDate).format('D MMM YYYY')}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    <p className="date">{this.getDateLegend()}</p>
                </div>
                <div className="chart">
                    {this.props.player.data.steps.length ? (
                        <ResponsiveContainer width="99%">
                            <ComposedChart
                                data={
                                    this.props.chartType === 'steps'
                                        ? this.props.player.data.steps
                                        : this.props.player.data.mvpa
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
                                <span className="number-grey">
                                    {duration(this.props.player.totalMvpa)}
                                </span>
                            </span>
                            {this.props.player.totalMvpa -
                                this.props.player.previous.mvpa !==
                            0 ? (
                                <span
                                    className={
                                        this.props.player.totalMvpa >
                                        this.props.player.previous.mvpa
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.player.previous.mvpa > 0 ? (
                                        <span className="percentage">
                                            {this.props.player.totalMvpa >
                                            this.props.player.previous.mvpa
                                                ? this.props.player.previous
                                                      .mvpa > 0
                                                    ? (
                                                          (this.props.player
                                                              .totalMvpa *
                                                              100) /
                                                              this.props.player
                                                                  .previous
                                                                  .mvpa -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.player
                                                          .totalMvpa
                                                : this.props.player.totalMvpa >
                                                  0
                                                ? (
                                                      ((this.props.player
                                                          .previous.mvpa -
                                                          this.props.player
                                                              .totalMvpa) *
                                                          100) /
                                                      this.props.player.previous
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
                                <span className="number-green">
                                    {this.props.player.totalSteps.toLocaleString()}
                                </span>
                                <span className="label-green">steps</span>
                            </span>
                            {this.props.player.totalSteps -
                                this.props.player.previous.steps !==
                            0 ? (
                                <span
                                    className={
                                        this.props.player.totalSteps >
                                        this.props.player.previous.steps
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    {this.props.player.previous.steps > 0 ? (
                                        <span className="percentage">
                                            {this.props.player.totalSteps >
                                            this.props.player.previous.steps
                                                ? this.props.player.previous
                                                      .steps > 0
                                                    ? (
                                                          (this.props.player
                                                              .totalSteps *
                                                              100) /
                                                              this.props.player
                                                                  .previous
                                                                  .steps -
                                                          100
                                                      ).toFixed(0)
                                                    : this.props.player
                                                          .totalSteps
                                                : this.props.player.totalSteps >
                                                  0
                                                ? (
                                                      ((this.props.player
                                                          .previous.steps -
                                                          this.props.player
                                                              .totalSteps) *
                                                          100) /
                                                      this.props.player.previous
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
    player: state.players.player,
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate,
    chartType: state.players.chartType
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerChart);
