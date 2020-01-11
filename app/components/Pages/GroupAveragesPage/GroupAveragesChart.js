import React, { Component } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import playersIcon from '../../../images/players_icon_active.png';
import duration from '../../../utils/duration';
import dateLegend from '../../../utils/dateLegend';
import tickFormatter from '../../../utils/tickFormatter';

const COLORS = ['#fe335e', '#fc9cac', '#fee300', '#23dec8', '#74ef5c'];

export class GroupAveragesChart extends Component {
    render() {
        return (
            <div className="chart-container">
                <div className="chart-top-bar">
                    <div className="legend">
                        {this.props.selectedTeam ? (
                            <div>
                                <p className="team">
                                    {this.props.selectedTeam
                                        ? this.props.selectedTeam.name
                                        : ''}
                                </p>
                                <p className="date">
                                    {dateLegend(
                                        this.props.groupAverages.dateByType,
                                        this.props.groupAverages
                                            .dateByStartDate,
                                        this.props.groupAverages.dateByEndDate
                                    )}
                                </p>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="players">
                        <img
                            src={playersIcon}
                            className="players-icon"
                            alt="players-icon"
                        />
                        <span className="players-number">
                            {this.props.selectedTeam
                                ? this.props.selectedTeam.players_count
                                : 0}{' '}
                            Player
                            {this.props.selectedTeam &&
                            this.props.selectedTeam.players_count !== 1
                                ? 's'
                                : ''}
                        </span>
                    </div>
                </div>
                <div className="chart" style={{ height: '49vmin' }}>
                    <ResponsiveContainer width="99%">
                        <BarChart
                            data={
                                this.props.groupAverages.chartType === 'steps'
                                    ? this.props.groupAverages.data.steps
                                    : this.props.groupAverages.data.mvpa
                            }
                            barCategoryGap={5}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 10,
                                bottom: 10
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
                                formatter={value =>
                                    this.props.groupAverages.chartType ===
                                    'steps'
                                        ? new Intl.NumberFormat('en').format(
                                              value
                                          )
                                        : duration(value)
                                }
                            />
                            <Bar
                                dataKey="y_axis"
                                name="Average Day"
                                maxBarSize={70}
                            >
                                {this.props.groupAverages.data.steps.map(
                                    (entry, index) => {
                                        let color;
                                        if (
                                            entry.y_axis <
                                            this.props.scales.first_step
                                        ) {
                                            color = COLORS[0];
                                        } else if (
                                            entry.y_axis <
                                            this.props.scales.second_step
                                        ) {
                                            color = COLORS[1];
                                        } else if (
                                            entry.y_axis <
                                            this.props.scales.third_step
                                        ) {
                                            color = COLORS[2];
                                        } else if (
                                            entry.y_axis <
                                            this.props.scales.fourth_step
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
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    groupAverages: state.reports.groupAverages,
    scales: state.reports.scales,
    selectedTeam: state.reports.teams.find(
        team => team.id === state.reports.groupAverages.teamId
    )
});

export default connect(mapStateToProps, null)(GroupAveragesChart);
