import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken } from '../selectors/auth';
import decrypt from '../utils/decrypt';
import AuthAPI from '../apis/auth';

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

export function* deleteAccount() {
    const token = yield select(getToken);
    const response = yield call(AuthAPI.deleteAccount, {
        Authorization: token
    });

    sessionStorage.setItem('Authorization', null);

    const decoded = decrypt(response.data);

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
}

export function* changeSetting(action) {
    const token = yield select(getToken);
    yield call(
        AuthAPI.changeSetting,
        {
            Authorization: token
        },
        action.settingName
    );

    yield put({
        type: 'CHANGE_SETTING',
        [action.settingName]: ''
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
        hideTotals: !!decoded.hide_totals
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
