import moment from 'moment';

export default (
    state = {
        items: [],
        challenge: { players: [], teams: [] },
        players: [],
        teams: [],
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
        case 'GET_CHALLENGES_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_CHALLENGES':
            return {
                ...state,
                items: action.challenges.map(challenge => ({
                    ...challenge,
                    percentage:
                        challenge.previous_steps - challenge.current_steps !== 0
                            ? challenge.previous_steps > challenge.current_steps
                                ? -(
                                      ((challenge.previous_steps -
                                          challenge.current_steps) /
                                          challenge.previous_steps) *
                                      100
                                  )
                                : ((challenge.current_steps -
                                      challenge.previous_steps) /
                                      challenge.current_steps) *
                                  100
                            : 0
                })),
                listDate: action.listDate,
                loading: false
            };
        case 'CHANGE_CHALLENGES_LIST_DATE':
            return {
                ...state,
                listDate: action.listDate,
                listStartDate: action.listStartDate,
                listEndDate: action.listEndDate
            };
        case 'CHANGE_CHALLENGES_LIST_SORT':
            return {
                ...state,
                listSort: action.listSort,
                listSortLabel: action.listSortLabel
            };
        case 'CHANGE_CHALLENGES_LIST_FILTER':
            return {
                ...state,
                listFilter: action.listFilter,
                listFilterValue: action.listFilterValue
            };
        case 'VIEW_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'VIEW_CHALLENGE':
            return {
                ...state,
                challenge: action.challenge,
                loading: false
            };
        case 'INSERT_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'INSERT_CHALLENGE':
            return {
                ...state,
                loading: false
            };
        case 'EDIT_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'EDIT_CHALLENGE':
            const assignedPlayers = state.challenge.players.map(
                player => player.id
            );
            const assignedTeams = state.challenge.teams.map(team => team.id);
            return {
                ...state,
                teams: action.teams.filter(
                    team => !assignedTeams.includes(team.id)
                ),
                players: action.players.filter(
                    player => !assignedPlayers.includes(player.id)
                ),
                loading: false
            };
        case 'UPDATE_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'UPDATE_CHALLENGE':
            return {
                ...state,
                challenge: {
                    ...state.challenge,
                    ...action.challenge
                },
                loading: false
            };
        case 'ATTACH_CHALLENGE_TO_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_CHALLENGE_TO_PLAYER':
            return {
                ...state,
                challenge: {
                    ...state.challenge,
                    players: [
                        ...state.challenge.players,
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
        case 'DETACH_CHALLENGE_FROM_PLAYER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_CHALLENGE_FROM_PLAYER':
            return {
                ...state,
                challenge: {
                    ...state.challenge,
                    players: state.challenge.players.filter(
                        player => player.id != action.playerId
                    )
                },
                players: [
                    ...state.players,
                    state.challenge.players.find(
                        player => player.id == action.playerId
                    )
                ],
                loading: false
            };
        case 'ATTACH_CHALLENGE_TO_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'ATTACH_CHALLENGE_TO_TEAM':
            return {
                ...state,
                challenge: {
                    ...state.challenge,
                    teams: [
                        ...state.challenge.teams,
                        state.teams.find(team => team.id == action.teamId)
                    ]
                },
                teams: state.teams.filter(team => team.id != action.teamId),
                loading: false
            };
        case 'DETACH_CHALLENGE_FROM_TEAM_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DETACH_CHALLENGE_FROM_TEAM':
            return {
                ...state,
                challenge: {
                    ...state.challenge,
                    teams: state.challenge.teams.filter(
                        team => team.id != action.teamId
                    )
                },
                teams: [
                    ...state.teams,
                    state.challenge.teams.find(team => team.id == action.teamId)
                ],
                loading: false
            };
        default:
            return state;
    }
};
