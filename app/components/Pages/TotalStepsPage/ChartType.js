import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeTotalStepsChartType,
    openTotalStepsMenu,
    closeTotalStepsMenu
} from '../../../actions/reports';

export class ChartType extends Component {
    getSelectedChartType = type => {
        switch (type) {
            case 'steps':
                return 'Steps';
            default:
                return 'MVPA';
        }
    };

    handleTypeSelectMenu = () => {
        if (this.props.chartTypeSelectOpen) {
            this.props.closeTotalStepsMenu('chartTypeSelectOpen');
        } else {
            this.props.openTotalStepsMenu('chartTypeSelectOpen');
        }
    };

    handleCloseTypeSelectMenu = () => {
        this.props.closeTotalStepsMenu('chartTypeSelectOpen');
    };

    handleTypeSelectChange = type => {
        this.props.changeTotalStepsChartType(type);
        this.props.closeTotalStepsMenu('chartTypeSelectOpen');
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.chartTypeSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTypeSelectMenu}
                >
                    {this.getSelectedChartType(this.props.chartType)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.chartTypeSelectOpen
                            ? 'block'
                            : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Type
                        <button
                            type="button"
                            onClick={this.handleCloseTypeSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.chartType === 'steps'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleTypeSelectChange('steps')
                                }
                            >
                                Steps
                            </button>
                        </li>
                        <li
                            className={
                                this.props.chartType === 'mvpa'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleTypeSelectChange('mvpa')
                                }
                            >
                                MVPA
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    chartType: state.reports.totalSteps.chartType,
    chartTypeSelectOpen: state.reports.totalSteps.chartTypeSelectOpen
});

const mapDispatchToProps = dispatch => ({
    changeTotalStepsChartType: chartType =>
        dispatch(changeTotalStepsChartType(chartType)),
    openTotalStepsMenu: menu => dispatch(openTotalStepsMenu(menu)),
    closeTotalStepsMenu: menu => dispatch(closeTotalStepsMenu(menu))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartType);
