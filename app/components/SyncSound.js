import React, { Component } from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { stopSyncSound } from '../actions/sound';
import syncSound from '../sounds/Sync.wav';

export class SyncSound extends Component {
    constructor(props) {
        super(props);
        soundManager.setup({ debugMode: false });
    }

    handleFinishedPlaying = () => {
        this.props.stopPlaying();
    };

    render() {
        return (
            <Sound
                url={syncSound}
                playStatus={this.props.playing}
                playFromPosition={0}
                volume={100}
                onFinishedPlaying={this.handleFinishedPlaying}
            />
        );
    }
}

const mapStateToProps = state => ({
    playing: state.sounds.sync
});

const mapDispatchToProps = dispatch => ({
    stopPlaying: () => dispatch(stopSyncSound())
});

export default connect(mapStateToProps, mapDispatchToProps)(SyncSound);
