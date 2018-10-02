import React, { Component } from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { stopPairSound } from '../actions/sound';
import pairSound from '../sounds/Pair.wav';

export class PairSound extends Component {
    handleFinishedPlaying = () => {
        this.props.stopPlaying();
    };

    render() {
        return (
            <Sound
                url={pairSound}
                playStatus={this.props.playing}
                playFromPosition={0}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PairSound);
