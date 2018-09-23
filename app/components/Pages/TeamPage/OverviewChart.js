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
import { statsTeamRequest } from '../../../actions/teams';
import { showLoader } from '../../../actions/loader';

export class OverviewChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelectOpen: false
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
            default:
                return 'Date';
        }
    };

    handleDateChange = type => {
        this.props.showLoader();
        this.setState({ dateSelectOpen: false });
        this.props.statsTeamRequest(this.props.team.id, type);
    };

    handleDateSelectMenu = () => {
        this.setState({ dateSelectOpen: !this.state.dateSelectOpen });
    };

    handleCloseDateSelectMenu = () => {
        this.setState({ dateSelectOpen: false });
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
                                className="chart-select-button"
                                onClick={this.handleDateSelectMenu}
                            >
                                {this.getSelectedDateType(this.props.chartType)}
                            </button>
                            <div
                                className="chart-select-list-wrapper"
                                style={{
                                    display: this.state.dateSelectOpen
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
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('today')
                                            }
                                        >
                                            Today
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('week')
                                            }
                                        >
                                            This Week
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('month')
                                            }
                                        >
                                            This Month
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('year')
                                            }
                                        >
                                            This Year
                                        </button>
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
                                <YAxis stroke="#f6f6f7" />
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
                                              ).toFixed(2)
                                            : (
                                                  ((this.props.team
                                                      .totalOverviewPrevious -
                                                      this.props.team
                                                          .totalOverview) /
                                                      this.props.team
                                                          .totalOverviewPrevious) *
                                                  100
                                              ).toFixed(2)}
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
                                Total: {this.props.team.totalOverview}
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
    chartType: state.teams.chartType
});

const mapDispatchToProps = dispatch => ({
    statsTeamRequest: (id, type) => dispatch(statsTeamRequest(id, type)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewChart);
