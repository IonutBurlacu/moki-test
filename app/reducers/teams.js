import moment from 'moment';

export default (
    state = {
        items: [],
        team: {
            overview: [],
            typical: [],
            totalOverview: 0,
            totalTypical: 0,
            totalOverviewPrevious: 0
        },
        challenges: [],
        players: [],
        chartType: 'today',
        listDate: 'today',
        listStartDate: moment.utc().local(),
        listEndDate: moment.utc().local(),
        listSort: 'most_steps',
        listSortLabel: 'Most steps',
        listFilter: '',
        listFilterValue: '',
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
                        team.previous_steps - team.current_steps !== 0
                            ? team.previous_steps > team.current_steps
                                ? -(
                                      ((team.previous_steps -
                                          team.current_steps) /
                                          team.previous_steps) *
                                      100
                                  )
                                : ((team.current_steps - team.previous_steps) /
                                      team.current_steps) *
                                  100
                            : 0
                })),
                listDate: action.listDate,
                loading: false
            };
        case 'CHANGE_TEAMS_LIST_DATE':
            return {
                ...state,
                listDate: action.listDate,
                listStartDate: action.listStartDate,
                listEndDate: action.listEndDate
            };
        case 'CHANGE_TEAMS_LIST_SORT':
            return {
                ...state,
                listSort: action.listSort,
                listSortLabel: action.listSortLabel
            };
        case 'CHANGE_TEAMS_LIST_FILTER':
            return {
                ...state,
                listFilter: action.listFilter,
                listFilterValue: action.listFilterValue
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
                    overview: action.team.overview.current,
                    typical: action.team.typical.current,
                    totalOverview: action.team.overview.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalTypical: action.team.typical.current.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.total_steps,
                        0
                    ),
                    totalOverviewPrevious:
                        action.team.overview.previous_total.previous_steps
                },
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
            console.log(action);
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
            console.log(action);
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
        default:
            return state;
    }
};
