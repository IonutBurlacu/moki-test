import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import { getToken } from '../selectors/auth';
import PlayersAPI from '../apis/players';

export function* playersFetchList(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.get,
        { Authorization: token },
        action.listDate,
        moment(action.listStartDate).format('YYYY-MM-DD'),
        moment(action.listEndDate).format('YYYY-MM-DD')
    );

    yield put({
        type: 'GET_PLAYERS',
        players: response.data.players,
        teams: response.data.teams,
        listDate: action.listDate,
        listStartDate: action.listStartDate,
        listEndDate: action.listEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerView(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.view,
        { Authorization: token },
        action.id
    );

    yield put({
        type: 'VIEW_PLAYER',
        player: response.data.player,
        grades: response.data.grades,
        years: response.data.years
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerDelete(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.delete,
        { Authorization: token },
        action.id
    );

    yield put({
        type: 'DELETE_PLAYER',
        id: action.id
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/players'));
}

export function* playerStats(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.stats,
        { Authorization: token },
        action.id,
        action.chartType,
        moment(action.chartStartDate).format('YYYY-MM-DD'),
        moment(action.chartEndDate).format('YYYY-MM-DD')
    );

    yield put({
        type: 'STATS_PLAYER',
        overview: response.data.overview,
        typical: response.data.typical,
        chartType: action.chartType,
        chartStartDate: action.chartStartDate,
        chartEndDate: action.chartEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerCreate() {
    const token = yield select(getToken);
    const response = yield call(PlayersAPI.create, { Authorization: token });

    yield put({
        type: 'CREATE_PLAYER',
        grades: response.data.grades,
        years: response.data.years
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerInsert(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.insert,
        { Authorization: token },
        action.player
    );

    yield put({
        type: 'INSERT_PLAYER',
        player: { ...action.player, id: response.data.player.id }
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/players'));
}

export function* playerEdit(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.edit,
        { Authorization: token },
        action.id
    );

    yield put({
        type: 'EDIT_PLAYER',
        player: response.data.player,
        grades: response.data.grades,
        years: response.data.years,
        challenges: response.data.challenges,
        teams: response.data.teams
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerUpdate(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.update,
        { Authorization: token },
        action.player,
        action.id
    );

    yield put({
        type: 'UPDATE_PLAYER',
        player: action.player
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/players'));
}

export function* playerAttachToTeam(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.attachToTeam,
        { Authorization: token },
        action.teamId,
        action.playerId
    );

    yield put({
        type: 'ATTACH_PLAYER_TO_TEAM',
        teamId: action.teamId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerDetachFromTeam(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.detachFromTeam,
        { Authorization: token },
        action.teamId,
        action.playerId
    );

    yield put({
        type: 'DETACH_PLAYER_FROM_TEAM',
        teamId: action.teamId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerAttachToChallenge(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.attachToChallenge,
        { Authorization: token },
        action.challengeId,
        action.playerId
    );

    yield put({
        type: 'ATTACH_PLAYER_TO_CHALLENGE',
        challengeId: action.challengeId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* playerDetachFromChallenge(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.detachFromChallenge,
        { Authorization: token },
        action.challengeId,
        action.playerId
    );

    yield put({
        type: 'DETACH_PLAYER_FROM_CHALLENGE',
        challengeId: action.challengeId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* deleteDatabase(action) {
    const token = yield select(getToken);
    const response = yield call(PlayersAPI.deleteDatabase, {
        Authorization: token
    }, action.password);

    yield put({
        type: 'SHOW_ALERT',
        message: response.data.message
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* importDatabase(action) {
    const token = yield select(getToken);
    const response = yield call(
        PlayersAPI.importDatabase,
        {
            Authorization: token
        },
        action.file
    );

    yield put({
        type: 'SHOW_ALERT',
        message: response.data.message
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
