export default (
    state = {
        teams: [],
        chartType: 'today',
        overview: [],
        typical: [],
        totalOverviewA: 0,
        totalOverviewB: 0,
        totalTypicalA: 0,
        totalTypicalB: 0,
        percentageOverviewA: 0,
        percentageOverviewB: 0,
        percentageTypicalA: 0,
        percentageTypicalB: 0,
        teamIdsA: [],
        teamIdsB: [],
        filterByA: '',
        filterByValueA: '',
        filterByB: '',
        filterByValueB: '',
        grades: [],
        years: [],
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
                grades: action.grades,
                years: action.years,
                overview: action.overview,
                typical: action.typical,
                teamIdsA: [],
                teamIdsB: [],
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
                overview: action.overview,
                typical: action.typical,
                totalOverviewA: action.overview.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_a,
                    0
                ),
                totalOverviewB: action.overview.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_b,
                    0
                ),
                totalTypicalA: action.typical.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_a,
                    0
                ),
                totalTypicalB: action.typical.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.total_steps_b,
                    0
                ),
                chartType: action.chartType,
                filterByA: action.filterByA,
                filterByValueA: action.filterByValueA,
                filterByB: action.filterByB,
                filterByValueB: action.filterByValueB,
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
                filterByA: action.filterBy,
                filterByValueA: action.filterByValue
            };
        case 'APPLY_FILTER_TO_DATA_B':
            return {
                ...state,
                filterByB: action.filterBy,
                filterByValueB: action.filterByValue
            };
        case 'REMOVE_FILTER_FROM_DATA_A':
            return {
                ...state,
                filterByA: '',
                filterByValueA: ''
            };
        case 'REMOVE_FILTER_FROM_DATA_B':
            return {
                ...state,
                filterByB: '',
                filterByValueB: ''
            };
        default:
            return state;
    }
};
