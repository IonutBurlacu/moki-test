import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { changeSettingRequest } from '../../../actions/auth';

export class HideTotalCheckbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hide_totals: props.hide_totals
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
                    checked={this.state.hide_totals ? 'checked' : false}
                    onChange={this.handleCheckboxChange}
                    name="hide_totals"
                />
                <div className="slider" />
                <span className="label-on">ON</span>
                <span className="label-off">OFF</span>
            </label>
        );
    }
}

const mapStateToProps = state => ({
    hide_totals: state.auth.hide_totals
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    changeSettingRequest: (settingName, settingValue) =>
        dispatch(changeSettingRequest(settingName, settingValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HideTotalCheckbox);
