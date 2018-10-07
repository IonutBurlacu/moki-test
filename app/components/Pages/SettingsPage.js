import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import axios from 'axios';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { logout, changeSettingRequest } from '../../actions/auth';
import host from '../../constants/serverUrl';
import { showLoader } from '../../actions/loader';
import { deleteDatabaseRequest } from '../../actions/players';
import ImportDatabaseModal from './SettingsPage/ImportDatabaseModal';
import AccountModal from './SettingsPage/AccountModal';

export class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hide_totals: props.hide_totals,
            ignore_weekend: props.ignore_weekend,
            importModalIsOpen: false,
            accountModalIsOpen: false
        };
    }

    openImportModal = () => {
        this.setState({ importModalIsOpen: true });
    };

    closeImportModal = () => {
        this.setState({ importModalIsOpen: false });
    };

    openAccountModal = () => {
        this.setState({ accountModalIsOpen: true });
    };

    closeAccountModal = () => {
        this.setState({ accountModalIsOpen: false });
    };

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
        this.props.showLoader();
        this.props.changeSettingRequest(event.target.name);
    };

    handleReadBattery = () => {
        this.props.history.push('/bands/read');
    };

    handleDeleteDatabase = () => {
        this.props.showLoader();
        this.props.deleteDatabaseRequest();
    };

    handleDownloadTemplate = () => {
        axios({
            url: `${host}/api/players/download`,
            method: 'GET',
            responseType: 'blob',
            headers: {
                Authorization: this.props.token
            }
        })
            .then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'players_template.csv');
                document.body.appendChild(link);
                link.click();
                return true;
            })
            .catch(error => {
                console.log(error);
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
                                            checked={this.state.hide_totals}
                                            onChange={this.handleCheckboxChange}
                                            name="hide_totals"
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
                                            checked={this.state.ignore_weekend}
                                            onChange={this.handleCheckboxChange}
                                            name="ignore_weekend"
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
                                        onClick={this.handleReadBattery}
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
                                        onClick={this.handleDeleteDatabase}
                                    >
                                        Delete Database
                                    </button>
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        className="setting-button"
                                        type="button"
                                        onClick={this.openImportModal}
                                    >
                                        Import Database
                                    </button>
                                </td>
                                <td className="align-right">
                                    <button
                                        className="green-button"
                                        type="button"
                                        onClick={this.handleDownloadTemplate}
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
                                        onClick={this.openAccountModal}
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
                <ImportDatabaseModal
                    modalIsOpen={this.state.importModalIsOpen}
                    closeModal={this.closeImportModal}
                />
                <AccountModal
                    modalIsOpen={this.state.accountModalIsOpen}
                    closeModal={this.closeAccountModal}
                />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    hide_totals: state.auth.hide_totals,
    ignore_weekend: state.auth.ignore_weekend
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    showLoader: () => dispatch(showLoader()),
    changeSettingRequest: settingName =>
        dispatch(changeSettingRequest(settingName)),
    deleteDatabaseRequest: () => dispatch(deleteDatabaseRequest())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);
