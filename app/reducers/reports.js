import moment from 'moment';

export default (
    state = {
        teams: [],
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
            teamSelectOpen: false
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
                    chartEndDate: moment(action.chartEndDate)
                },
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
        default:
            return state;
    }
};
