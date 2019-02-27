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
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_PLAYER_VARIATION',
    teamId,
    data,
    chartType,
    chartStartDate,
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
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_GROUP_AVERAGES',
    teamId,
    data,
    chartType,
    chartStartDate,
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
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_TOTAL_STEPS',
    teamId,
    data,
    chartType,
    chartStartDate,
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

export const getDownloadPdfTeamsRequest = (
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'GET_DOWNLOAD_PDF_TEAMS_REQUEST',
    chartType,
    chartStartDate,
    chartEndDate
});

export const getDownloadPdfTeams = (teams, chartType) => ({
    type: 'GET_DOWNLOAD_PDF_TEAMS',
    teams,
    chartType
});

export const addTeamToDownloadPdf = teamId => ({
    type: 'ADD_TEAM_TO_DOWNLOAD_PDF',
    teamId
});

export const removeTeamFromDownloadPdf = teamId => ({
    type: 'REMOVE_TEAM_FROM_DOWNLOAD_PDF',
    teamId
});

export const changeDownloadPdfTeamsListDate = (
    chartType,
    chartStartDate,
    chartEndDate
) => ({
    type: 'CHANGE_DOWNLOAD_PDF_TEAMS_LIST_DATE',
    chartType,
    chartStartDate,
    chartEndDate
});

export const changeDownloadPdfTeamsListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_DOWNLOAD_PDF_TEAMS_LIST_SORT',
    listSort,
    listSortLabel
});

export const openDownloadPdfMenu = menu => ({
    type: 'OPEN_DOWNLOAD_PDF_MENU',
    menu
});

export const closeDownloadPdfMenu = menu => ({
    type: 'CLOSE_DOWNLOAD_PDF_MENU',
    menu
});
