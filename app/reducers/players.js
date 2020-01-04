import moment from 'moment';

export default (
    state = {
        items: [],
        player: {
            data: [],
            overview: [],
            typical: [],
            totalOverview: 0,
            totalTypical: 0,
            totalOverviewPrevious: 0
        },
        grades: [],
        years: [],
        tags: [],
        challenges: [],
        teams: [],
        dateByType: 'today',
        dateByStartDate: moment.utc().local(),
        dateByEndDate: moment.utc().local(),
        listSort: 'most_steps',
        listSortLabel: 'Most steps',
        listFilterValues: [],
        dateSelectOpen: false,
        filterSelectOpen: false,
        sortSelectOpen: false,
        dateSelectChartOpen: false,
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
                        player.previous_steps > 0
                            ? player.previous_steps - player.current_steps !== 0
                                ? player.current_steps > player.previous_steps
                                    ? player.previous_steps > 0
                                        ? Math.round(
                                              (player.current_steps * 100) /
                                                  player.previous_steps -
                                                  100
                                          )
                                        : player.current_steps
                                    : player.current_steps > 0
                                    ? Math.round(
                                          ((player.previous_steps -
                                              player.current_steps) *
                                              100) /
                                              player.previous_steps
                                      )
                                    : 100
                                : 0
                            : -1,
                    mvpa_time:
                        player.mvpa_minutes < 60
                            ? moment('2020-01-01')
                                  .startOf('day')
                                  .minutes(player.mvpa_minutes)
                                  .format('m[m]')
                            : moment('2020-01-01')
                                  .startOf('day')
                                  .minutes(player.mvpa_minutes)
                                  .format('H[h] m[m]'),
                    age: moment().diff(moment(player.birthday), 'year')
                })),
                teams: action.teams,
                loading: false
            };
        case 'CHANGE_PLAYERS_DATE_BY_TYPE':
            return {
                ...state,
                dateByType: action.dateByType,
                dateByStartDate: action.dateByStartDate,
                dateByEndDate: action.dateByEndDate
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
                    data: action.player.data.current,
                    totalOverview: action.player.data.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps_overview,
                        0
                    ),
                    totalTypical: action.player.data.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps_typical,
                        0
                    ),
                    totalOverviewPrevious:
                        action.player.data.previous_total.previous_steps
                },
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
                    data: action.data.current,
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
                dateByType: action.dateByType,
                dateByStartDate: action.dateByStartDate,
                dateByEndDate: action.dateByEndDate,
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
                tags: action.tags,
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
                    )
                        ? action.grades.find(
                              grade => grade.id == state.player.grade_id
                          ).name
                        : '',
                    year: action.years.find(
                        year => year.id == state.player.year_id
                    )
                        ? action.years.find(
                              year => year.id == state.player.year_id
                          ).name
                        : ''
                },
                grades: action.grades,
                years: action.years,
                tags: action.tags,
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
                        .map(player =>
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
        case 'OPEN_PLAYERS_MENU':
            return {
                ...state,
                dateSelectOpen: false,
                filterSelectOpen: false,
                sortSelectOpen: false,
                dateSelectChartOpen: false,
                [action.menu]: true
            };
        case 'CLOSE_PLAYERS_MENU':
            return {
                ...state,
                [action.menu]: false
            };
        case 'CLOSE_ALL_PLAYERS_MENU':
            return {
                ...state,
                dateSelectOpen: false,
                filterSelectOpen: false,
                sortSelectOpen: false,
                dateSelectChartOpen: false
            };
        default:
            return state;
    }
};
