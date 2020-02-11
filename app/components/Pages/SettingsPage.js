import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { shell } from 'electron';
import axios from 'axios';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { logout, getSettingsRequest } from '../../actions/auth';
import host from '../../constants/serverUrl';
import { showLoader } from '../../actions/loader';
import ImportDatabaseModal from './SettingsPage/ImportDatabaseModal';
import ConfirmDeleteDatabaseModal from './SettingsPage/ConfirmDeleteDatabaseModal';
import SettingsHeader from './SettingsPage/SettingsHeader';
import AccountModal from './SettingsPage/AccountModal';
import { setActiveMenu } from '../../actions/footer';
import HideTotalCheckbox from './SettingsPage/HideTotalCheckbox';

export class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            importModalIsOpen: false,
            accountModalIsOpen: false,
            deleteDatabaseConfirmModalIsOpen: false
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

    openDeleteDatabaseConfirmModal = () => {
        this.setState({ deleteDatabaseConfirmModalIsOpen: true });
    };

    closeDeleteDatabaseConfirmModal = () => {
        this.setState({ deleteDatabaseConfirmModalIsOpen: false });
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
        this.openDeleteDatabaseConfirmModal();
    };

    handleExportCsv = () => {
        this.props.history.push('/settings/download_csv');
    };

    handleDownloadTemplate = event => {
        event.stopPropagation();
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

    handleVideoTutorials = () => {
        shell.openExternal('https://moki.technology/pages/help-centre');
    };

    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<div />}
                    rightButton={
                        <button
                            type="button"
                            onClick={this.handleVideoTutorials}
                        >
                            Help Centre
                        </button>
                    }
                />
                <PageTitle title="Help & Settings" />
                {!this.props.loading ? (
                    <div className="content">
                        <SettingsHeader title="Find video tutorials, FAQ's and technical support at our" />
                        <div className="table-wrapper settings-table-wrapper">
                            <table className="table settings-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="setting-label">
                                                Hide Step Totals at Sync
                                            </span>
                                        </td>
                                        <td className="align-right switch-column">
                                            <HideTotalCheckbox />
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
                                    <tr onClick={this.openImportModal}>
                                        <td>
                                            <button
                                                className="setting-button"
                                                type="button"
                                            >
                                                Bulk Add or Edit Players
                                            </button>
                                        </td>
                                        <td />
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
                <ConfirmDeleteDatabaseModal
                    modalIsOpen={this.state.deleteDatabaseConfirmModalIsOpen}
                    closeModal={this.closeDeleteDatabaseConfirmModal}
                />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    showLoader: () => dispatch(showLoader()),
    setActiveMenu: menu => dispatch(setActiveMenu(menu)),
    getSettingsRequest: () => dispatch(getSettingsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
