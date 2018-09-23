export default (
    state = {
        pairing: false,
        battery_reading: false,
        selectedPlayerId: null,
        syncs: [],
        reads: [],
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
        case 'BATTERY_READING_MODE_ON':
            return {
                ...state,
                battery_reading: true,
                reads: []
            };
        case 'BATTERY_READING_MODE_OFF':
            return {
                ...state,
                battery_reading: false
            };
        case 'READ_BATTERY':
            return {
                ...state,
                reads: [
                    {
                        uuid: action.uuid,
                        level: action.level
                    },
                    ...state.reads
                ]
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
                    {
                        ...action.player,
                        steps: action.totalSteps,
                        batteryLevel: action.batteryLevel
                    },
                    ...state.syncs
                ],
                loading: false
            };
        }
        case 'SYNC_BAND_FAILED':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
