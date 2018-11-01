import { call, put, select } from 'redux-saga/effects';
import { getToken } from '../selectors/auth';
import decrypt from '../utils/decrypt';
import BandsAPI from '../apis/bands';

export function* pairBand(action) {
    const token = yield select(getToken);
    const response = yield call(
        BandsAPI.pair,
        { Authorization: token },
        action
    );

    const decoded = decrypt(response.data);

    if (decoded.status) {
        yield put({
            type: 'PAIR_BAND_TO_PLAYER',
            id: action.id,
            band: decoded.band
        });

        yield put({
            type: 'PAIR_BAND'
        });

        yield put({
            type: 'PLAY_PAIR_SOUND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });
    } else {
        yield put({
            type: 'PAIR_BAND'
        });

        yield put({
            type: 'PLAY_FAIL_SOUND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });
    }

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* syncBand(action) {
    const token = yield select(getToken);
    const response = yield call(
        BandsAPI.sync,
        { Authorization: token },
        action
    );

    const decoded = decrypt(response.data);

    if (decoded.status) {
        yield put({
            type: 'SYNC_BAND',
            player: decoded.player,
            totalSteps: decoded.totalSteps,
            batteryLevel: action.batteryLevel
        });

        yield put({
            type: 'PLAY_SYNC_SOUND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });
    } else {
        yield put({
            type: 'SYNC_BAND_FAILED'
        });

        yield put({
            type: 'PLAY_FAIL_SOUND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });
    }

    yield put({
        type: 'HIDE_LOADER'
    });
}
