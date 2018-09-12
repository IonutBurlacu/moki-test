export const getPlayersRequest = () => ({
    type: 'GET_PLAYERS_REQUEST'
});

export const getPlayers = players => ({
    type: 'GET_PLAYERS',
    players
});

export const viewPlayerRequest = id => ({
    type: 'VIEW_PLAYER_REQUEST',
    id
});

export const viewPlayer = player => ({
    type: 'VIEW_PLAYER',
    player
});

export const createPlayerRequest = () => ({
    type: 'CREATE_PLAYER_REQUEST'
});

export const createPlayer = (grades, years) => ({
    type: 'CREATE_PLAYER',
    grades,
    years
});

export const insertPlayerRequest = player => ({
    type: 'INSERT_PLAYER_REQUEST',
    player
});

export const insertPlayer = player => ({
    type: 'INSERT_PLAYER',
    player
});

export const editPlayerRequest = () => ({
    type: 'EDIT_PLAYER_REQUEST'
});

export const editPlayer = (grades, years, challenges, teams) => ({
    type: 'EDIT_PLAYER',
    grades,
    years,
    challenges,
    teams
});

export const updatePlayerRequest = (player, id) => ({
    type: 'UPDATE_PLAYER_REQUEST',
    player,
    id
});

export const updatePlayer = (player, id) => ({
    type: 'UPDATE_PLAYER',
    player,
    id
});

export const attachPlayerToTeamRequest = (teamId, playerId) => ({
    type: 'ATTACH_PLAYER_TO_TEAM_REQUEST',
    teamId,
    playerId
});

export const attachPlayerToTeam = teamId => ({
    type: 'ATTACH_PLAYER_TO_TEAM',
    teamId
});

export const detachPlayerFromTeamRequest = (teamId, playerId) => ({
    type: 'DETACH_PLAYER_FROM_TEAM_REQUEST',
    teamId,
    playerId
});

export const detachPlayerFromTeam = teamId => ({
    type: 'DETACH_PLAYER_FROM_TEAM',
    teamId
});

export const attachPlayerToChallengeRequest = (challengeId, playerId) => ({
    type: 'ATTACH_PLAYER_TO_CHALLENGE_REQUEST',
    challengeId,
    playerId
});

export const attachPlayerToChallenge = challengeId => ({
    type: 'ATTACH_PLAYER_TO_CHALLENGE',
    challengeId
});

export const detachPlayerFromChallengeRequest = (challengeId, playerId) => ({
    type: 'DETACH_PLAYER_FROM_CHALLENGE_REQUEST',
    challengeId,
    playerId
});

export const detachPlayerFromChallenge = challengeId => ({
    type: 'DETACH_PLAYER_FROM_CHALLENGE',
    challengeId
});

export const pairBandToPlayer = (id, band) => ({
    type: 'PAIR_BAND_TO_PLAYER',
    id,
    band
});
