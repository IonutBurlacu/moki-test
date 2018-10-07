export const getChallengesRequest = (listDate, listStartDate, listEndDate) => ({
    type: 'GET_CHALLENGES_REQUEST',
    listDate,
    listStartDate,
    listEndDate
});

export const getChallenges = (challenges, listDate) => ({
    type: 'GET_CHALLENGES',
    challenges,
    listDate
});

export const changeChallengesListDate = (
    listDate,
    listStartDate,
    listEndDate
) => ({
    type: 'CHANGE_CHALLENGES_LIST_DATE',
    listDate,
    listStartDate,
    listEndDate
});

export const changeChallengesListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_CHALLENGES_LIST_SORT',
    listSort,
    listSortLabel
});

export const changeChallengesListFilter = (listFilter, listFilterValue) => ({
    type: 'CHANGE_CHALLENGES_LIST_FILTER',
    listFilter,
    listFilterValue
});

export const viewChallengeRequest = id => ({
    type: 'VIEW_CHALLENGE_REQUEST',
    id
});

export const viewChallenge = challenge => ({
    type: 'VIEW_CHALLENGE',
    challenge
});

export const deleteChallengeRequest = id => ({
    type: 'DELETE_CHALLENGE_REQUEST',
    id
});

export const deleteChallenge = id => ({
    type: 'DELETE_CHALLENGE',
    id
});

export const insertChallengeRequest = challenge => ({
    type: 'INSERT_CHALLENGE_REQUEST',
    challenge
});

export const insertChallenge = challenge => ({
    type: 'INSERT_CHALLENGE',
    challenge
});

export const editChallengeRequest = () => ({
    type: 'EDIT_CHALLENGE_REQUEST'
});

export const editChallenge = (teams, players) => ({
    type: 'EDIT_CHALLENGE',
    teams,
    players
});

export const updateChallengeRequest = (challenge, id) => ({
    type: 'UPDATE_CHALLENGE_REQUEST',
    challenge,
    id
});

export const updateChallenge = (challenge, id) => ({
    type: 'UPDATE_CHALLENGE',
    challenge,
    id
});

export const attachChallengeToTeamRequest = (teamId, challengeId) => ({
    type: 'ATTACH_CHALLENGE_TO_TEAM_REQUEST',
    teamId,
    challengeId
});

export const attachChallengeToTeam = teamId => ({
    type: 'ATTACH_CHALLENGE_TO_TEAM',
    teamId
});

export const detachChallengeFromTeamRequest = (teamId, challengeId) => ({
    type: 'DETACH_CHALLENGE_FROM_TEAM_REQUEST',
    teamId,
    challengeId
});

export const detachChallengeFromTeam = teamId => ({
    type: 'DETACH_CHALLENGE_FROM_TEAM',
    teamId
});

export const attachChallengeToPlayerRequest = (playerId, challengeId) => ({
    type: 'ATTACH_CHALLENGE_TO_PLAYER_REQUEST',
    playerId,
    challengeId
});

export const attachChallengeToPlayer = playerId => ({
    type: 'ATTACH_CHALLENGE_TO_PLAYER',
    playerId
});

export const detachChallengeFromPlayerRequest = (playerId, challengeId) => ({
    type: 'DETACH_CHALLENGE_FROM_PLAYER_REQUEST',
    playerId,
    challengeId
});

export const detachChallengeFromPlayer = playerId => ({
    type: 'DETACH_CHALLENGE_FROM_PLAYER',
    playerId
});
