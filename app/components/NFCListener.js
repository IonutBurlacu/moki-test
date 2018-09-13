import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NFC } from 'nfc-pcsc';
import { push } from 'react-router-redux';
import { showAlert } from '../actions/alert';
import { pairBandRequest, syncBandRequest } from '../actions/bands';
import { showLoader } from '../actions/loader';

export class NFCListener extends Component {
    constructor(props) {
        super(props);

        this.nfc = new NFC();

        this.nfc.on('reader', reader => {
            console.log(`${reader.reader.name}  device attached`);

            reader.on('card', card => {
                console.log(`Card detected ${card.uid}`);
                if (this.props.pairing) {
                    if (this.props.selectedPlayerId !== null) {
                        this.props.showLoader();
                        this.props.pairBandRequest(
                            this.props.selectedPlayerId,
                            card.uid
                        );
                    } else {
                        this.props.showAlert(
                            'Select a player from the list to pair a band.'
                        );
                    }
                } else {
                    this.props.showLoader();
                    this.props.syncBandRequest(card.uid, 200, [
                        { hour_id: 0, steps: 10 },
                        { hour_id: 1, steps: 15 }
                    ]);
                    this.props.push('/bands/sync');
                }
            });

            reader.on('card.off', card => {
                console.log(`${reader.reader.name}  card removed`, card);
            });

            reader.on('error', err => {
                this.props.showAlert('Error while reading the band.');
                console.log(`${reader.reader.name}  an error occurred`, err);
            });

            reader.on('end', () => {
                this.props.showAlert('NFC Reader disconnected.');
                console.log(`${reader.reader.name}  device removed`);
            });
        });
    }

    render() {
        return <span />;
    }
}

const mapStateToProps = state => ({
    pairing: state.bands.pairing,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    pairBandRequest: (id, uuid) => dispatch(pairBandRequest(id, uuid)),
    syncBandRequest: (id, totalSteps, steps) =>
        dispatch(syncBandRequest(id, totalSteps, steps)),
    push: pathName => dispatch(push(pathName))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NFCListener);
