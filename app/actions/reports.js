export const getReportsTeamsRequest = () => ({
    type: 'GET_REPORTS_TEAMS_REQUEST'
});

export const getReportsTeams = teams => ({
    type: 'GET_REPORTS_TEAMS',
    teams
});

export const getPlayerAveragesRequest = (
    teamId,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_PLAYER_AVERAGES_REQUEST',
    teamId,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getPlayerAverages = (
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales
) => ({
    type: 'GET_PLAYER_AVERAGES',
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales
});

export const openPlayerAveragesMenu = menu => ({
    type: 'OPEN_PLAYER_AVERAGES_MENU',
    menu
});

export const closePlayerAveragesMenu = menu => ({
    type: 'CLOSE_PLAYER_AVERAGES_MENU',
    menu
});

export const getGroupAveragesRequest = (
    teamId,
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_GROUP_AVERAGES_REQUEST',
    teamId,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getGroupAverages = (
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales
) => ({
    type: 'GET_GROUP_AVERAGES',
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales
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
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_TOTAL_STEPS_REQUEST',
    teamId,
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getTotalSteps = (
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales,
    playersCount
) => ({
    type: 'GET_TOTAL_STEPS',
    teamId,
    data,
    dateByType,
    dateByStartDate,
    dateByEndDate,
    scales,
    playersCount
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
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_DOWNLOAD_PDF_TEAMS_REQUEST',
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getDownloadPdfTeams = (teams, dateByType) => ({
    type: 'GET_DOWNLOAD_PDF_TEAMS',
    teams,
    dateByType
});

export const addTeamToDownloadPdf = teamId => ({
    type: 'ADD_TEAM_TO_DOWNLOAD_PDF',
    teamId
});

export const changeDownloadPdfTeamsDateByType = (
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'CHANGE_DOWNLOAD_PDF_TEAMS_DATE_BY_TYPE',
    dateByType,
    dateByStartDate,
    dateByEndDate
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

export const getDownloadCsvTeamsRequest = (
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'GET_DOWNLOAD_CSV_TEAMS_REQUEST',
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const getDownloadCsvTeams = (teams, dateByType) => ({
    type: 'GET_DOWNLOAD_CSV_TEAMS',
    teams,
    dateByType
});

export const addTeamToDownloadCsv = teamId => ({
    type: 'ADD_TEAM_TO_DOWNLOAD_CSV',
    teamId
});

export const changeDownloadCsvTeamsDateByType = (
    dateByType,
    dateByStartDate,
    dateByEndDate
) => ({
    type: 'CHANGE_DOWNLOAD_CSV_TEAMS_DATE_BY_TYPE',
    dateByType,
    dateByStartDate,
    dateByEndDate
});

export const changeDownloadCsvTeamsListSort = (listSort, listSortLabel) => ({
    type: 'CHANGE_DOWNLOAD_CSV_TEAMS_LIST_SORT',
    listSort,
    listSortLabel
});

export const openDownloadCsvMenu = menu => ({
    type: 'OPEN_DOWNLOAD_CSV_MENU',
    menu
});

export const closeDownloadCsvMenu = menu => ({
    type: 'CLOSE_DOWNLOAD_CSV_MENU',
    menu
});

export const closeAllReportsMenu = () => ({
    type: 'CLOSE_ALL_REPORTS_MENU'
});
