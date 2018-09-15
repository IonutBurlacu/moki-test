import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { logout } from '../../actions/auth';

export class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideTotalRecordSteps: false,
            ignoreWeekendData: false
        };
    }

    logout = () => {
        this.props.logout();
        sessionStorage.removeItem('Authorization');
        this.props.history.push('/');
    };

    handleCheckboxChange = event => {
        const previousState = this.state[event.target.name];
        this.setState({
            [event.target.name]: !previousState
        });
    };

    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={
                        <Link to="/contact-support">Contact Support</Link>
                    }
                    rightButton={
                        <Link to="/contact-support">Contact Support</Link>
                    }
                />
                <div className="content">
                    <PageTitle title="Settings" />
                    <div className="table-wrapper settings-table-wrapper">
                        <table className="table settings-table">
                            <tr>
                                <td>
                                    <span className="setting-label">
                                        Hide Totals at Record Steps
                                    </span>
                                </td>
                                <td className="align-right switch-column">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={
                                                this.state.hideTotalRecordSteps
                                            }
                                            onChange={this.handleCheckboxChange}
                                            name="hideTotalRecordSteps"
                                        />
                                        <div className="slider" />
                                        <span className="label-on">ON</span>
                                        <span className="label-off">OFF</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="setting-label">
                                        Ignore Weekend Data
                                    </span>
                                </td>
                                <td className="align-right switch-column">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={
                                                this.state.ignoreWeekendData
                                            }
                                            onChange={this.handleCheckboxChange}
                                            name="ignoreWeekendData"
                                        />
                                        <div className="slider" />
                                        <span className="label-on">ON</span>
                                        <span className="label-off">OFF</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        className="setting-button"
                                        type="button"
                                    >
                                        Read Band Battery Levels
                                    </button>
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        className="setting-button"
                                        type="button"
                                    >
                                        Delete Band Battery Levels
                                    </button>
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td>
                                    <span className="setting-label">
                                        Import Database
                                    </span>
                                </td>
                                <td className="align-right">
                                    <button
                                        className="green-button"
                                        type="button"
                                    >
                                        Download Template
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        className="setting-button"
                                        type="button"
                                    >
                                        Account
                                    </button>
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        type="button"
                                        className="setting-button"
                                        onClick={this.logout}
                                    >
                                        Log Out
                                    </button>
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        className="setting-button"
                                        type="button"
                                    >
                                        Contact Support
                                    </button>
                                </td>
                                <td />
                            </tr>
                        </table>
                    </div>
                </div>
                <Loader />
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(
    undefined,
    mapDispatchToProps
)(SettingsPage);
