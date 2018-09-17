export const getReportsTeamsRequest = () => ({
    type: 'GET_REPORTS_TEAMS_REQUEST'
});

export const getReportsTeams = teams => ({
    type: 'GET_REPORTS_TEAMS',
    teams
});

export const statsReportsTeamsRequest = (teamIdsA, teamIdsB, chartType) => ({
    type: 'STATS_REPORTS_TEAMS_REQUEST',
    teamIdsA,
    teamIdsB,
    chartType
});

export const statsReportsTeams = (overview, typical, chartType) => ({
    type: 'STATS_REPORTS_TEAMS',
    overview,
    typical,
    chartType
});

export const addTeamToDataA = teamId => ({
    type: 'ADD_TEAM_TO_DATA_A',
    teamId
});

export const addTeamToDataB = teamId => ({
    type: 'ADD_TEAM_TO_DATA_B',
    teamId
});
