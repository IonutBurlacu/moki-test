export default (
    state = {
        pairing: false,
        selectedPlayerId: null,
        syncs: [],
        loading: false
    },
    action
) => {
    switch (action.type) {
        case 'PAIR_MODE_ON':
            return {
                ...state,
                pairing: true
            };
        case 'PAIR_MODE_OFF':
            return {
                ...state,
                pairing: false
            };
        case 'PLAYER_SELECTED': {
            return {
                ...state,
                selectedPlayerId: action.id
            };
        }
        case 'PAIR_BAND_REQUEST': {
            return {
                ...state
            };
        }
        case 'PAIR_BAND': {
            return {
                ...state,
                selectedPlayerId: null
            };
        }
        case 'SYNC_BAND_REQUEST': {
            return {
                ...state,
                loading: true
            };
        }
        case 'SYNC_BAND': {
            return {
                ...state,
                syncs: [
                    ...state.syncs,
                    {
                        steps: action.totalSteps,
                        ...action.player
                    }
                ],
                loading: false
            };
        }
        default:
            return state;
    }
};
