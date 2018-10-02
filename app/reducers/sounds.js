import Sound from 'react-sound';

export default (
    state = {
        pair: Sound.status.STOPPED,
        sync: Sound.status.STOPPED,
        fail: Sound.status.STOPPED
    },
    action
) => {
    switch (action.type) {
        case 'PLAY_PAIR_SOUND':
            return {
                ...state,
                pair: Sound.status.PLAYING
            };
        case 'STOP_PAIR_SOUND':
            return {
                ...state,
                pair: Sound.status.STOPPED
            };
        case 'PLAY_SYNC_SOUND':
            return {
                ...state,
                sync: Sound.status.PLAYING
            };
        case 'STOP_SYNC_SOUND':
            return {
                ...state,
                sync: Sound.status.STOPPED
            };
        case 'PLAY_FAIL_SOUND':
            return {
                ...state,
                fail: Sound.status.PLAYING
            };
        case 'STOP_FAIL_SOUND':
            return {
                ...state,
                fail: Sound.status.STOPPED
            };
        default:
            return state;
    }
};
