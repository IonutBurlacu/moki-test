export const getTeamsRequest = (listDate, listStartDate, listEndDate) => ({
    type: 'GET_TEAMS_REQUEST',
    listDate,
    listStartDate,
    listEndDate
});

export const getTeams = (teams, listDate) => ({
    type: 'GET_TEAMS',
    teams,
    listDate
});

export const changeTeamsListDate = (listDate, listStartDate, listEndDate) => ({
    type: 'CHANGE_TEAMS_LIST_DATE',
    listDate,
    listStartDate,
    listEndDate
});

export const changeTeamsListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_TEAMS_LIST_SORT',
    listSort,
    listSortLabel
});

export const changeTeamsListFilter = (listFilter, listFilterValue) => ({
    type: 'CHANGE_TEAMS_LIST_FILTER',
    listFilter,
    listFilterValue
});

export const viewTeamRequest = id => ({
    type: 'VIEW_TEAM_REQUEST',
    id
});

export const viewTeam = team => ({
    type: 'VIEW_TEAM',
    team
});

export const statsTeamRequest = (
    id,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'STATS_TEAM_REQUEST',
    id,
    chartType,
    chartStartDate,
    chartEndDate
});

export const statsTeam = (
    overview,
    typical,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'STATS_TEAM',
    overview,
    typical,
    chartType,
    chartStartDate,
    chartEndDate
});

export const deleteTeamRequest = id => ({
    type: 'DELETE_TEAM_REQUEST',
    id
});

export const deleteTeam = id => ({
    type: 'DELETE_TEAM',
    id
});

export const insertTeamRequest = team => ({
    type: 'INSERT_TEAM_REQUEST',
    team
});

export const insertTeam = team => ({
    type: 'INSERT_TEAM',
    team
});

export const editTeamRequest = () => ({
    type: 'EDIT_TEAM_REQUEST'
});

export const editTeam = (challenges, players) => ({
    type: 'EDIT_TEAM',
    challenges,
    players
});

export const updateTeamRequest = (team, id) => ({
    type: 'UPDATE_TEAM_REQUEST',
    team,
    id
});

export const updateTeam = (team, id) => ({
    type: 'UPDATE_TEAM',
    team,
    id
});

export const attachTeamToPlayerRequest = (playerId, teamId) => ({
    type: 'ATTACH_TEAM_TO_PLAYER_REQUEST',
    playerId,
    teamId
});

export const attachTeamToPlayer = playerId => ({
    type: 'ATTACH_TEAM_TO_PLAYER',
    playerId
});

export const detachTeamFromPlayerRequest = (playerId, teamId) => ({
    type: 'DETACH_TEAM_FROM_PLAYER_REQUEST',
    playerId,
    teamId
});

export const detachTeamFromPlayer = playerId => ({
    type: 'DETACH_TEAM_FROM_PLAYER',
    playerId
});

export const attachTeamToChallengeRequest = (challengeId, teamId) => ({
    type: 'ATTACH_TEAM_TO_CHALLENGE_REQUEST',
    challengeId,
    teamId
});

export const attachTeamToChallenge = challengeId => ({
    type: 'ATTACH_TEAM_TO_CHALLENGE',
    challengeId
});

export const detachTeamFromChallengeRequest = (challengeId, teamId) => ({
    type: 'DETACH_TEAM_FROM_CHALLENGE_REQUEST',
    challengeId,
    teamId
});

export const detachTeamFromChallenge = challengeId => ({
    type: 'DETACH_TEAM_FROM_CHALLENGE',
    challengeId
});
