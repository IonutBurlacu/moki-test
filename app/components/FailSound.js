import React, { Component } from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { stopFailSound } from '../actions/sound';
import failSound from '../sounds/Fail.mp3';

export class FailSound extends Component {
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
                url={failSound}
                playStatus={this.props.playing}
                playFromPosition={0}
                volume={100}
                onFinishedPlaying={this.handleFinishedPlaying}
            />
        );
    }
}

const mapStateToProps = state => ({
    playing: state.sounds.fail
});

const mapDispatchToProps = dispatch => ({
    stopPlaying: () => dispatch(stopFailSound())
});

export default connect(mapStateToProps, mapDispatchToProps)(FailSound);
