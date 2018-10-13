export const getPlayersRequest = (listDate, listStartDate, listEndDate) => ({
    type: 'GET_PLAYERS_REQUEST',
    listDate,
    listStartDate,
    listEndDate
});

export const getPlayers = (players, grades, years, listDate) => ({
    type: 'GET_PLAYERS',
    players,
    grades,
    years,
    listDate
});

export const changePlayersListDate = (
    listDate,
    listStartDate,
    listEndDate
) => ({
    type: 'CHANGE_PLAYERS_LIST_DATE',
    listDate,
    listStartDate,
    listEndDate
});

export const changePlayersListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_PLAYERS_LIST_SORT',
    listSort,
    listSortLabel
});

export const changePlayersListFilter = (listFilter, listFilterValue) => ({
    type: 'CHANGE_PLAYERS_LIST_FILTER',
    listFilter,
    listFilterValue
});

export const viewPlayerRequest = id => ({
    type: 'VIEW_PLAYER_REQUEST',
    id
});

export const viewPlayer = player => ({
    type: 'VIEW_PLAYER',
    player
});

export const statsPlayerRequest = (
    id,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'STATS_PLAYER_REQUEST',
    id,
    chartType,
    chartStartDate,
    chartEndDate
});

export const statsPlayer = (
    overview,
    typical,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'STATS_PLAYER',
    overview,
    typical,
    chartType,
    chartStartDate,
    chartEndDate
});

export const deletePlayerRequest = id => ({
    type: 'DELETE_PLAYER_REQUEST',
    id
});

export const deletePlayer = id => ({
    type: 'DELETE_PLAYER',
    id
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

export const deleteDatabaseRequest = password => ({
    type: 'DELETE_DATABASE_REQUEST',
    password
});

export const importDatabaseRequest = file => ({
    type: 'IMPORT_DATABASE_REQUEST',
    file
});
