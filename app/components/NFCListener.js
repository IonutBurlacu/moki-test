import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NFC } from 'nfc-pcsc';
import _ from 'lodash';
import { push } from 'react-router-redux';
import moment from 'moment';
import { showAlert } from '../actions/alert';
import {
    pairBandRequest,
    syncBandRequest,
    readBattery
} from '../actions/bands';
import { showLoader, hideLoader } from '../actions/loader';
import { playSyncSound, playFailSound } from '../actions/sound';

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

        this.syncTimeout = null;

        this.state = {
            allSteps: [],
            uuid: ''
        };

        this.nfc.on('reader', reader => {
            console.log(`${reader.reader.name}  device attached`);

            reader.on('card', card => {
                console.log(`Card detected ${card.uid}`);

                // Turn the buzzer off.
                const turnOffBuzzer = Buffer.from([
                    0xff,
                    0x00,
                    0x52,
                    0x00,
                    0x00
                ]);
                reader.transmit(turnOffBuzzer, 8);

                // If the user is not logged in, skip all.
                if (this.props.token === null) {
                    return;
                }

                if (this.props.pairing) {
                    if (this.props.selectedPlayerId !== null) {
                        this.props.showLoader();
                        // this.resetSteps(reader, true);
                        this.writeCurrentDate(reader);
                        // Read the battery level.
                        reader
                            .read(0xbf, 16, 16)
                            .then(response => {
                                const responseAsHex = Buffer.from(
                                    response.toString('hex').match(/.{1,2}/g)
                                );
                                this.props.pairBandRequest(
                                    this.props.selectedPlayerId,
                                    card.uid,
                                    (responseAsHex[0] / 9) * 100
                                );
                                return true;
                            })
                            .catch(error => {
                                console.log(
                                    'Error while reading battery levels: ',
                                    error
                                );
                            });
                    } else {
                        this.props.playFailSound();
                        this.props.showAlert(
                            'Please select a Player from the list to pair a Band.'
                        );
                    }
                } else if (this.props.battery_reading) {
                    this.props.playSyncSound();
                    this.readBatteryLevel(reader, card.uid);
                } else {
                    if (this.syncTimeout === null) {
                        this.syncTimeout = setTimeout(() => {
                            this.syncTimeout = null;
                        }, 1000);
                        this.props.showLoader();
                        this.setState({ uuid: card.uid });
                        this.readDays(reader);
                    }
                    this.props.push('/bands/sync');
                }
            });

            reader.on('card.off', card => {
                console.log(`${reader.reader.name}  card removed`, card);
            });

            reader.on('error', err => {
                this.props.showAlert(
                    'There was a problem reading this Band. Please check your internet connection and try again. If the problem persists please contact support via the online Help Centre.'
                );
                console.log(`${reader.reader.name}  an error occurred`, err);
            });

            reader.on('end', () => {
                this.props.showAlert('The Moki Reader has been disconnected.');
                console.log(`${reader.reader.name}  device removed`);
            });
        });
    }

    writeCurrentDate = reader => {
        const today = moment();
        const year = today
            .year()
            .toString()
            .slice(2, 4);
        const month = today.month() + 1;
        const day = today.date();
        const hours = today.hour();
        const minutes = today.minute();
        const seconds = today.second();

        const dataToWrite = Buffer.from([
            `0x${year}`,
            `0x${month}`,
            `0x${day}`,
            `0x${hours}`
        ]);

        reader
            .write(0xc0, dataToWrite)
            .then(() => {
                console.log('First date part has been set');
                const dataToWrite2 = Buffer.from([
                    `0x${minutes}`,
                    `0x${seconds}`,
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
                this.props.hideLoader();
                this.props.showAlert(
                    'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                );
                console.log('Error while setting current date: ', error);
                return false;
            });
    };

    readDays = reader => {
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
                const done = _.after(7, () => {
                    // Read battery level
                    reader
                        .read(0xbf, 16, 16)
                        .then(response => {
                            const responseAsHex = Buffer.from(
                                response.toString('hex').match(/.{1,2}/g)
                            );

                            // Send the steps to the server
                            this.props.syncBandRequest(
                                this.state.uuid,
                                this.state.allSteps.sort((a, b) =>
                                    a.date > b.date ? 1 : -1
                                ),
                                (responseAsHex[0] / 9) * 100
                            );

                            this.setState({ allSteps: [] });

                            return true;
                        })
                        .catch(error => {
                            this.props.hideLoader();
                            this.props.showAlert(
                                'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                            );
                            console.log(
                                'Error while reading battery levels: ',
                                error
                            );
                        });
                });

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
                    ]).format('YYYY-MM-DD');
                    this.readDay(reader, DAYS[index], date, done);
                });

                return true;
            })
            .catch(error => {
                this.props.hideLoader();
                this.props.showAlert(
                    'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                );
                console.log(`error`, error);
            });
    };

    readDay = (reader, day, date, done) => {
        Promise.all([
            reader.read(day + 2, 16, 16),
            reader.read(day + 6, 16, 16),
            reader.read(day + 10, 16, 16),
            reader.read(day + 14, 16, 16),
            reader.read(day + 18, 16, 16),
            reader.read(day + 22, 16, 16)
        ])
            .then(responses => {
                const stepsForDay = {
                    date,
                    steps: [],
                    totalSteps: 0
                };
                responses.forEach((response, key) => {
                    for (let j = 0; j < 8; j++) {
                        const stepsForHour = response.readInt16LE(j * 2);
                        if (stepsForHour > 0) {
                            stepsForDay.steps.push({
                                hour_id: key * 8 + j,
                                steps: stepsForHour
                            });
                        }
                    }
                });

                stepsForDay.totalSteps = stepsForDay.steps.reduce(
                    (sum, stepsForHour) => sum + stepsForHour.steps,
                    0
                );

                this.setState({
                    allSteps: [...this.state.allSteps, stepsForDay]
                });

                done();

                return true;
            })
            .catch(error => {
                this.props.hideLoader();
                this.props.showAlert(
                    'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                );
                console.log(`error`, error);
            });
    };

    readBatteryLevel = (reader, uuid) => {
        reader
            .read(0xbf, 16, 16)
            .then(response => {
                const responseAsHex = Buffer.from(
                    response.toString('hex').match(/.{1,2}/g)
                );
                this.props.readBattery(uuid, (responseAsHex[0] / 9) * 100);
                return true;
            })
            .catch(error => {
                this.props.hideLoader();
                this.props.showAlert(
                    'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                );
                console.log('Error while reading battery levels: ', error);
            });
    };

    resetSteps = (reader, setDate = true) => {
        const data = Buffer.from([0x88, 0x00, 0x00, 0x00]);
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
                this.props.hideLoader();
                this.props.showAlert(
                    'Failed to complete Sync. Please hold the Band on the Reader for longer.'
                );
                console.log('Error while resetting steps: ', error);
            });
    };

    render() {
        return <span />;
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    pairing: state.bands.pairing,
    battery_reading: state.bands.battery_reading,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    pairBandRequest: (id, uuid, batteryLevel) =>
        dispatch(pairBandRequest(id, uuid, batteryLevel)),
    syncBandRequest: (id, allSteps, batteryLevel) =>
        dispatch(syncBandRequest(id, allSteps, batteryLevel)),
    readBattery: (uuid, level) => dispatch(readBattery(uuid, level)),
    push: pathName => dispatch(push(pathName)),
    playSyncSound: () => dispatch(playSyncSound()),
    playFailSound: () => dispatch(playFailSound())
});

export default connect(mapStateToProps, mapDispatchToProps)(NFCListener);
