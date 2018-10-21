import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken } from '../selectors/auth';
import AuthAPI from '../apis/auth';

export function* login(action) {
    try {
        const response = yield call(
            AuthAPI.login,
            {},
            action.email,
            action.password
        );

        sessionStorage.setItem('Authorization', response.data.token);
        yield put({
            type: 'LOGIN',
            token: response.data.token,
            schoolName: response.data.school_name,
            fullName: response.data.full_name,
            email: response.data.email
        });

        yield put({
            type: 'SET_ACTIVE_MENU',
            menu: 'players'
        });

        yield put(push('/players'));
    } catch (error) {
        yield put({
            type: 'SHOW_ALERT',
            message: error.message
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

    if (response.data.success) {
        sessionStorage.setItem('Authorization', null);

        yield put({
            type: 'SHOW_ALERT',
            message: response.data.message
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
            message: response.data.message
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

    yield put({
        type: 'SHOW_ALERT',
        message: response.data.message
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
    const response = yield call(
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

    yield put({
        type: 'GET_SETTINGS',
        ignoreWeekend: !!response.data.ignore_weekend,
        hideTotals: !!response.data.hide_totals
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
