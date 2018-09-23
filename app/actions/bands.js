export const pairModeOn = () => ({
    type: 'PAIR_MODE_ON'
});

export const pairModeOff = () => ({
    type: 'PAIR_MODE_OFF'
});

export const batteryReadingModeOn = () => ({
    type: 'BATTERY_READING_MODE_ON'
});

export const batteryReadingModeOff = () => ({
    type: 'BATTERY_READING_MODE_OFF'
});

export const readBattery = (uuid, level) => ({
    type: 'READ_BATTERY',
    uuid,
    level
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

export const syncBandRequest = (uuid, totalSteps, steps, batteryLevel) => ({
    type: 'SYNC_BAND_REQUEST',
    uuid,
    totalSteps,
    steps,
    batteryLevel
});

export const syncBand = (player, totalSteps, batteryLevel) => ({
    type: 'SYNC_BAND',
    player,
    totalSteps,
    batteryLevel
});

export const syncBandFailed = () => ({
    type: 'SYNC_BAND_FAILED'
});
