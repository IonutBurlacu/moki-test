export const pairModeOn = () => ({
    type: 'PAIR_MODE_ON'
});

export const pairModeOff = () => ({
    type: 'PAIR_MODE_OFF'
});

export const playerSelected = id => ({
    type: 'PLAYER_SELECTED',
    id
});

export const pairBandRequest = (id, uuid) => ({
    type: 'PAIR_BAND_REQUEST',
    id,
    uuid
});

export const pairBand = () => ({
    type: 'PAIR_MODE_OFF'
});
