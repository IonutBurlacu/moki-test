export const getReportsTeamsRequest = () => ({
    type: 'GET_REPORTS_TEAMS_REQUEST'
});

export const getReportsTeams = teams => ({
    type: 'GET_REPORTS_TEAMS',
    teams
});

export const statsReportsTeamsRequest = (
    teamIdsA,
    teamIdsB,
    chartType,
    chartStartDate,
    chartEndDate,
    filterByA,
    filterByB
) => ({
    type: 'STATS_REPORTS_TEAMS_REQUEST',
    teamIdsA,
    teamIdsB,
    chartType,
    chartStartDate,
    chartEndDate,
    filterByA,
    filterByB
});

export const statsReportsTeams = (
    overview,
    typical,
    chartType,
    chartStateDate,
    chartEndDate,
    filterByA,
    filterByB
) => ({
    type: 'STATS_REPORTS_TEAMS',
    overview,
    typical,
    chartType,
    chartStateDate,
    chartEndDate,
    filterByA,
    filterByB
});

export const addTeamToDataA = teamId => ({
    type: 'ADD_TEAM_TO_DATA_A',
    teamId
});

export const addTeamToDataB = teamId => ({
    type: 'ADD_TEAM_TO_DATA_B',
    teamId
});

export const removeTeamFromDataA = teamId => ({
    type: 'REMOVE_TEAM_FROM_DATA_A',
    teamId
});

export const removeTeamFromDataB = teamId => ({
    type: 'REMOVE_TEAM_FROM_DATA_B',
    teamId
});

export const applyFilterToDataA = filterBy => ({
    type: 'APPLY_FILTER_TO_DATA_A',
    filterBy
});

export const applyFilterToDataB = filterBy => ({
    type: 'APPLY_FILTER_TO_DATA_B',
    filterBy
});

export const removeFilterFromDataA = filterBy => ({
    type: 'REMOVE_FILTER_FROM_DATA_A',
    filterBy
});

export const removeFilterFromDataB = filterBy => ({
    type: 'REMOVE_FILTER_FROM_DATA_B',
    filterBy
});

export const clearFilterFromDataA = () => ({
    type: 'CLEAR_FILTER_FROM_DATA_A'
});

export const clearFilterFromDataB = () => ({
    type: 'CLEAR_FILTER_FROM_DATA_B'
});

export const getPlayerVariationRequest = (
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_PLAYER_VARIATION_REQUEST',
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
});

export const getPlayerVariation = (
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
) => ({
    type: 'GET_PLAYER_VARIATION',
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
});

export const openPlayerVariationMenu = menu => ({
    type: 'OPEN_PLAYER_VARIATION_MENU',
    menu
});

export const closePlayerVariationMenu = menu => ({
    type: 'CLOSE_PLAYER_VARIATION_MENU',
    menu
});

export const getGroupAveragesRequest = (
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_GROUP_AVERAGES_REQUEST',
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
});

export const getGroupAverages = (
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
) => ({
    type: 'GET_GROUP_AVERAGES',
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
});

export const openGroupAveragesMenu = menu => ({
    type: 'OPEN_GROUP_AVERAGES_MENU',
    menu
});

export const closeGroupAveragesMenu = menu => ({
    type: 'CLOSE_GROUP_AVERAGES_MENU',
    menu
});

export const openReportsMenu = menu => ({
    type: 'OPEN_REPORTS_MENU',
    menu
});

export const closeReportsMenu = menu => ({
    type: 'CLOSE_REPORTS_MENU',
    menu
});
