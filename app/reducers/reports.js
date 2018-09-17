export default (
    state = {
        teams: [],
        chartType: 'today',
        overview: [],
        typical: [],
        teamIdsA: [],
        teamIdsB: [],
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
                overview: action.overview,
                typical: action.typical,
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
                chartType: action.chartType,
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
        default:
            return state;
    }
};
