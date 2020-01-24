export const getPlayersRequest = (
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_PLAYERS_REQUEST',
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getPlayers = (
    players,
    teams,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_PLAYERS',
    players,
    teams,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const changePlayersDateByType = (
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'CHANGE_PLAYERS_DATE_BY_TYPE',
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const changePlayersListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_PLAYERS_LIST_SORT',
    listSort,
    listSortLabel
});

export const addPlayersListFilter = listFilterValue => ({
    type: 'ADD_PLAYERS_LIST_FILTER',
    listFilterValue
});

export const removePlayersListFilter = listFilterValue => ({
    type: 'REMOVE_PLAYERS_LIST_FILTER',
    listFilterValue
});

export const clearPlayersListFilter = () => ({
    type: 'CLEAR_PLAYERS_LIST_FILTER'
});

export const viewPlayerRequest = (
    id,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'VIEW_PLAYER_REQUEST',
    id,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const viewPlayer = (
    player,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'VIEW_PLAYER',
    player,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const statsPlayerRequest = (
    id,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'STATS_PLAYER_REQUEST',
    id,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const statsPlayer = (
    overview,
    typical,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'STATS_PLAYER',
    overview,
    typical,
    dateByType,
    dateByStartDate,
    dateByEndDate
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

export const createPlayer = (grades, years, tags, teams) => ({
    type: 'CREATE_PLAYER',
    grades,
    years,
    tags,
    teams
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

export const attachNewPlayerToTeam = teamId => ({
    type: 'ATTACH_NEW_PLAYER_TO_TEAM',
    teamId
});

export const detachNewPlayerFromTeam = teamId => ({
    type: 'DETACH_NEW_PLAYER_FROM_TEAM',
    teamId
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

export const openPlayersMenu = menu => ({
    type: 'OPEN_PLAYERS_MENU',
    menu
});

export const closePlayersMenu = menu => ({
    type: 'CLOSE_PLAYERS_MENU',
    menu
});

export const closeAllPlayersMenu = () => ({
    type: 'CLOSE_ALL_PLAYERS_MENU'
});

export const changePlayersChartType = chartType => ({
    type: 'CHANGE_PLAYERS_CHART_TYPE',
    chartType
});
