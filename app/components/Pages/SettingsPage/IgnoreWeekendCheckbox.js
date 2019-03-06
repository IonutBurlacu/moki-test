import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { changeSettingRequest } from '../../../actions/auth';

export class IgnoreWeekendCheckbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ignore_weekend: props.ignore_weekend
        };
    }

    handleCheckboxChange = event => {
        const previousState = this.state[event.target.name];
        this.setState({
            [event.target.name]: !previousState
        });
        this.props.showLoader();
        this.props.changeSettingRequest(event.target.name, !previousState);
    };

    render() {
        return (
            <label className="switch">
                <input
                    type="checkbox"
                    checked={this.state.ignore_weekend}
                    onChange={this.handleCheckboxChange}
                    name="ignore_weekend"
                />
                <div className="slider" />
                <span className="label-on">ON</span>
                <span className="label-off">OFF</span>
            </label>
        );
    }
}

const mapStateToProps = state => ({
    ignore_weekend: state.auth.ignore_weekend
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    changeSettingRequest: (settingName, settingValue) =>
        dispatch(changeSettingRequest(settingName, settingValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IgnoreWeekendCheckbox);
