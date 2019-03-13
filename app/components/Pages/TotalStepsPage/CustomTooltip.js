import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class CustomTooltip extends Component {
    render() {
        let label;
        console.log(this.props);
        const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        switch (this.props.totalSteps.dateByType) {
            case 'today':
                label = moment().format('DD/MM/YYYY');

                break;
            case 'week':
                label = moment()
                    .startOf('isoWeek')
                    .day(weekDays.indexOf(this.props.payload[0].x_axis) + 1)
                    .format('DD/MM/YYYY');
                break;
            case 'month':
                label = moment()
                    .startOf('month')
                    .date(this.props.payload[0].x_axis)
                    .format('DD/MM/YYYY');
                break;
            case 'year':
                label = moment()
                    .startOf('year')
                    .month(this.props.payload[0].x_axis)
                    .startOf('month')
                    .format('DD/MM/YYYY');
                break;
            default:
                label = moment().format('DD/MM/YYYY');
                break;
        }
        if (this.props.active) {
            return (
                <div className="recharts-default-tooltip">
                    <p className="recharts-tooltip-label">{label}</p>
                    <ul className="recharts-tooltip-item-list">
                        <li className="recharts-tooltip-item">
                            <span className="recharts-tooltip-item-name">
                                Total Steps
                            </span>
                            <span className="recharts-tooltip-item-separator">
                                :
                            </span>
                            <span className="recharts-tooltip-item-value">
                                {this.props.payload[0].value}
                            </span>
                        </li>
                    </ul>
                </div>
            );
        } 
            return null;
        
    }
}

const mapStateToProps = state => ({
    totalSteps: state.reports.totalSteps
});

export default connect(mapStateToProps)(CustomTooltip);
