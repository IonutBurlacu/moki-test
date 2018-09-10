import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken } from '../selectors/auth';
import AuthAPI from '../apis/auth';

export function* login(action) {
  const token = yield select(getToken);
  const response = yield call(AuthAPI.login, {}, action.email, action.password);

  sessionStorage.setItem('Authorization', response.data.token);

  yield put({
    type: 'LOGIN',
    token: response.data.token
  });

  yield put({
    type: 'HIDE_LOADER'
  });

  yield put(push('/players'));
}
