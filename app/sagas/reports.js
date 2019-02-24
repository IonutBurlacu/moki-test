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
        teams: decoded.teams
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getPlayerVariation(action) {
    const token = yield select(getToken);
    const response = yield call(
        ReportsAPI.playerVariation,
        {
            Authorization: token
        },
        action.teamId,
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_PLAYER_VARIATION',
        data: decoded.data,
        teamId: decoded.team_id,
        chartType: action.chartType,
        chartStartDate: decoded.start_date,
        chartEndDate: decoded.end_date
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getGroupAverages(action) {
    const token = yield select(getToken);
    const response = yield call(
        ReportsAPI.groupAverages,
        {
            Authorization: token
        },
        action.teamId,
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_GROUP_AVERAGES',
        data: decoded.data,
        teamId: decoded.team_id,
        chartType: action.chartType,
        chartStartDate: decoded.start_date,
        chartEndDate: decoded.end_date
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getTotalSteps(action) {
    const token = yield select(getToken);
    const response = yield call(
        ReportsAPI.totalSteps,
        {
            Authorization: token
        },
        action.teamId,
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_TOTAL_STEPS',
        data: decoded.data,
        teamId: decoded.team_id,
        chartType: action.chartType,
        chartStartDate: decoded.start_date,
        chartEndDate: decoded.end_date
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
