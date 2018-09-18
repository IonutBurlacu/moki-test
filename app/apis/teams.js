import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/teams';

export default class TeamsAPI {
    static get(headers = {}, listDate) {
        return axios({
            method: 'get',
            url: `${host}${root}/index?list_date=${listDate}`,
            headers: {
                ...headers
            }
        });
    }

    static view(headers = {}, id) {
        return axios({
            method: 'get',
            url: `${host}${root}/view/${id}`,
            headers: {
                ...headers
            }
        });
    }

    static stats(headers = {}, id, chartType) {
        return axios({
            method: 'post',
            url: `${host}${root}/stats/${id}`,
            headers: {
                ...headers
            },
            data: {
                type: chartType
            }
        });
    }

    static insert(headers = {}, team) {
        return axios({
            method: 'post',
            url: `${host}${root}/insert`,
            headers: {
                ...headers
            },
            data: team
        });
    }

    static edit(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/edit`,
            headers: {
                ...headers
            }
        });
    }

    static update(headers = {}, team, id) {
        return axios({
            method: 'post',
            url: `${host}${root}/update/${id}`,
            headers: {
                ...headers
            },
            data: team
        });
    }

    static attachToPlayer(headers = {}, playerId, teamId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_player`,
            headers: {
                ...headers
            },
            data: {
                player_id: playerId,
                team_id: teamId
            }
        });
    }

    static detachFromPlayer(headers = {}, playerId, teamId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_player`,
            headers: {
                ...headers
            },
            data: {
                player_id: playerId,
                team_id: teamId
            }
        });
    }

    static attachToChallenge(headers = {}, challengeId, teamId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_challenge`,
            headers: {
                ...headers
            },
            data: {
                challenge_id: challengeId,
                team_id: teamId
            }
        });
    }

    static detachFromChallenge(headers = {}, challengeId, teamId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_challenge`,
            headers: {
                ...headers
            },
            data: {
                challenge_id: challengeId,
                team_id: teamId
            }
        });
    }
}
