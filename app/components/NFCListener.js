import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NFC } from 'nfc-pcsc';
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
                        this.props.playFailSound();
                        this.props.showAlert(
                            'Select a player from the list to pair a band.'
                        );
                    }
                } else if (this.props.battery_reading) {
                    this.props.playSyncSound();
                    this.readBatteryLevel(reader, card.uid);
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
                    this.props.playSyncSound();
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
                console.log(responses);
                responses.forEach((response, key) => {
                    for (let j = 0; j < 8; j++) {
                        const stepsForHour = response.readInt16LE(j * 2);
                        steps.push({
                            hour_id: key * 8 + j,
                            steps: stepsForHour
                        });
                    }
                });

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
                            this.state.totalSteps,
                            this.removeAlreadySyncedSteps(
                                steps,
                                this.state.totalSteps
                            ),
                            (responseAsHex[0] / 9) * 100
                        );

                        this.resetSteps(reader, false);
                        return true;
                    })
                    .catch(error => {
                        console.log(
                            'Error while reading battery levels: ',
                            error
                        );
                    });
                return true;
            })
            .catch(error => {
                console.log(`error`, error);
            });
    };

    removeAlreadySyncedSteps = (steps, totalSteps) => {
        /**
         * We use this method because the bands have some kind of bug that does this:
         * If you sync the band and then reset the steps, sometimes the total steps counter is resetted,
         * but the steps per hour is not. That's why we need to do the dirty stuff below.
         */
        let tempSum = 0;
        steps.reverse();
        const newSteps = [];
        for (let i = 0; i < steps.length; i += 2) {
            if (tempSum < totalSteps) {
                const hour = {
                    hour_id: parseInt(steps[i].hour_id / 2, 10),
                    steps: 0
                };
                if (steps[i].steps + tempSum <= totalSteps) {
                    hour.steps += steps[i].steps;
                    tempSum += steps[i].steps;
                    if (tempSum < totalSteps) {
                        if (steps[i + 1].steps + tempSum <= totalSteps) {
                            hour.steps += steps[i + 1].steps;
                            tempSum += steps[i + 1].steps;
                        } else {
                            hour.steps += totalSteps - tempSum;
                            tempSum = totalSteps;
                        }
                    }
                } else {
                    hour.steps += totalSteps - tempSum;
                    tempSum = totalSteps;
                }
                if (hour.steps > 0) {
                    newSteps.push(hour);
                }
            }
        }
        return newSteps.reverse();
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
                console.log('Error while reading battery levels: ', error);
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
    battery_reading: state.bands.battery_reading,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    pairBandRequest: (id, uuid) => dispatch(pairBandRequest(id, uuid)),
    syncBandRequest: (id, totalSteps, steps, batteryLevel) =>
        dispatch(syncBandRequest(id, totalSteps, steps, batteryLevel)),
    readBattery: (uuid, level) => dispatch(readBattery(uuid, level)),
    push: pathName => dispatch(push(pathName)),
    playSyncSound: () => dispatch(playSyncSound()),
    playFailSound: () => dispatch(playFailSound())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NFCListener);
