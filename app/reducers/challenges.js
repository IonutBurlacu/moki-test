export default (
	state = {
		items: [],
		challenge: { players: [], teams: [] },
		players: [],
		teams: [],
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
				loading: false
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
			let assignedPlayers = state.challenge.players.map(
				player => player.id
			);
			let assignedTeams = state.challenge.teams.map(team => team.id);
			console.log(action);
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
