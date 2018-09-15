import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NFC } from 'nfc-pcsc';
import { push } from 'react-router-redux';
import moment from 'moment';
import { showAlert } from '../actions/alert';
import { pairBandRequest, syncBandRequest } from '../actions/bands';
import { showLoader, hideLoader } from '../actions/loader';

const MONDAY = 0x09;
const TUESDAY = 0x23;
const WEDNESDAY = 0x3d;
const THURSDAY = 0x57;
const FRIDAY = 0x71;
const SATURDAY = 0x8b;
const SUNDAY = 0xa5;

const DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY];

export class NFCListener extends Component {
    constructor(props) {
        super(props);

        this.nfc = new NFC();

        this.state = {
            totalSteps: 0,
            uuid: ''
        };

        this.nfc.on('reader', reader => {
            console.log(`${reader.reader.name}  device attached`);

            reader.on('card', card => {
                console.log(`Card detected ${card.uid}`);
                if (this.props.pairing) {
                    if (this.props.selectedPlayerId !== null) {
                        this.props.showLoader();
                        this.resetSteps(reader);
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
                    this.setState({ uuid: card.uid });
                    this.findCurrentDay(reader);
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

    writeCurrentDate = reader => {
        const today = moment.utc();
        const year = today
            .year()
            .toString()
            .slice(2, 4);
        const month = today.month() + 1;
        const day = today.date();
        const hours = today.hour();
        const minutes = today.minute();
        const seconds = today.second();

        const dataToWrite = Buffer.from([year, month, day, hours]);

        reader
            .write(0xc0, dataToWrite)
            .then(() => {
                console.log('First date part has been set');
                const dataToWrite2 = Buffer.from([
                    minutes,
                    seconds,
                    0x00,
                    0x00
                ]);

                reader
                    .write(0xc1, dataToWrite2)
                    .then(() => {
                        console.log('Second date part has been set');
                        return true;
                    })
                    .catch(error => {
                        console.log(
                            'Error while setting current date: ',
                            error
                        );
                        return false;
                    });
                return true;
            })
            .catch(error => {
                console.log('Error while setting current date: ', error);
                return false;
            });
    };

    findCurrentDay = reader => {
        Promise.all([
            reader.read(MONDAY, 16, 16),
            reader.read(TUESDAY, 16, 16),
            reader.read(WEDNESDAY, 16, 16),
            reader.read(THURSDAY, 16, 16),
            reader.read(FRIDAY, 16, 16),
            reader.read(SATURDAY, 16, 16),
            reader.read(SUNDAY, 16, 16)
        ])
            .then(responses => {
                // console.log(responses);
                let dayFound = false;
                responses.forEach((response, index) => {
                    /* 
                    We do this because the date is stored on bands as decimal and when the data is read,
                    NodeJS thinks that it is in hex format and does unnecesary conversion. This way, we convert the
                    date back to decimal and check if the date is the same as today
                    */
                    const responseAsHex = Buffer.from(
                        response.toString('hex').match(/.{1,2}/g)
                    );
                    const date = moment([
                        `20${responseAsHex[0]}`,
                        responseAsHex[1] - 1, // Months start from  0
                        responseAsHex[2]
                    ]);
                    // If day is today and there are some steps
                    const stepsInt = response.readInt32LE(4);
                    if (moment().diff(date, 'days') === 0 && stepsInt > 0) {
                        dayFound = true;
                        this.setState({ totalSteps: stepsInt });
                        this.readDay(reader, DAYS[index]);
                    }
                });
                if (!dayFound) {
                    this.props.hideLoader();
                    this.props.showAlert('No steps found on the band.');
                }
                return true;
            })
            .catch(error => {
                console.log(`error`, error);
            });
    };

    readDay = (reader, day) => {
        Promise.all([
            reader.read(day + 2, 16, 16),
            reader.read(day + 6, 16, 16),
            reader.read(day + 10, 16, 16),
            reader.read(day + 14, 16, 16),
            reader.read(day + 18, 16, 16),
            reader.read(day + 22, 16, 16)
        ])
            .then(responses => {
                const steps = [];
                responses.forEach((response, key) => {
                    const stepsFirstSlot =
                        response.readInt16LE(0) + response.readInt16LE(2);
                    if (stepsFirstSlot > 0) {
                        steps.push({
                            hour_id: key * 4,
                            steps: stepsFirstSlot
                        });
                    }
                    const stepsSecondSlot =
                        response.readInt16LE(4) + response.readInt16LE(6);
                    if (stepsSecondSlot > 0) {
                        steps.push({
                            hour_id: key * 4 + 1,
                            steps: stepsSecondSlot
                        });
                    }
                    const stepsThirdSlot =
                        response.readInt16LE(8) + response.readInt16LE(10);
                    if (stepsThirdSlot > 0) {
                        steps.push({
                            hour_id: key * 4 + 2,
                            steps: stepsThirdSlot
                        });
                    }
                    const stepsFourthSlot =
                        response.readInt16LE(12) + response.readInt16LE(14);
                    if (stepsFourthSlot > 0) {
                        steps.push({
                            hour_id: key * 4 + 3,
                            steps: stepsFourthSlot
                        });
                    }
                });
                this.props.syncBandRequest(
                    this.state.uuid,
                    this.state.totalSteps,
                    steps
                );
                console.log('Steps synced');
                this.resetSteps(reader, false);
                return true;
            })
            .catch(error => {
                console.log(`error`, error);
            });
    };

    resetSteps = (reader, setDate = true) => {
        const data = Buffer.from([0x89, 0x00, 0x00, 0x00]);
        reader
            .write(0xc2, data)
            .then(() => {
                console.log('Steps reset successfully');
                if (setDate) {
                    this.writeCurrentDate(reader);
                }
                return true;
            })
            .catch(error => {
                console.log('Error while resetting steps: ', error);
            });
    };

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
    hideLoader: () => dispatch(hideLoader()),
    pairBandRequest: (id, uuid) => dispatch(pairBandRequest(id, uuid)),
    syncBandRequest: (id, totalSteps, steps) =>
        dispatch(syncBandRequest(id, totalSteps, steps)),
    push: pathName => dispatch(push(pathName))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NFCListener);
