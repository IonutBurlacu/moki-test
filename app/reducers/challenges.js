import moment from 'moment';

export default (
    state = {
        items: [],
        challenge: { players: [], teams: [] },
        new: { teams: [], players: [] },
        players: [],
        teams: [],
        listDate: 'today',
        listStartDate: moment.utc().local(),
        listEndDate: moment.utc().local(),
        listSort: 'most_steps',
        listSortLabel: 'Most steps',
        listFilterValues: [],
        dateSelectOpen: false,
        filterSelectOpen: false,
        sortSelectOpen: false,
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
                items: action.challenges,
                teams: action.teams,
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
        case 'ADD_CHALLENGES_LIST_FILTER':
            return {
                ...state,
                listFilterValues: [
                    ...state.listFilterValues,
                    action.listFilterValue
                ]
            };
        case 'REMOVE_CHALLENGES_LIST_FILTER':
            return {
                ...state,
                listFilterValues: state.listFilterValues.filter(
                    element => element !== action.listFilterValue
                )
            };
        case 'CLEAR_CHALLENGES_LIST_FILTER':
            return {
                ...state,
                listFilterValues: []
            };
        case 'VIEW_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'VIEW_CHALLENGE':
            return {
                ...state,
                challenge: {
                    ...action.challenge,
                    teams: action.challenge.teams.map(team => ({
                        ...team,
                        percentage:
                            team.progress <= action.challenge.target_steps
                                ? (team.progress * 100) /
                                  action.challenge.target_steps
                                : 100
                    })),
                    players: action.challenge.players.map(player => ({
                        ...player,
                        percentage:
                            player.progress <= action.challenge.target_steps
                                ? (player.progress * 100) /
                                  action.challenge.target_steps
                                : 100
                    }))
                },
                loading: false
            };
        case 'DELETE_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'DELETE_CHALLENGE':
            return {
                ...state,
                loading: false
            };
        case 'CREATE_CHALLENGE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'CREATE_CHALLENGE':
            return {
                ...state,
                players: action.players,
                teams: action.teams,
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
                new: { teams: [], players: [] },
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
        case 'ATTACH_NEW_CHALLENGE_TO_PLAYER':
            return {
                ...state,
                new: {
                    ...state.new,
                    players: [
                        ...state.new.players,
                        state.players.find(
                            player => player.id === action.playerId
                        )
                    ]
                },
                players: state.players.filter(
                    player => player.id !== action.playerId
                )
            };
        case 'DETACH_NEW_CHALLENGE_FROM_PLAYER':
            return {
                ...state,
                new: {
                    ...state.new,
                    players: state.new.players.filter(
                        player => player.id !== action.playerId
                    )
                },
                players: [
                    ...state.players,
                    state.new.players.find(
                        player => player.id === action.playerId
                    )
                ]
            };
        case 'ATTACH_NEW_CHALLENGE_TO_TEAM':
            return {
                ...state,
                new: {
                    ...state.new,
                    teams: [
                        ...state.new.teams,
                        state.teams.find(team => team.id === action.teamId)
                    ]
                },
                teams: state.teams.filter(team => team.id !== action.teamId)
            };
        case 'DETACH_NEW_CHALLENGE_FROM_TEAM':
            return {
                ...state,
                new: {
                    ...state.new,
                    teams: state.new.teams.filter(
                        team => team.id !== action.teamId
                    )
                },
                teams: [
                    ...state.teams,
                    state.new.teams.find(team => team.id === action.teamId)
                ]
            };
        case 'OPEN_CHALLENGES_MENU':
            return {
                ...state,
                dateSelectOpen: false,
                filterSelectOpen: false,
                sortSelectOpen: false,
                [action.menu]: true
            };
        case 'CLOSE_CHALLENGES_MENU':
            return {
                ...state,
                [action.menu]: false
            };
        default:
            return state;
    }
};
