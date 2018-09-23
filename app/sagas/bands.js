import { call, put, select } from 'redux-saga/effects';
import { getToken } from '../selectors/auth';
import BandsAPI from '../apis/bands';

export function* pairBand(action) {
    const token = yield select(getToken);
    const response = yield call(
        BandsAPI.pair,
        { Authorization: token },
        action
    );

    if (response.data.status) {
        yield put({
            type: 'PAIR_BAND_TO_PLAYER',
            id: action.id,
            band: response.data.band
        });

        yield put({
            type: 'PAIR_BAND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: response.data.message
        });
    } else {
        yield put({
            type: 'PAIR_BAND'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: response.data.message
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

    if (response.data.status) {
        yield put({
            type: 'SYNC_BAND',
            player: response.data.player,
            totalSteps: response.data.steps
        });

        yield put({
            type: 'SHOW_ALERT',
            message: response.data.message
        });
    } else {
        yield put({
            type: 'SYNC_BAND_FAILED',
        });

        yield put({
            type: 'SHOW_ALERT',
            message: response.data.message
        });
    }

    yield put({
        type: 'HIDE_LOADER'
    });
}