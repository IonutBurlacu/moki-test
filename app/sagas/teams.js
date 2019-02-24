import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import decrypt from '../utils/decrypt';
import { getToken } from '../selectors/auth';
import TeamsAPI from '../apis/teams';

export function* teamsFetchList(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.get,
        { Authorization: token },
        action.listDate,
        moment(action.listStartDate).format('YYYY-MM-DD'),
        moment(action.listEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_TEAMS',
        teams: decoded.teams,
        listDate: action.listDate,
        listStartDate: action.listStartDate,
        listEndDate: action.listEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamStats(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.stats,
        { Authorization: token },
        action.id,
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'STATS_TEAM',
        data: decoded.data,
        chartType: action.chartType,
        chartStartDate: action.chartStartDate,
        chartEndDate: action.chartEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamInsert(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.insert,
        { Authorization: token },
        action.team
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'INSERT_TEAM',
        team: { ...action.team, id: decoded.team.id }
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/teams'));
}

export function* teamEdit(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.edit,
        { Authorization: token },
        action.id
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'EDIT_TEAM',
        team: decoded.team,
        challenges: decoded.challenges,
        players: decoded.players
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamUpdate(action) {
    const token = yield select(getToken);
    yield call(
        TeamsAPI.update,
        { Authorization: token },
        action.team,
        action.id
    );

    yield put({
        type: 'UPDATE_TEAM',
        team: action.team
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/teams'));
}

export function* teamView(action) {
    const token = yield select(getToken);
    const response = yield call(
        TeamsAPI.view,
        { Authorization: token },
        action.id
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'VIEW_TEAM',
        team: decoded.team
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamDelete(action) {
    const token = yield select(getToken);
    yield call(TeamsAPI.delete, { Authorization: token }, action.id);

    yield put({
        type: 'DELETE_TEAM',
        id: action.id
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/teams'));
}

export function* teamAttachToPlayer(action) {
    const token = yield select(getToken);
    yield call(
        TeamsAPI.attachToPlayer,
        { Authorization: token },
        action.playerId,
        action.teamId
    );

    yield put({
        type: 'ATTACH_TEAM_TO_PLAYER',
        playerId: action.playerId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamDetachFromPlayer(action) {
    const token = yield select(getToken);
    yield call(
        TeamsAPI.detachFromPlayer,
        { Authorization: token },
        action.playerId,
        action.teamId
    );

    yield put({
        type: 'DETACH_TEAM_FROM_PLAYER',
        playerId: action.playerId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamAttachToChallenge(action) {
    const token = yield select(getToken);
    yield call(
        TeamsAPI.attachToChallenge,
        { Authorization: token },
        action.challengeId,
        action.teamId
    );

    yield put({
        type: 'ATTACH_TEAM_TO_CHALLENGE',
        challengeId: action.challengeId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* teamDetachFromChallenge(action) {
    const token = yield select(getToken);
    yield call(
        TeamsAPI.detachFromChallenge,
        { Authorization: token },
        action.challengeId,
        action.teamId
    );

    yield put({
        type: 'DETACH_TEAM_FROM_CHALLENGE',
        challengeId: action.challengeId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
