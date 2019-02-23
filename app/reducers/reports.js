import moment from 'moment';

export default (
    state = {
        teams: [],
        chartType: 'today',
        chartStartDate: moment.utc().local(),
        chartEndDate: moment.utc().local(),
        overview: [],
        typical: [],
        totalOverviewA: 0,
        totalOverviewB: 0,
        totalTypicalA: 0,
        totalTypicalB: 0,
        totalOverviewAPrevious: 0,
        totalOverviewBPrevious: 0,
        percentageOverviewA: 0,
        percentageOverviewB: 0,
        percentageTypicalA: 0,
        percentageTypicalB: 0,
        teamIdsA: [],
        teamIdsB: [],
        filterByA: [],
        filterByB: [],
        filterASelectOpen: false,
        filterBSelectOpen: false,
        dataASelectOpen: false,
        dataBSelectOpen: false,
        dateSelectOverviewOpen: false,
        dateSelectTypicalOpen: false,
        playerVariation: {
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
                overview: action.overview.current,
                typical: action.typical.current,
                totalOverviewAPrevious:
                    action.overview.previous_total_a.previous_steps,
                totalOverviewBPrevious:
                    action.overview.previous_total_b.previous_steps,
                teamIdsA: [],
                teamIdsB: [],
                totalOverviewA: 0,
                totalOverviewB: 0,
                totalTypicalA: 0,
                totalTypicalB: 0,
                percentageOverviewA: 0,
                percentageOverviewB: 0,
                percentageTypicalA: 0,
                percentageTypicalB: 0,
                chartType: 'today',
                filterByA: [],
                filterByB: [],
                chartStartDate: moment.utc().local(),
                chartEndDate: moment.utc().local(),
                loading: false
            };
        case 'STATS_REPORTS_TEAMS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'STATS_REPORTS_TEAMS':
            return {
                ...state,
                overview: action.overview.current,
                typical: action.typical.current,
                totalOverviewA: action.overview.current.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_a,
                    0
                ),
                totalOverviewB: action.overview.current.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_b,
                    0
                ),
                totalTypicalA: action.typical.current.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_a,
                    0
                ),
                totalTypicalB: action.typical.current.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_b,
                    0
                ),
                totalOverviewAPrevious:
                    action.overview.previous_total_a.previous_steps,
                totalOverviewBPrevious:
                    action.overview.previous_total_b.previous_steps,
                chartType: action.chartType,
                chartStartDate: action.chartStartDate,
                chartEndDate: action.chartEndDate,
                filterByA: action.filterByA,
                filterByB: action.filterByB,
                loading: false
            };
        case 'ADD_TEAM_TO_DATA_A':
            return {
                ...state,
                teamIdsA: [...state.teamIdsA, action.teamId]
            };
        case 'ADD_TEAM_TO_DATA_B':
            return {
                ...state,
                teamIdsB: [...state.teamIdsB, action.teamId]
            };
        case 'REMOVE_TEAM_FROM_DATA_A':
            return {
                ...state,
                teamIdsA: state.teamIdsA.filter(
                    teamIdA => teamIdA !== action.teamId
                )
            };
        case 'REMOVE_TEAM_FROM_DATA_B':
            return {
                ...state,
                teamIdsB: state.teamIdsB.filter(
                    teamIdB => teamIdB !== action.teamId
                )
            };
        case 'APPLY_FILTER_TO_DATA_A':
            return {
                ...state,
                filterByA: [...state.filterByA, action.filterBy]
            };
        case 'APPLY_FILTER_TO_DATA_B':
            return {
                ...state,
                filterByB: [...state.filterByB, action.filterBy]
            };
        case 'REMOVE_FILTER_FROM_DATA_A':
            return {
                ...state,
                filterByA: state.filterByA.filter(
                    filter => filter !== action.filterBy
                )
            };
        case 'REMOVE_FILTER_FROM_DATA_B':
            return {
                ...state,
                filterByB: state.filterByB.filter(
                    filter => filter !== action.filterBy
                )
            };
        case 'CLEAR_FILTER_FROM_DATA_A':
            return {
                ...state,
                filterByA: []
            };
        case 'CLEAR_FILTER_FROM_DATA_B':
            return {
                ...state,
                filterByB: []
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
                    chartStartDate: action.chartStartDate,
                    chartEndDate: action.chartEndDate
                },
                teams: action.teams,
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
        case 'OPEN_REPORTS_MENU':
            return {
                ...state,
                filterASelectOpen: false,
                filterBSelectOpen: false,
                dataASelectOpen: false,
                dataBSelectOpen: false,
                dateSelectOverviewOpen: false,
                dateSelectTypicalOpen: false,
                [action.menu]: true
            };
        case 'CLOSE_REPORTS_MENU':
            return {
                ...state,
                [action.menu]: false
            };
        default:
            return state;
    }
};
