import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
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
            token: response.data.token
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
