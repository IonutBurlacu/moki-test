import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../Header';
import Footer from '../Footer';
import { PageTitle } from '../PageTitle';
import {
    batteryReadingModeOn,
    batteryReadingModeOff
} from '../../actions/bands';
import defaultAvatar from '../../images/default_avatar.png';

export class ReadBatteryPage extends Component {
    componentWillMount() {
        this.props.batteryReadingModeOn();
    }

    componentWillUnmount() {
        this.props.batteryReadingModeOff();
    }

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={<Link to="/settings">Back</Link>}
                    rightButton={<div />}
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageTitle title="Reading Battery" isGreen />
                        <ul className="reads-wrapper">
                            {this.props.reads.map((read, key) => (
                                <li key={key} className="sync-body">
                                    <p className="band-uuid">
                                        {`Band <${read.uuid}>`}
                                    </p>
                                    <p className="battery-level">
                                        Battery level: {read.level.toFixed(0)}%
                                    </p>
                                    <div className="separator" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reads: state.bands.reads,
    loading: state.bands.loading
});

const mapDispatchToProps = dispatch => ({
    batteryReadingModeOn: () => dispatch(batteryReadingModeOn()),
    batteryReadingModeOff: () => dispatch(batteryReadingModeOff())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadBatteryPage);
