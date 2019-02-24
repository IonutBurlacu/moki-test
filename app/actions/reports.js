export const getReportsTeamsRequest = () => ({
    type: 'GET_REPORTS_TEAMS_REQUEST'
});

export const getReportsTeams = teams => ({
    type: 'GET_REPORTS_TEAMS',
    teams
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

export const getTotalStepsRequest = (
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_TOTAL_STEPS_REQUEST',
    teamId,
    chartType,
    chartStartDate,
    chartEndDate
});

export const getTotalSteps = (
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
) => ({
    type: 'GET_TOTAL_STEPS',
    teamId,
    data,
    chartType,
    chartStateDate,
    chartEndDate
});

export const openTotalStepsMenu = menu => ({
    type: 'OPEN_TOTAL_STEPS_MENU',
    menu
});

export const closeTotalStepsMenu = menu => ({
    type: 'CLOSE_TOTAL_STEPS_MENU',
    menu
});
