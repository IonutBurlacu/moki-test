import moment from 'moment';

export default (
    state = {
        teams: [],
        scales: null,
        playerAverages: {
            data: [],
            teamId: null,
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            teamSelectOpen: false,
            dateSelectOpen: false
        },
        groupAverages: {
            data: {
                steps: [],
                mvpa: []
            },
            teamId: null,
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            teamSelectOpen: false,
            dateSelectOpen: false
        },
        totalSteps: {
            data: {
                current: []
            },
            teamId: null,
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            playersCount: 0,
            teamSelectOpen: false,
            dateSelectOpen: false,
            totalOverview: 0,
            totalTypical: 0,
            totalOverviewPrevious: 0
        },
        downloadPdf: {
            teams: [],
            teamId: null,
            dateByType: 'today',
            dateByStartDate: moment.utc().local(),
            dateByEndDate: moment.utc().local(),
            listSort: 'most_steps',
            listSortLabel: 'Most steps',
            dateSelectOpen: false,
            sortSelectOpen: false
        },
        downloadCsv: {
            teams: [],
            teamId: null,
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
                playerAverages: {
                    ...state.playerAverages,
                    teamId: action.teamId,
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
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12),
                    playersCount: action.playersCount,
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
                            team.previous_steps > 0
                                ? team.previous_steps - team.current_steps !== 0
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
                                : -1
                    })),
                    dateByType: action.dateByType
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
                playerAverages: {
                    ...state.playerAverages,
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
                loading: false
            };
        case 'ADD_TEAM_TO_DOWNLOAD_PDF':
            return {
                ...state,
                downloadPdf: {
                    ...state.downloadPdf,
                    teamId: action.teamId
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
                            team.previous_steps > 0
                                ? team.previous_steps - team.current_steps !== 0
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
                                : -1
                    })),
                    dateByType: action.dateByType
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
                playerAverages: {
                    ...state.playerAverages,
                    dateByType: action.dateByType,
                    dateByStartDate: moment(action.dateByStartDate).hour(12),
                    dateByEndDate: moment(action.dateByEndDate).hour(12)
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
                    dateSelectOpen: false
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
