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
import { showLoader } from '../../../actions/loader';

export class TeamChart extends Component {
    render() {
        return (
            <div className="chart-container">
                <div className="chart">
                    {this.props.team.data.length ? (
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={this.props.team.data}
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
                                    dataKey="total_steps_overview"
                                    name="Total"
                                    stroke="#23dec8"
                                    strokeWidth="2"
                                    dot={{
                                        stroke: '#23dec8',
                                        strokeWidth: 5
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total_steps_typical"
                                    name="Typical"
                                    stroke="#868797"
                                    strokeWidth="2"
                                    dot={{
                                        stroke: '#868797',
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
                        <div className="left-side">
                            <span className="total">
                                Typical:{' '}
                                <span className="number-grey">
                                    {this.props.team.totalTypical.toLocaleString()}
                                </span>
                                <span className="label-grey">steps</span>
                            </span>
                        </div>
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
                                <span className="number-green">
                                    {this.props.team.totalOverview.toLocaleString()}
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
    team: state.teams.team
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamChart);