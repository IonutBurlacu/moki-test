import { call, put, select } from 'redux-saga/effects';
import moment from 'moment';
import decrypt from '../utils/decrypt';
import { getToken } from '../selectors/auth';
import ReportsAPI from '../apis/reports';

export function* getReportsTeams() {
    const token = yield select(getToken);
    const response = yield call(ReportsAPI.index, { Authorization: token });

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_REPORTS_TEAMS',
        teams: decoded.teams,
        overview: decoded.overview,
        typical: decoded.typical
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
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD'),
        action.filterByA,
        action.filterByB
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'STATS_REPORTS_TEAMS',
        overview: decoded.overview,
        typical: decoded.typical,
        chartType: action.chartType,
        chartStartDate: action.chartStartDate,
        chartEndDate: action.chartEndDate,
        filterByA: action.filterByA,
        filterByB: action.filterByB
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
