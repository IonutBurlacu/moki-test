import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { login } from './auth';
import {
	challengesFetchList,
	challengeInsert,
	challengeEdit,
	challengeUpdate,
	challengeView,
	challengeAttachToPlayer,
	challengeDetachFromPlayer,
	challengeAttachToTeam,
	challengeDetachFromTeam
	// challengesDelete
} from './challenges';

import {
	teamsFetchList,
	teamInsert,
	teamEdit,
	teamUpdate,
	teamView,
	teamAttachToPlayer,
	teamDetachFromPlayer,
	teamAttachToChallenge,
	teamDetachFromChallenge
	// challengesDelete
} from './teams';

import {
	playersFetchList,
	playerCreate,
	playerInsert,
	playerEdit,
	playerUpdate,
	playerView,
	playerAttachToTeam,
	playerDetachFromTeam,
	playerAttachToChallenge,
	playerDetachFromChallenge
	// challengesDelete
} from './players';

export default function* sagas() {
	yield [
		fork(takeLatest, 'LOGIN_REQUEST', login),

		fork(takeLatest, 'GET_CHALLENGES_REQUEST', challengesFetchList),
		fork(takeLatest, 'INSERT_CHALLENGE_REQUEST', challengeInsert),
		fork(takeLatest, 'EDIT_CHALLENGE_REQUEST', challengeEdit),
		fork(takeLatest, 'UPDATE_CHALLENGE_REQUEST', challengeUpdate),
		fork(takeLatest, 'VIEW_CHALLENGE_REQUEST', challengeView),
		fork(
			takeLatest,
			'ATTACH_CHALLENGE_TO_PLAYER_REQUEST',
			challengeAttachToPlayer
		),
		fork(
			takeLatest,
			'DETACH_CHALLENGE_FROM_PLAYER_REQUEST',
			challengeDetachFromPlayer
		),
		fork(
			takeLatest,
			'ATTACH_CHALLENGE_TO_TEAM_REQUEST',
			challengeAttachToTeam
		),
		fork(
			takeLatest,
			'DETACH_CHALLENGE_FROM_TEAM_REQUEST',
			challengeDetachFromTeam
		),

		fork(takeLatest, 'GET_TEAMS_REQUEST', teamsFetchList),
		fork(takeLatest, 'INSERT_TEAM_REQUEST', teamInsert),
		fork(takeLatest, 'EDIT_TEAM_REQUEST', teamEdit),
		fork(takeLatest, 'UPDATE_TEAM_REQUEST', teamUpdate),
		fork(takeLatest, 'VIEW_TEAM_REQUEST', teamView),
		fork(takeLatest, 'ATTACH_TEAM_TO_PLAYER_REQUEST', teamAttachToPlayer),
		fork(
			takeLatest,
			'DETACH_TEAM_FROM_PLAYER_REQUEST',
			teamDetachFromPlayer
		),
		fork(
			takeLatest,
			'ATTACH_TEAM_TO_CHALLENGE_REQUEST',
			teamAttachToChallenge
		),
		fork(
			takeLatest,
			'DETACH_TEAM_FROM_CHALLENGE_REQUEST',
			teamDetachFromChallenge
		),

		fork(takeLatest, 'GET_PLAYERS_REQUEST', playersFetchList),
		fork(takeLatest, 'CREATE_PLAYER_REQUEST', playerCreate),
		fork(takeLatest, 'INSERT_PLAYER_REQUEST', playerInsert),
		fork(takeLatest, 'EDIT_PLAYER_REQUEST', playerEdit),
		fork(takeLatest, 'UPDATE_PLAYER_REQUEST', playerUpdate),
		fork(takeLatest, 'VIEW_PLAYER_REQUEST', playerView),
		fork(takeLatest, 'ATTACH_PLAYER_TO_TEAM_REQUEST', playerAttachToTeam),
		fork(
			takeLatest,
			'DETACH_PLAYER_FROM_TEAM_REQUEST',
			playerDetachFromTeam
		),
		fork(
			takeLatest,
			'ATTACH_PLAYER_TO_CHALLENGE_REQUEST',
			playerAttachToChallenge
		),
		fork(
			takeLatest,
			'DETACH_PLAYER_FROM_CHALLENGE_REQUEST',
			playerDetachFromChallenge
		)
	];
}
