import moment from 'moment';

export default (
    state = {
        items: [],
        player: {
            overview: [],
            typical: [],
            totalOverview: 0,
            totalTypical: 0
        },
        grades: [],
        years: [],
        challenges: [],
        teams: [],
        chartType: 'today',
        listDate: 'today',
        listSort: 'most_steps',
        listSortLabel: 'Most steps',
        listFilter: '',
        listFilterValue: '',
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
                grades: action.grades,
                years: action.years,
                listDate: action.listDate,
                loading: false
            };
        case 'CHANGE_PLAYERS_LIST_DATE':
            return {
                ...state,
                listDate: action.listDate
            };
        case 'CHANGE_PLAYERS_LIST_SORT':
            return {
                ...state,
                listSort: action.listSort,
                listSortLabel: action.listSortLabel
            };
        case 'CHANGE_PLAYERS_LIST_FILTER':
            return {
                ...state,
                listFilter: action.listFilter,
                listFilterValue: action.listFilterValue
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
                    totalOverview: action.player.overview.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalTypical: action.player.typical.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    )
                },
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
                    overview: action.overview,
                    typical: action.typical,
                    totalOverview: action.overview.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalTypical: action.typical.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    )
                },
                chartType: action.chartType,
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
                items: [],
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
                    ...state.items.filter(
                        player => player.id !== currentPlayer.id
                    ),
                    currentPlayer
                ]
            };
        }
        case 'DELETE_DATABASE_REQUEST':
            return {
                ...state
            };
        default:
            return state;
    }
};
