import moment from 'moment';

export default (
    state = {
        items: [],
        player: {
            overview: [],
            typical: [],
            totalOverview: 0,
            totalTypical: 0,
            totalOverviewPrevious: 0
        },
        grades: [],
        years: [],
        challenges: [],
        teams: [],
        chartType: 'today',
        chartStartDate: moment.utc().local(),
        chartEndDate: moment.utc().local(),
        listDate: 'today',
        listStartDate: moment.utc().local(),
        listEndDate: moment.utc().local(),
        listSort: 'most_steps',
        listSortLabel: 'Most steps',
        listFilterValues: [],
        loading: false
    },
    action
) => {
    switch (action.type) {
        case 'GET_PLAYERS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_PLAYERS':
            return {
                ...state,
                items: action.players.map(player => ({
                    ...player,
                    percentage:
                        player.previous_steps - player.current_steps !== 0
                            ? player.previous_steps > player.current_steps
                                ? -(
                                      ((player.previous_steps -
                                          player.current_steps) /
                                          player.previous_steps) *
                                      100
                                  )
                                : ((player.current_steps -
                                      player.previous_steps) /
                                      player.current_steps) *
                                  100
                            : 0,
                    age: moment().diff(moment(player.birthday), 'year')
                })),
                teams: action.teams,
                listDate: action.listDate,
                chartType: action.listDate,
                loading: false
            };
        case 'CHANGE_PLAYERS_LIST_DATE':
            return {
                ...state,
                chartType: action.listDate,
                listDate: action.listDate,
                listStartDate: action.listStartDate,
                listEndDate: action.listEndDate
            };
        case 'CHANGE_PLAYERS_LIST_SORT':
            return {
                ...state,
                listSort: action.listSort,
                listSortLabel: action.listSortLabel
            };
        case 'ADD_PLAYERS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: [
                    ...state.listFilterValues,
                    action.listFilterValue
                ]
            };
        case 'REMOVE_PLAYERS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: state.listFilterValues.filter(
                    element => element !== action.listFilterValue
                )
            };
        case 'CLEAR_PLAYERS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: []
            };
        case 'VIEW_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'VIEW_PLAYER':
            return {
                ...state,
                player: {
                    ...action.player,
                    age: moment().diff(moment(action.player.birthday), 'year'),
                    overview: action.player.overview.current,
                    typical: action.player.typical.current,
                    totalOverview: action.player.overview.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalTypical: action.player.typical.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalOverviewPrevious:
                        action.player.overview.previous_total.previous_steps
                },
                chartType: 'today',
                chartStartDate: moment.utc().local(),
                chartEndDate: moment.utc().local(),
                loading: false
            };
        case 'DELETE_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DELETE_PLAYER':
            return {
                ...state,
                loading: false
            };
        case 'STATS_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'STATS_PLAYER':
            return {
                ...state,
                player: {
                    ...state.player,
                    overview: action.overview.current,
                    typical: action.typical.current,
                    totalOverview: action.overview.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalTypical: action.typical.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalOverviewPrevious:
                        action.overview.previous_total.previous_steps
                },
                chartType: action.chartType,
                chartStartDate: action.chartStartDate,
                chartEndDate: action.chartEndDate,
                loading: false
            };
        case 'CREATE_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'CREATE_PLAYER':
            return {
                ...state,
                grades: action.grades,
                years: action.years,
                loading: false
            };
        case 'INSERT_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'INSERT_PLAYER':
            return {
                ...state,
                loading: false
            };
        case 'EDIT_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'EDIT_PLAYER':
            const assignedTeams = state.player.teams.map(team => team.id);
            const assignedChallenges = state.player.challenges.map(
                challenge => challenge.id
            );
            return {
                ...state,
                items: [],
                player: {
                    ...state.player,
                    grade: action.grades.find(
                        grade => grade.id == state.player.grade_id
                    ).name,
                    year: action.years.find(
                        year => year.id == state.player.year_id
                    ).name
                },
                grades: action.grades,
                years: action.years,
                challenges: action.challenges.filter(
                    challenge => !assignedChallenges.includes(challenge.id)
                ),
                teams: action.teams.filter(
                    team => !assignedTeams.includes(team.id)
                ),
                loading: false
            };
        case 'UPDATE_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'UPDATE_PLAYER':
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.player
                },
                loading: false
            };
        case 'ATTACH_PLAYER_TO_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_PLAYER_TO_TEAM':
            return {
                ...state,
                player: {
                    ...state.player,
                    teams: [
                        ...state.player.teams,
                        state.teams.find(team => team.id == action.teamId)
                    ]
                },
                teams: state.teams.filter(team => team.id != action.teamId),
                loading: false
            };
        case 'DETACH_PLAYER_FROM_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_PLAYER_FROM_TEAM':
            return {
                ...state,
                player: {
                    ...state.player,
                    teams: state.player.teams.filter(
                        team => team.id != action.teamId
                    )
                },
                teams: [
                    ...state.teams,
                    state.player.teams.find(team => team.id == action.teamId)
                ],
                loading: false
            };
        case 'ATTACH_PLAYER_TO_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_PLAYER_TO_CHALLENGE':
            return {
                ...state,
                player: {
                    ...state.player,
                    challenges: [
                        ...state.player.challenges,
                        state.challenges.find(
                            challenge => challenge.id == action.challengeId
                        )
                    ]
                },
                challenges: state.challenges.filter(
                    challenge => challenge.id != action.challengeId
                ),
                loading: false
            };
        case 'DETACH_PLAYER_FROM_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_PLAYER_FROM_CHALLENGE':
            return {
                ...state,
                player: {
                    ...state.player,
                    challenges: state.player.challenges.filter(
                        challenge => challenge.id != action.challengeId
                    )
                },
                challenges: [
                    ...state.challenges,
                    state.player.challenges.find(
                        challenge => challenge.id == action.challengeId
                    )
                ],
                loading: false
            };
        case 'PAIR_BAND_TO_PLAYER': {
            const currentPlayer = state.items.find(
                player => player.id === action.id
            );
            currentPlayer.band = action.band;
            return {
                ...state,
                items: [
                    ...state.items
                        .filter(player => player.id !== currentPlayer.id)
                        .map(
                            player =>
                                player.band && player.band.id === action.band.id
                                    ? { ...player, band: null }
                                    : player
                        ),
                    currentPlayer
                ]
            };
        }
        case 'DELETE_DATABASE_REQUEST':
            return {
                ...state
            };
        case 'IMPORT_REQUEST':
            return {
                ...state
            };
        default:
            return state;
    }
};
