import React, { Component } from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { stopPairSound } from '../actions/sound';
import pairSound from '../sounds/Pair.mp3';

export class PairSound extends Component {
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
                url={pairSound}
                playStatus={this.props.playing}
                playFromPosition={0}
                volume={100}
                onFinishedPlaying={this.handleFinishedPlaying}
            />
        );
    }
}

const mapStateToProps = state => ({
    playing: state.sounds.pair
});

const mapDispatchToProps = dispatch => ({
    stopPlaying: () => dispatch(stopPairSound())
});

export default connect(mapStateToProps, mapDispatchToProps)(PairSound);
