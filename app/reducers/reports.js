import moment from 'moment';

export default (
    state = {
        teams: [],
        scales: null,
        playerVariation: {
            data: [],
            teamId: null,
            chartType: 'today',
            chartStartDate: moment.utc().local(),
            chartEndDate: moment.utc().local(),
            teamSelectOpen: false
        },
        groupAverages: {
            data: [],
            teamId: null,
            chartType: 'today',
            chartStartDate: moment.utc().local(),
            chartEndDate: moment.utc().local(),
            teamSelectOpen: false
        },
        totalSteps: {
            data: [],
            teamId: null,
            chartType: 'today',
            chartStartDate: moment.utc().local(),
            chartEndDate: moment.utc().local(),
            teamSelectOpen: false,
            totalOverview: 0,
            totalTypical: 0,
            totalOverviewPrevious: 0
        },
        downloadPdf: {
            teams: [],
            teamIds: [],
            chartType: 'today',
            chartStartDate: moment.utc().local(),
            chartEndDate: moment.utc().local(),
            listSort: 'most_steps',
            listSortLabel: 'Most steps',
            dateSelectOpen: false,
            sortSelectOpen: false
        },
        downloadCsv: {
            teams: [],
            teamId: null,
            chartType: 'today',
            chartStartDate: moment.utc().local(),
            chartEndDate: moment.utc().local(),
            listSort: 'most_steps',
            listSortLabel: 'Most steps',
            dateSelectOpen: false,
            sortSelectOpen: false
        },
        loading: false
    },
    action
) => {
    switch (action.type) {
        case 'GET_REPORTS_TEAMS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_REPORTS_TEAMS':
            return {
                ...state,
                teams: action.teams,
                loading: false
            };
        case 'GET_PLAYER_VARIATION_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_PLAYER_VARIATION':
            return {
                ...state,
                playerVariation: {
                    ...state.playerVariation,
                    teamId: action.teamId,
                    data: action.data,
                    chartType: action.chartType,
                    chartStartDate: moment(action.chartStartDate),
                    chartEndDate: moment(action.chartEndDate)
                },
                scales: action.scales,
                loading: false
            };
        case 'OPEN_PLAYER_VARIATION_MENU':
            return {
                ...state,
                playerVariation: {
                    ...state.playerVariation,
                    teamSelectOpen: false,
                    dateSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_PLAYER_VARIATION_MENU':
            return {
                ...state,
                playerVariation: {
                    ...state.playerVariation,
                    [action.menu]: false
                }
            };
        case 'GET_GROUP_AVERAGES_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_GROUP_AVERAGES':
            return {
                ...state,
                groupAverages: {
                    ...state.groupAverages,
                    teamId: action.teamId,
                    data: action.data,
                    chartType: action.chartType,
                    chartStartDate: moment(action.chartStartDate),
                    chartEndDate: moment(action.chartEndDate)
                },
                scales: action.scales,
                loading: false
            };
        case 'OPEN_GROUP_AVERAGES_MENU':
            return {
                ...state,
                groupAverages: {
                    ...state.groupAverages,
                    teamSelectOpen: false,
                    dateSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_GROUP_AVERAGES_MENU':
            return {
                ...state,
                groupAverages: {
                    ...state.groupAverages,
                    [action.menu]: false
                }
            };
        case 'GET_TOTAL_STEPS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_TOTAL_STEPS':
            return {
                ...state,
                totalSteps: {
                    ...state.totalSteps,
                    teamId: action.teamId,
                    data: action.data,
                    chartType: action.chartType,
                    chartStartDate: moment(action.chartStartDate),
                    chartEndDate: moment(action.chartEndDate),
                    totalOverview: action.data.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps_overview,
                        0
                    ),
                    totalTypical: action.data.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps_typical,
                        0
                    ),
                    totalOverviewPrevious:
                        action.data.previous_total.previous_steps
                },
                scales: action.scales,
                loading: false
            };
        case 'OPEN_TOTAL_STEPS_MENU':
            return {
                ...state,
                totalSteps: {
                    ...state.totalSteps,
                    teamSelectOpen: false,
                    dateSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_TOTAL_STEPS_MENU':
            return {
                ...state,
                totalSteps: {
                    ...state.totalSteps,
                    [action.menu]: false
                }
            };
        case 'GET_DOWNLOAD_PDF_TEAMS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_DOWNLOAD_PDF_TEAMS':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    teams: action.teams.map(team => ({
                        ...team,
                        percentage:
                            team.previous_steps - team.current_steps !== 0
                                ? team.current_steps > team.previous_steps
                                    ? team.previous_steps > 0
                                        ? Math.round(
                                              (team.current_steps * 100) /
                                                  team.previous_steps -
                                                  100
                                          )
                                        : team.current_steps
                                    : team.current_steps > 0
                                        ? Math.round(
                                              ((team.previous_steps -
                                                  team.current_steps) *
                                                  100) /
                                                  team.previous_steps
                                          )
                                        : 100
                                : 0
                    })),
                    chartType: action.chartType
                },
                loading: false
            };
        case 'ADD_TEAM_TO_DOWNLOAD_PDF':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    teamIds: [...state.downloadPdf.teamIds, action.teamId]
                }
            };
        case 'REMOVE_TEAM_FROM_DOWNLOAD_PDF':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    teamIds: state.downloadPdf.teamIds.filter(
                        teamId => teamId !== action.teamId
                    )
                }
            };
        case 'CHANGE_DOWNLOAD_PDF_TEAMS_LIST_DATE':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    chartType: action.chartType,
                    chartStartDate: action.chartStartDate,
                    chartEndDate: action.chartEndDate
                }
            };
        case 'CHANGE_DOWNLOAD_PDF_TEAMS_LIST_SORT':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    listSort: action.listSort,
                    listSortLabel: action.listSortLabel
                }
            };
        case 'OPEN_DOWNLOAD_PDF_MENU':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    dateSelectOpen: false,
                    sortSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_DOWNLOAD_PDF_MENU':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    [action.menu]: false
                }
            };
        case 'GET_DOWNLOAD_CSV_TEAMS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_DOWNLOAD_CSV_TEAMS':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    teams: action.teams.map(team => ({
                        ...team,
                        percentage:
                            team.previous_steps - team.current_steps !== 0
                                ? team.current_steps > team.previous_steps
                                    ? team.previous_steps > 0
                                        ? Math.round(
                                              (team.current_steps * 100) /
                                                  team.previous_steps -
                                                  100
                                          )
                                        : team.current_steps
                                    : team.current_steps > 0
                                        ? Math.round(
                                              ((team.previous_steps -
                                                  team.current_steps) *
                                                  100) /
                                                  team.previous_steps
                                          )
                                        : 100
                                : 0
                    })),
                    chartType: action.chartType
                },
                loading: false
            };
        case 'ADD_TEAM_TO_DOWNLOAD_CSV':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    teamId: action.teamId
                }
            };
        case 'CHANGE_DOWNLOAD_CSV_TEAMS_LIST_DATE':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    chartType: action.chartType,
                    chartStartDate: action.chartStartDate,
                    chartEndDate: action.chartEndDate
                }
            };
        case 'CHANGE_DOWNLOAD_CSV_TEAMS_LIST_SORT':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    listSort: action.listSort,
                    listSortLabel: action.listSortLabel
                }
            };
        case 'OPEN_DOWNLOAD_CSV_MENU':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    dateSelectOpen: false,
                    sortSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_DOWNLOAD_CSV_MENU':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    [action.menu]: false
                }
            };
        default:
            return state;
    }
};
