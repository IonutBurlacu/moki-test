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
    filterByValueA,
    filterByB,
    filterByValueB
) => ({
    type: 'STATS_REPORTS_TEAMS_REQUEST',
    teamIdsA,
    teamIdsB,
    chartType,
    chartStartDate,
    chartEndDate,
    filterByA,
    filterByValueA,
    filterByB,
    filterByValueB
});

export const statsReportsTeams = (
    overview,
    typical,
    chartType,
    chartStateDate,
    chartEndDate,
    filterByA,
    filterByValueA,
    filterByB,
    filterByValueB
) => ({
    type: 'STATS_REPORTS_TEAMS',
    overview,
    typical,
    chartType,
    chartStateDate,
    chartEndDate,
    filterByA,
    filterByValueA,
    filterByB,
    filterByValueB
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

export const applyFilterToDataA = (filterBy, filterByValue) => ({
    type: 'APPLY_FILTER_TO_DATA_A',
    filterBy,
    filterByValue
});

export const applyFilterToDataB = (filterBy, filterByValue) => ({
    type: 'APPLY_FILTER_TO_DATA_B',
    filterBy,
    filterByValue
});

export const removeFilterFromDataA = () => ({
    type: 'REMOVE_FILTER_FROM_DATA_A'
});

export const removeFilterFromDataB = () => ({
    type: 'REMOVE_FILTER_FROM_DATA_B'
});

export const openReportsMenu = menu => ({
    type: 'OPEN_REPORTS_MENU',
    menu
});

export const closeReportsMenu = menu => ({
    type: 'CLOSE_REPORTS_MENU',
    menu
});
