import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken } from '../selectors/auth';
import decrypt from '../utils/decrypt';
import AuthAPI from '../apis/auth';
import appVersion from '../constants/appVersion';

export function* login(action) {
    try {
        const response = yield call(
            AuthAPI.login,
            {},
            action.email,
            action.password
        );

        const decoded = decrypt(response.data);

        sessionStorage.setItem('Authorization', decoded.token);

        yield put({
            type: 'LOGIN',
            token: decoded.token,
            schoolName: decoded.school_name,
            fullName: decoded.full_name,
            email: decoded.email
        });

        yield put({
            type: 'SET_ACTIVE_MENU',
            menu: 'players'
        });

        yield put(push('/players'));
    } catch (error) {
        const decoded = decrypt(error.message);
        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });

        yield put({
            type: 'HIDE_LOADER'
        });
    }
}

export function* changePassword(action) {
    const token = yield select(getToken);
    const response = yield call(
        AuthAPI.changePassword,
        {
            Authorization: token
        },
        action.oldPassword,
        action.newPassword
    );

    const decoded = decrypt(response.data);

    if (decoded.success) {
        sessionStorage.setItem('Authorization', null);

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });

        yield put({
            type: 'DELETE_ACCOUNT'
        });

        yield put({
            type: 'HIDE_LOADER'
        });

        yield put(push('/login'));
    } else {
        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });

        yield put({
            type: 'HIDE_LOADER'
        });
    }
}

export function* deleteAccount(action) {
    const token = yield select(getToken);
    const response = yield call(
        AuthAPI.deleteAccount,
        {
            Authorization: token
        },
        action.password
    );

    sessionStorage.setItem('Authorization', null);

    const decoded = decrypt(response.data);

    yield put({
        type: 'SHOW_ALERT',
        message: decoded.message
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    if (decoded.success) {
        yield put({
            type: 'DELETE_ACCOUNT'
        });

        yield put(push('/login'));
    }
}

export function* changeSetting(action) {
    const token = yield select(getToken);
    yield call(
        AuthAPI.changeSetting,
        {
            Authorization: token
        },
        action.settingName,
        action.settingValue
    );

    yield put({
        type: 'CHANGE_SETTING',
        settingName: action.settingName,
        settingValue: action.settingValue
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getSettings() {
    const token = yield select(getToken);
    const response = yield call(AuthAPI.getSettings, {
        Authorization: token
    });

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_SETTINGS',
        ignoreWeekend: !!decoded.ignore_weekend,
        hideTotals: !!decoded.hide_totals,
        minHourId: decoded.min_hour_id,
        maxHourId: decoded.max_hour_id
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* forgotPassword(action) {
    try {
        const response = yield call(AuthAPI.forgotPassword, {}, action.email);

        const decoded = decrypt(response.data);

        yield put({
            type: 'HIDE_LOADER'
        });

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });

        yield put(push('/login'));
    } catch (error) {
        const decoded = decrypt(error.message);

        yield put({
            type: 'SHOW_ALERT',
            message: decoded.message
        });

        yield put({
            type: 'HIDE_LOADER'
        });
    }
}

export function* getVersion() {
    const response = yield call(AuthAPI.getVersion);

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_VERSION',
        version: decoded.version
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    if (appVersion !== decoded.version) {
        yield put({
            type: 'SHOW_ALERT',
            message:
                'There is a new version of the app released. Please update your app.'
        });
    }
}
