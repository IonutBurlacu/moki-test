import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import decrypt from '../utils/decrypt';
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_PLAYERS',
        players: decoded.players,
        teams: decoded.teams,
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'VIEW_PLAYER',
        player: decoded.player,
        grades: decoded.grades,
        years: decoded.years
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'STATS_PLAYER',
        overview: decoded.overview,
        typical: decoded.typical,
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'CREATE_PLAYER',
        grades: decoded.grades,
        years: decoded.years,
        tags: decoded.tags
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'INSERT_PLAYER',
        player: { ...action.player, id: decoded.player.id }
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'EDIT_PLAYER',
        player: decoded.player,
        grades: decoded.grades,
        years: decoded.years,
        challenges: decoded.challenges,
        teams: decoded.teams,
        tags: decoded.tags
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
    const response = yield call(
        PlayersAPI.deleteDatabase,
        {
            Authorization: token
        },
        action.password
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'SHOW_ALERT',
        message: decoded.message
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

    const decoded = decrypt(response.data);

    yield put({
        type: 'SHOW_ALERT',
        message: decoded.message
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
