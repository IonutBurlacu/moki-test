import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { shell } from 'electron';
import axios from 'axios';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import {
    logout,
    changeSettingRequest,
    getSettingsRequest
} from '../../actions/auth';
import host from '../../constants/serverUrl';
import { showLoader } from '../../actions/loader';
import ImportDatabaseModal from './SettingsPage/ImportDatabaseModal';
import ConfirmDeleteModal from './SettingsPage/ConfirmDeleteModal';
import AccountModal from './SettingsPage/AccountModal';
import { setActiveMenu } from '../../actions/footer';
import HideTotalCheckbox from './SettingsPage/HideTotalCheckbox';
import IgnoreWeekendCheckbox from './SettingsPage/IgnoreWeekendCheckbox';

export class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min_hour_id: props.min_hour_id,
            max_hour_id: props.max_hour_id,
            importModalIsOpen: false,
            accountModalIsOpen: false,
            confirmModalIsOpen: false
        };
    }

    componentWillMount() {
        this.props.showLoader();
        this.props.getSettingsRequest();
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

    openConfirmModal = () => {
        this.setState({ confirmModalIsOpen: true });
    };

    closeConfirmModal = () => {
        this.setState({ confirmModalIsOpen: false });
    };

    logout = () => {
        this.props.logout();
        sessionStorage.removeItem('Authorization');
        this.props.setActiveMenu('');
        this.props.history.push('/');
    };

    handleReadBattery = () => {
        this.props.history.push('/bands/read');
    };

    handleDeleteDatabase = () => {
        this.openConfirmModal();
    };

    handleExportCsv = () => {
        this.props.history.push('/settings/download_csv');
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

    handleContactSupport = () => {
        shell.openExternal('https://moki.technology/pages/contact-us');
    };

    handleTimeRangeChange = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value, 10)
        });
        this.props.showLoader();
        this.props.changeSettingRequest(
            event.target.name,
            parseInt(event.target.value, 10)
        );
    };

    render() {
        const options = [
            { id: 0, value: '00:00' },
            { id: 2, value: '01:00' },
            { id: 4, value: '02:00' },
            { id: 6, value: '03:00' },
            { id: 8, value: '04:00' },
            { id: 10, value: '05:00' },
            { id: 12, value: '06:00' },
            { id: 14, value: '07:00' },
            { id: 16, value: '08:00' },
            { id: 18, value: '09:00' },
            { id: 20, value: '10:00' },
            { id: 22, value: '11:00' },
            { id: 24, value: '12:00' },
            { id: 26, value: '13:00' },
            { id: 28, value: '14:00' },
            { id: 30, value: '15:00' },
            { id: 32, value: '16:00' },
            { id: 34, value: '17:00' },
            { id: 36, value: '18:00' },
            { id: 38, value: '19:00' },
            { id: 40, value: '20:00' },
            { id: 42, value: '21:00' },
            { id: 44, value: '22:00' },
            { id: 46, value: '23:00' }
        ];
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={
                        <button
                            type="button"
                            onClick={this.handleContactSupport}
                        >
                            Contact Support
                        </button>
                    }
                    rightButton={<div />}
                />
                <PageTitle title="Settings" />
                {!this.props.loading ? (
                    <div className="content">
                        <div className="table-wrapper settings-table-wrapper">
                            <table className="table settings-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="setting-label">
                                                Hide Totals at Record Steps
                                            </span>
                                        </td>
                                        <td className="align-right switch-column">
                                            <HideTotalCheckbox />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="setting-label">
                                                Ignore Weekend Data
                                            </span>
                                        </td>
                                        <td className="align-right switch-column">
                                            <IgnoreWeekendCheckbox />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="setting-label">
                                                Time Range
                                            </span>
                                        </td>
                                        <td className="align-right switch-column">
                                            <select
                                                className="time-range-select"
                                                name="min_hour_id"
                                                onChange={
                                                    this.handleTimeRangeChange
                                                }
                                            >
                                                {options.map(option => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                        selected={
                                                            this.props
                                                                .min_hour_id ===
                                                            option.id
                                                        }
                                                    >
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="time-range-select"
                                                name="max_hour_id"
                                                onChange={
                                                    this.handleTimeRangeChange
                                                }
                                            >
                                                {options.map(option => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                        selected={
                                                            this.props
                                                                .max_hour_id ===
                                                            option.id
                                                        }
                                                    >
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr onClick={this.handleReadBattery}>
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
                                    <tr onClick={this.handleExportCsv}>
                                        <td>
                                            <button
                                                className="setting-button"
                                                type="button"
                                            >
                                                Download CSV Data
                                            </button>
                                        </td>
                                        <td />
                                    </tr>
                                    <tr onClick={this.handleDeleteDatabase}>
                                        <td>
                                            <button
                                                className="setting-button"
                                                type="button"
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
                                                onClick={
                                                    this.handleDownloadTemplate
                                                }
                                            >
                                                Download Template
                                            </button>
                                        </td>
                                    </tr>
                                    <tr onClick={this.openAccountModal}>
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
                                    <tr onClick={this.logout}>
                                        <td>
                                            <button
                                                type="button"
                                                className="setting-button"
                                            >
                                                Log Out
                                            </button>
                                        </td>
                                        <td />
                                    </tr>
                                    <tr onClick={this.handleContactSupport}>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <ImportDatabaseModal
                    modalIsOpen={this.state.importModalIsOpen}
                    closeModal={this.closeImportModal}
                />
                <AccountModal
                    modalIsOpen={this.state.accountModalIsOpen}
                    closeModal={this.closeAccountModal}
                />
                <ConfirmDeleteModal
                    modalIsOpen={this.state.confirmModalIsOpen}
                    closeModal={this.closeConfirmModal}
                />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    loading: state.auth.loading,
    min_hour_id: state.auth.min_hour_id,
    max_hour_id: state.auth.max_hour_id
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    showLoader: () => dispatch(showLoader()),
    setActiveMenu: menu => dispatch(setActiveMenu(menu)),
    changeSettingRequest: (settingName, settingValue) =>
        dispatch(changeSettingRequest(settingName, settingValue)),
    getSettingsRequest: () => dispatch(getSettingsRequest())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);
