import moment from 'moment';

export default (
    state = {
        items: [],
        team: {
            data: {
                steps: [],
                mvpa: []
            },
            average: {
                daily_steps: 0,
                mvpa_minutes: 0,
                grade: 'E'
            },
            previous: {
                steps: 0,
                mvpa: 0
            },
            totalSteps: 0,
            totalMVPA: 0,
            players: [],
            challenges: []
        },
        challenges: [],
        players: [],
        dateByType: 'today',
        dateByStartDate: moment.utc().local(),
        dateByEndDate: moment.utc().local(),
        chartType: 'steps',
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
        case 'GET_TEAMS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_TEAMS':
            return {
                ...state,
                items: action.teams.map(team => ({
                    ...team,
                    percentage:
                        team.grade_score_previous > 0
                            ? team.grade_score_previous -
                                  team.grade_score_current !==
                              0
                                ? team.grade_score_current >
                                  team.grade_score_previous
                                    ? team.grade_score_previous > 0
                                        ? Math.round(
                                              (team.grade_score_current * 100) /
                                                  team.grade_score_previous -
                                                  100
                                          )
                                        : team.grade_score_current
                                    : team.grade_score_current > 0
                                    ? -Math.round(
                                          ((team.grade_score_previous -
                                              team.grade_score_current) *
                                              100) /
                                              team.grade_score_previous
                                      )
                                    : 100
                                : 0
                            : -1
                })),
                dateByType: action.dateByType,
                dateByStartDate: moment(action.dateByStartDate).hour(12),
                dateByEndDate: moment(action.dateByEndDate).hour(12),
                loading: false
            };
        case 'CHANGE_TEAMS_DATE_BY_TYPE':
            return {
                ...state,
                dateByType: action.dateByType,
                dateByStartDate: action.dateByStartDate,
                dateByEndDate: action.dateByEndDate
            };
        case 'CHANGE_TEAMS_LIST_SORT':
            return {
                ...state,
                listSort: action.listSort,
                listSortLabel: action.listSortLabel
            };
        case 'ADD_TEAMS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: [
                    ...state.listFilterValues,
                    action.listFilterValue
                ]
            };
        case 'REMOVE_TEAMS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: state.listFilterValues.filter(
                    element => element !== action.listFilterValue
                )
            };
        case 'CLEAR_TEAMS_LIST_FILTER':
            return {
                ...state,
                listFilterValues: []
            };
        case 'VIEW_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'VIEW_TEAM':
            return {
                ...state,
                team: {
                    ...action.team,
                    data: action.team.data.current,
                    average: {
                        grade: action.team.data.average.grade,
                        daily_steps: action.team.data.average.daily_steps,
                        mvpa_minutes: action.team.data.average.mvpa_minutes
                    },
                    previous: action.team.data.previous,
                    totalSteps: action.team.data.current.steps.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.y_axis,
                        0
                    ),
                    totalMvpa: action.team.data.current.mvpa.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.y_axis,
                        0
                    )
                },
                dateByType: action.dateByType,
                dateByStartDate: moment(action.dateByStartDate).hour(12),
                dateByEndDate: moment(action.dateByEndDate).hour(12),
                loading: false
            };
        case 'DELETE_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DELETE_TEAM':
            return {
                ...state,
                loading: false
            };
        case 'STATS_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'STATS_TEAM':
            return {
                ...state,
                team: {
                    ...state.team,
                    data: action.data.current,
                    average: {
                        grade: action.data.average.grade,
                        daily_steps: action.data.average.daily_steps,
                        mvpa_minutes: action.data.average.mvpa_minutes
                    },
                    previous: action.data.previous,
                    totalSteps: action.data.current.steps.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.y_axis,
                        0
                    ),
                    totalMvpa: action.data.current.mvpa.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.y_axis,
                        0
                    )
                },
                dateByType: action.dateByType,
                dateByStartDate: moment(action.dateByStartDate).hour(12),
                dateByEndDate: moment(action.dateByEndDate).hour(12),
                loading: false
            };
        case 'INSERT_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'INSERT_TEAM':
            return {
                ...state,
                loading: false
            };
        case 'EDIT_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'EDIT_TEAM':
            const assignedPlayers = state.team.players.map(player => player.id);
            const assignedChallenges = state.team.challenges.map(
                challenge => challenge.id
            );
            return {
                ...state,
                challenges: action.challenges.filter(
                    challenge => !assignedChallenges.includes(challenge.id)
                ),
                players: action.players.filter(
                    player => !assignedPlayers.includes(player.id)
                ),
                loading: false
            };
        case 'UPDATE_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'UPDATE_TEAM':
            return {
                ...state,
                team: {
                    ...state.team,
                    ...action.team
                },
                loading: false
            };
        case 'ATTACH_TEAM_TO_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_TEAM_TO_PLAYER':
            return {
                ...state,
                team: {
                    ...state.team,
                    players: [
                        ...state.team.players,
                        state.players.find(
                            player => player.id == action.playerId
                        )
                    ]
                },
                players: state.players.filter(
                    player => player.id != action.playerId
                ),
                loading: false
            };
        case 'DETACH_TEAM_FROM_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_TEAM_FROM_PLAYER':
            return {
                ...state,
                team: {
                    ...state.team,
                    players: state.team.players.filter(
                        player => player.id != action.playerId
                    )
                },
                players: [
                    ...state.players,
                    state.team.players.find(
                        player => player.id == action.playerId
                    )
                ],
                loading: false
            };
        case 'ATTACH_TEAM_TO_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_TEAM_TO_CHALLENGE':
            return {
                ...state,
                team: {
                    ...state.team,
                    challenges: [
                        ...state.team.challenges,
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
        case 'DETACH_TEAM_FROM_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_TEAM_FROM_CHALLENGE':
            return {
                ...state,
                team: {
                    ...state.team,
                    challenges: state.team.challenges.filter(
                        challenge => challenge.id != action.challengeId
                    )
                },
                challenges: [
                    ...state.challenges,
                    state.team.challenges.find(
                        challenge => challenge.id == action.challengeId
                    )
                ],
                loading: false
            };
        case 'OPEN_TEAMS_MENU':
            return {
                ...state,
                dateSelectOpen: false,
                filterSelectOpen: false,
                sortSelectOpen: false,
                dateSelectChartOpen: false,
                [action.menu]: true
            };
        case 'CLOSE_TEAMS_MENU':
            return {
                ...state,
                [action.menu]: false
            };
        case 'CLOSE_ALL_TEAMS_MENU':
            return {
                ...state,
                dateSelectOpen: false,
                filterSelectOpen: false,
                sortSelectOpen: false,
                dateSelectChartOpen: false
            };
        case 'CHANGE_TEAMS_CHART_TYPE':
            return {
                ...state,
                chartType: action.chartType
            };
        default:
            return state;
    }
};
