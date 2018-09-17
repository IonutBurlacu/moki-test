import { call, put, select } from 'redux-saga/effects';
import { getToken } from '../selectors/auth';
import ReportsAPI from '../apis/reports';

export function* getReportsTeams() {
    const token = yield select(getToken);
    const response = yield call(ReportsAPI.index, { Authorization: token });

    yield put({
        type: 'GET_REPORTS_TEAMS',
        teams: response.data.teams,
        overview: response.data.overview,
        typical: response.data.typical
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* statsReportsTeams(action) {
    const token = yield select(getToken);
    const response = yield call(
        ReportsAPI.stats,
        { Authorization: token },
        action.teamIdsA,
        action.teamIdsB,
        action.chartType
    );

    yield put({
        type: 'STATS_REPORTS_TEAMS',
        overview: response.data.overview,
        typical: response.data.typical,
        chartType: action.chartType
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
