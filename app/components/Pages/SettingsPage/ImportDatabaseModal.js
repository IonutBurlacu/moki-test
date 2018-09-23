import React, { Component } from 'react';
import Modal from 'react-modal';
import axios, { post } from 'axios';
import { connect } from 'react-redux';
import host from '../../../constants/serverUrl';
import { showLoader } from '../../../actions/loader';
import { importDatabaseRequest } from '../../../actions/players';

export class ImportDatabaseModal extends Component {
    handleUploadFile = file => {
        this.props.showLoader();
        this.props.importDatabaseRequest(file);
    };

    handleOnFileChange = event => {
        this.props.closeModal();
        this.handleUploadFile(event.target.files[0]);
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
            <Modal
                isOpen={this.props.modalIsOpen}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <span>Import Database</span>
                    </div>
                    <div className="modal-body">
                        <div className="modal-content">
                            <p>
                                Before you can Import you must first download
                                the Database and edit that file
                            </p>
                            <p>Please select a location</p>
                            <div className="separator" />
                            <button
                                type="button"
                                className="download-button"
                                onClick={this.handleDownloadTemplate}
                            >
                                Choose Location
                            </button>
                            <div className="separator" />
                            <p>Then you can import the updated file.</p>
                            <p>Please select a file to import</p>
                            <div className="separator" />
                            <div className="modal-footer-buttons">
                                <label htmlFor="file" className="file-label">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    className="file-input"
                                    onChange={this.handleOnFileChange}
                                />
                                <button
                                    type="button"
                                    onClick={this.props.closeModal}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    importDatabaseRequest: file => dispatch(importDatabaseRequest(file))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportDatabaseModal);
