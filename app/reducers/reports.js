import moment from 'moment';

export default (
    state = {
        teams: [],
        scales: null,
        teamId: null,
        playerAverages: {
            data: {
                current: {
                    steps: [],
                    mvpa: []
                },
                average: {
                    daily_steps: 0,
                    mvpa_minutes: 0,
                    grade: 'E'
                }
            },
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            chartType: 'steps',
            teamSelectOpen: false,
            dateSelectOpen: false,
            chartTypeSelectOpen: false
        },
        groupAverages: {
            data: {
                current: {
                    steps: [],
                    mvpa: []
                },
                average: {
                    daily_steps: 0,
                    mvpa_minutes: 0,
                    grade: 'E'
                }
            },
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            chartType: 'steps',
            teamSelectOpen: false,
            dateSelectOpen: false,
            chartTypeSelectOpen: false
        },
        totalSteps: {
            data: {
                current: {
                    steps: [],
                    mvpa: []
                },
                previous: {
                    steps: 0,
                    mvpa: 0
                },
                average: {
                    daily_steps: 0,
                    mvpa_minutes: 0,
                    grade: 'E'
                }
            },
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            chartType: 'steps',
            playersCount: 0,
            teamSelectOpen: false,
            dateSelectOpen: false,
            chartTypeSelectOpen: false,
            totalSteps: 0,
            totalMvpa: 0
        },
        downloadPdf: {
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            listSort: 'most_steps',
            listSortLabel: 'Most steps',
            dateSelectOpen: false,
            sortSelectOpen: false
        },
        downloadCsv: {
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
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
        case 'GET_PLAYER_AVERAGES_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_PLAYER_AVERAGES':
            return {
                ...state,
                teamId: action.teamId,
                playerAverages: {
                    ...state.playerAverages,
                    data: action.data,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                groupAverages: {
                    ...state.groupAverages,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                totalSteps: {
                    ...state.totalSteps,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadPdf: {
                    ...state.downloadPdf,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadCsv: {
                    ...state.downloadCsv,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                scales: action.scales,
                loading: false
            };
        case 'OPEN_PLAYER_AVERAGES_MENU':
            return {
                ...state,
                playerAverages: {
                    ...state.playerAverages,
                    teamSelectOpen: false,
                    dateSelectOpen: false,
                    [action.menu]: true
                }
            };
        case 'CLOSE_PLAYER_AVERAGES_MENU':
            return {
                ...state,
                playerAverages: {
                    ...state.playerAverages,
                    [action.menu]: false
                }
            };
        case 'CHANGE_PLAYER_AVERAGES_CHART_TYPE':
            return {
                ...state,
                playerAverages: {
                    ...state.playerAverages,
                    chartType: action.chartType
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
                teamId: action.teamId,
                groupAverages: {
                    ...state.groupAverages,
                    data: action.data,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                playerAverages: {
                    ...state.playerAverages,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                totalSteps: {
                    ...state.totalSteps,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadPdf: {
                    ...state.downloadPdf,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadCsv: {
                    ...state.downloadCsv,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
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
        case 'CHANGE_GROUP_AVERAGES_CHART_TYPE':
            return {
                ...state,
                groupAverages: {
                    ...state.groupAverages,
                    chartType: action.chartType
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
                teamId: action.teamId,
                totalSteps: {
                    ...state.totalSteps,
                    data: action.data,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12),
                    playersCount: action.playersCount,
                    totalSteps: action.data.current.steps.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.y_axis,
                        0
                    ),
                    totalMvpa: action.data.current.mvpa.reduce(
                        (accumulator, currentValue) =>
                            accumulator + parseFloat(currentValue.y_axis),
                        0
                    )
                },
                groupAverages: {
                    ...state.groupAverages,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                playerAverages: {
                    ...state.playerAverages,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadPdf: {
                    ...state.downloadPdf,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
                },
                downloadCsv: {
                    ...state.downloadCsv,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
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
                    chartTypeSelectOpen: false,
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
        case 'CHANGE_TOTAL_STEPS_CHART_TYPE':
            return {
                ...state,
                totalSteps: {
                    ...state.totalSteps,
                    chartType: action.chartType
                }
            };
        case 'ADD_TEAM_TO_DOWNLOAD_PDF':
            return {
                ...state,
                teamId: action.teamId,
                downloadPdf: {
                    ...state.downloadPdf
                }
            };
        case 'CHANGE_DOWNLOAD_PDF_TEAMS_DATE_BY_TYPE':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    dateByType: action.dateByType,
                    dateByStartDate: action.dateByStartDate,
                    dateByEndDate: action.dateByEndDate
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
        case 'ADD_TEAM_TO_DOWNLOAD_CSV':
            return {
                ...state,
                teamId: action.teamId,
                downloadCsv: {
                    ...state.downloadCsv
                }
            };
        case 'CHANGE_DOWNLOAD_CSV_TEAMS_DATE_BY_TYPE':
            return {
                ...state,
                downloadCsv: {
                    ...state.downloadCsv,
                    dateByType: action.dateByType,
                    dateByStartDate: action.dateByStartDate,
                    dateByEndDate: action.dateByEndDate
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
        case 'CLOSE_ALL_REPORTS_MENU':
            return {
                ...state,
                playerAverages: {
                    ...state.playerAverages,
                    teamSelectOpen: false,
                    dateSelectOpen: false
                },
                groupAverages: {
                    ...state.groupAverages,
                    teamSelectOpen: false,
                    dateSelectOpen: false
                },
                totalSteps: {
                    ...state.totalSteps,
                    teamSelectOpen: false,
                    dateSelectOpen: false,
                    chartTypeSelectOpen: false
                },
                downloadPdf: {
                    ...state.downloadPdf,
                    dateSelectOpen: false,
                    sortSelectOpen: false
                },
                downloadCsv: {
                    ...state.downloadCsv,
                    dateSelectOpen: false,
                    sortSelectOpen: false
                }
            };
        default:
            return state;
    }
};
