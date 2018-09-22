import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/players';

export default class PlayersAPI {
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

    static create(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/create`,
            headers: {
                ...headers
            }
        });
    }

    static insert(headers = {}, player) {
        return axios({
            method: 'post',
            url: `${host}${root}/insert`,
            headers: {
                ...headers
            },
            data: player
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

    static update(headers = {}, player, id) {
        return axios({
            method: 'post',
            url: `${host}${root}/update/${id}`,
            headers: {
                ...headers
            },
            data: player
        });
    }

    static attachToTeam(headers = {}, teamId, playerId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_team`,
            headers: {
                ...headers
            },
            data: {
                team_id: teamId,
                player_id: playerId
            }
        });
    }

    static detachFromTeam(headers = {}, teamId, playerId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_team`,
            headers: {
                ...headers
            },
            data: {
                team_id: teamId,
                player_id: playerId
            }
        });
    }

    static attachToChallenge(headers = {}, challengeId, playerId) {
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_challenge`,
            headers: {
                ...headers
            },
            data: {
                challenge_id: challengeId,
                player_id: playerId
            }
        });
    }

    static detachFromChallenge(headers = {}, challengeId, playerId) {
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_challenge`,
            headers: {
                ...headers
            },
            data: {
                challenge_id: challengeId,
                player_id: playerId
            }
        });
    }

    static deleteDatabase(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/delete_database`,
            headers: {
                ...headers
            }
        });
    }
}
