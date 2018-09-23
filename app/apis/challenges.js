import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/challenges';

export default class ChallengesAPI {
    static get(headers = {}, listDate, startDate, endDate) {
        return axios({
            method: 'get',
            url: `${host}${root}/index?list_date=${listDate}&start_date=${startDate}&end_date=${endDate}`,
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

    static insert(headers = {}, challenge) {
        return axios({
            method: 'post',
            url: `${host}${root}/insert`,
            headers: {
                ...headers
            },
            data: challenge
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

    static update(headers = {}, challenge, id) {
        return axios({
            method: 'post',
            url: `${host}${root}/update/${id}`,
            headers: {
                ...headers
            },
            data: challenge
        });
    }

    static attachToTeam(headers = {}, teamId, challengeId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_team`,
            headers: {
                ...headers
            },
            data: {
                team_id: teamId,
                challenge_id: challengeId
            }
        });
    }

    static detachFromTeam(headers = {}, teamId, challengeId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_team`,
            headers: {
                ...headers
            },
            data: {
                team_id: teamId,
                challenge_id: challengeId
            }
        });
    }

    static attachToPlayer(headers = {}, playerId, challengeId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_player`,
            headers: {
                ...headers
            },
            data: {
                player_id: playerId,
                challenge_id: challengeId
            }
        });
    }

    static detachFromPlayer(headers = {}, playerId, challengeId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_player`,
            headers: {
                ...headers
            },
            data: {
                player_id: playerId,
                challenge_id: challengeId
            }
        });
    }
}
