import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changePlayerAveragesChartType,
    openPlayerAveragesMenu,
    closePlayerAveragesMenu
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
            this.props.closePlayerAveragesMenu('chartTypeSelectOpen');
        } else {
            this.props.openPlayerAveragesMenu('chartTypeSelectOpen');
        }
    };

    handleCloseTypeSelectMenu = () => {
        this.props.closePlayerAveragesMenu('chartTypeSelectOpen');
    };

    handleTypeSelectChange = type => {
        this.props.changePlayerAveragesChartType(type);
        this.props.closePlayerAveragesMenu('chartTypeSelectOpen');
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
    chartType: state.reports.playerAverages.chartType,
    chartTypeSelectOpen: state.reports.playerAverages.chartTypeSelectOpen
});

const mapDispatchToProps = dispatch => ({
    changePlayerAveragesChartType: chartType =>
        dispatch(changePlayerAveragesChartType(chartType)),
    openPlayerAveragesMenu: menu => dispatch(openPlayerAveragesMenu(menu)),
    closePlayerAveragesMenu: menu => dispatch(closePlayerAveragesMenu(menu))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartType);
