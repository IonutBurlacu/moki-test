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
import playersIcon from '../../../images/players_icon_active.png';
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
                <div className="chart" style={{ height: '42vmin' }}>
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
                            <XAxis
                                dataKey="x_axis"
                                stroke="#f6f6f7"
                                tickFormatter={value => {
                                    if (
                                        this.props.totalSteps.dateByEndDate.diff(
                                            this.props.totalSteps
                                                .dateByStartDate,
                                            'days'
                                        ) === 0 &&
                                        (this.props.totalSteps.dateByType ===
                                            'today' ||
                                            this.props.totalSteps.dateByType ===
                                                'yesterday' ||
                                            this.props.totalSteps.dateByType ===
                                                'interval')
                                    ) {
                                        if (value % 2 === 0) {
                                            return (value / 2)
                                                .toString()
                                                .padStart(2, '0');
                                        }
                                        return Math.floor(value / 2) + ':30';
                                    }
                                    if (
                                        this.props.totalSteps.dateByType ===
                                        'last_90_days'
                                    ) {
                                        const startOfWeekDate = this.props.totalSteps.dateByStartDate
                                            .clone()
                                            .week(value);
                                        const endOfWeekDate = this.props.totalSteps.dateByStartDate
                                            .clone()
                                            .week(value);
                                        if (
                                            startOfWeekDate <
                                            this.props.totalSteps
                                                .dateByStartDate
                                        ) {
                                            startOfWeekDate.add(1, 'year');
                                        }
                                        if (
                                            endOfWeekDate <
                                            this.props.totalSteps
                                                .dateByStartDate
                                        ) {
                                            endOfWeekDate.add(1, 'year');
                                        }
                                        return `${startOfWeekDate
                                            .startOf('isoWeek')
                                            .format(
                                                'D'
                                            )} - ${endOfWeekDate
                                            .endOf('isoWeek')
                                            .format('D')}`;
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
                                        this.props.totalSteps.dateByEndDate.diff(
                                            this.props.totalSteps
                                                .dateByStartDate,
                                            'days'
                                        ) === 0 &&
                                        (this.props.totalSteps.dateByType ===
                                            'today' ||
                                            this.props.totalSteps.dateByType ===
                                                'yesterday' ||
                                            this.props.totalSteps.dateByType ===
                                                'interval')
                                    ) {
                                        if (value % 2 === 0) {
                                            return (value / 2)
                                                .toString()
                                                .padStart(2, '0');
                                        }
                                        return Math.floor(value / 2) + ':30';
                                    }
                                    if (
                                        this.props.totalSteps.dateByType ===
                                        'last_90_days'
                                    ) {
                                        const startOfWeekDate = this.props.totalSteps.dateByStartDate
                                            .clone()
                                            .week(value);
                                        const endOfWeekDate = this.props.totalSteps.dateByStartDate
                                            .clone()
                                            .week(value);
                                        if (
                                            startOfWeekDate <
                                            this.props.totalSteps
                                                .dateByStartDate
                                        ) {
                                            startOfWeekDate.add(1, 'year');
                                        }
                                        if (
                                            endOfWeekDate <
                                            this.props.totalSteps
                                                .dateByStartDate
                                        ) {
                                            endOfWeekDate.add(1, 'year');
                                        }
                                        return `${startOfWeekDate
                                            .startOf('isoWeek')
                                            .format(
                                                'D'
                                            )} - ${endOfWeekDate
                                            .endOf('isoWeek')
                                            .format('D')}`;
                                    }
                                    return value;
                                }}
                                formatter={value =>
                                    this.props.totalSteps.chartType === 'steps'
                                        ? new Intl.NumberFormat('en').format(
                                              value
                                          )
                                        : duration(value)
                                }
                            />
                            <Bar
                                dataKey="y_axis"
                                name={
                                    this.props.totalSteps.chartType === 'steps'
                                        ? 'Steps'
                                        : 'MVPA'
                                }
                                maxBarSize={70}
                                fill="#23dec8"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
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
                                <span
                                    className={
                                        this.props.chartType === 'steps'
                                            ? 'number-green'
                                            : 'number-grey'
                                    }
                                >
                                    {this.props.totalSteps.totalSteps.toLocaleString()}
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
    selectedTeam: state.reports.teams.find(
        team => team.id === state.reports.totalSteps.teamId
    )
});

export default connect(mapStateToProps, null)(TotalStepsChart);
