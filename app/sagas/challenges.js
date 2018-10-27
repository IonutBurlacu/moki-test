import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import decrypt from '../utils/decrypt';
import { getToken } from '../selectors/auth';
import ChallengesAPI from '../apis/challenges';

export function* challengesFetchList(action) {
    const token = yield select(getToken);
    const response = yield call(
        ChallengesAPI.get,
        { Authorization: token },
        action.listDate,
        moment(action.listStartDate).format('YYYY-MM-DD'),
        moment(action.listEndDate).format('YYYY-MM-DD')
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'GET_CHALLENGES',
        challenges: decoded.challenges,
        teams: decoded.teams,
        listDate: action.listDate,
        listStartDate: action.listStartDate,
        listEndDate: action.listEndDate
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeCreate() {
    const token = yield select(getToken);
    const response = yield call(ChallengesAPI.create, { Authorization: token });

    const decoded = decrypt(response.data);

    yield put({
        type: 'CREATE_CHALLENGE',
        players: decoded.players,
        teams: decoded.teams
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeInsert(action) {
    const token = yield select(getToken);
    const response = yield call(
        ChallengesAPI.insert,
        { Authorization: token },
        action.challenge
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'INSERT_CHALLENGE',
        challenge: { ...action.challenge, id: decoded.challenge.id }
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/challenges'));
}

export function* challengeEdit() {
    const token = yield select(getToken);
    const response = yield call(ChallengesAPI.edit, { Authorization: token });

    const decoded = decrypt(response.data);

    yield put({
        type: 'EDIT_CHALLENGE',
        teams: decoded.teams,
        players: decoded.players
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeUpdate(action) {
    const token = yield select(getToken);
    yield call(
        ChallengesAPI.update,
        { Authorization: token },
        action.challenge,
        action.id
    );

    yield put({
        type: 'UPDATE_CHALLENGE',
        challenge: action.challenge
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/challenges'));
}

export function* challengeView(action) {
    const token = yield select(getToken);
    const response = yield call(
        ChallengesAPI.view,
        { Authorization: token },
        action.id
    );

    const decoded = decrypt(response.data);

    yield put({
        type: 'VIEW_CHALLENGE',
        challenge: decoded.challenge
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeDelete(action) {
    const token = yield select(getToken);
    yield call(ChallengesAPI.delete, { Authorization: token }, action.id);

    yield put({
        type: 'DELETE_CHALLENGE',
        id: action.id
    });

    yield put({
        type: 'HIDE_LOADER'
    });

    yield put(push('/challenges'));
}

export function* challengeAttachToTeam(action) {
    const token = yield select(getToken);
    yield call(
        ChallengesAPI.attachToTeam,
        { Authorization: token },
        action.teamId,
        action.challengeId
    );

    yield put({
        type: 'ATTACH_CHALLENGE_TO_TEAM',
        teamId: action.teamId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeDetachFromTeam(action) {
    const token = yield select(getToken);
    yield call(
        ChallengesAPI.detachFromTeam,
        { Authorization: token },
        action.teamId,
        action.challengeId
    );

    yield put({
        type: 'DETACH_CHALLENGE_FROM_TEAM',
        teamId: action.teamId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeAttachToPlayer(action) {
    const token = yield select(getToken);
    yield call(
        ChallengesAPI.attachToPlayer,
        { Authorization: token },
        action.playerId,
        action.challengeId
    );

    yield put({
        type: 'ATTACH_CHALLENGE_TO_PLAYER',
        playerId: action.playerId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}

export function* challengeDetachFromPlayer(action) {
    const token = yield select(getToken);
    yield call(
        ChallengesAPI.detachFromPlayer,
        { Authorization: token },
        action.playerId,
        action.challengeId
    );

    yield put({
        type: 'DETACH_CHALLENGE_FROM_PLAYER',
        playerId: action.playerId
    });

    yield put({
        type: 'HIDE_LOADER'
    });
}
