import { call, put, select } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { getToken } from '../selectors/auth';
import TeamsAPI from '../apis/teams';

export function* teamsFetchList() {
  const token = yield select(getToken);
  const response = yield call(TeamsAPI.get, { Authorization: token });

  yield put({
    type: 'GET_TEAMS',
    teams: response.data.teams
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

  yield put({
    type: 'INSERT_TEAM',
    team: { ...action.team, id: response.data.team.id }
  });

  yield put({
    type: 'HIDE_LOADER'
  });

  yield put(goBack());
}

export function* teamEdit(action) {
  const token = yield select(getToken);
  const response = yield call(
    TeamsAPI.edit,
    { Authorization: token },
    action.id
  );

  yield put({
    type: 'EDIT_TEAM',
    team: response.data.team,
    challenges: response.data.challenges,
    players: response.data.players
  });

  yield put({
    type: 'HIDE_LOADER'
  });
}

export function* teamUpdate(action) {
  const token = yield select(getToken);
  const response = yield call(
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

  yield put(goBack());
}

export function* teamView(action) {
  const token = yield select(getToken);
  const response = yield call(
    TeamsAPI.view,
    { Authorization: token },
    action.id
  );

  yield put({
    type: 'VIEW_TEAM',
    team: response.data.team
    // player: response.data.player,
    // grades: response.data.grades,
    // years: response.data.years
  });

  yield put({
    type: 'HIDE_LOADER'
  });
}

export function* teamAttachToPlayer(action) {
  const token = yield select(getToken);
  const response = yield call(
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
  const response = yield call(
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
  const response = yield call(
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
  const response = yield call(
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
