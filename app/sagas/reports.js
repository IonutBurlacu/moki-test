import { call, put, select } from 'redux-saga/effects';
import moment from 'moment';
import decrypt from '../utils/decrypt';
import { getToken } from '../selectors/auth';
import ReportsAPI from '../apis/reports';
import TeamsAPI from '../apis/teams';

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

export function* getPlayerAverages(action) {
    const token = yield select(getToken);
    const response = yield call(
        ReportsAPI.playerAverages,
        {
            Authorization: token
        },
        action.teamId,
        action.dateByType,
        moment(action.dateByStartDate).format('YYYY-MM-DD'),
        moment(action.dateByEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_PLAYER_AVERAGES',
        data: decoded.data,
        teamId: decoded.team_id,
        dateByType: action.dateByType,
        dateByStartDate: decoded.start_date,
        dateByEndDate: decoded.end_date,
        scales: decoded.scales
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
        action.dateByType,
        moment(action.dateByStartDate).format('YYYY-MM-DD'),
        moment(action.dateByEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_GROUP_AVERAGES',
        data: decoded.data,
        teamId: decoded.team_id,
        dateByType: action.dateByType,
        dateByStartDate: decoded.start_date,
        dateByEndDate: decoded.end_date,
        scales: decoded.scales
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
        action.dateByType,
        moment(action.dateByStartDate).format('YYYY-MM-DD'),
        moment(action.dateByEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_TOTAL_STEPS',
        data: decoded.data,
        teamId: decoded.team_id,
        dateByType: action.dateByType,
        dateByStartDate: decoded.start_date,
        dateByEndDate: decoded.end_date,
        scales: decoded.scales,
        playersCount: decoded.players_count
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getDownloadPdfTeams(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.get,
        { Authorization: token },
        action.dateByType,
        moment(action.dateByStartDate).format('YYYY-MM-DD'),
        moment(action.dateByEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_DOWNLOAD_PDF_TEAMS',
        teams: decoded.teams,
        dateByType: action.dateByType,
        dateByStartDate: action.dateByStartDate,
        dateByEndDate: action.dateByEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* getDownloadCsvTeams(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.get,
        { Authorization: token },
        action.dateByType,
        moment(action.dateByStartDate).format('YYYY-MM-DD'),
        moment(action.dateByEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_DOWNLOAD_CSV_TEAMS',
        teams: decoded.teams,
        dateByType: action.dateByType,
        dateByStartDate: action.dateByStartDate,
        dateByEndDate: action.dateByEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
