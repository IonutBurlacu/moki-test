import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/teams';

export default class TeamsAPI {
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
        const formData = new FormData();
        if (team.file) {
            formData.append('avatar', team.file);
        }
        formData.append('name', team.name);
        return axios.post(`${host}${root}/insert`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
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
        const formData = new FormData();
        if (team.file) {
            formData.append('avatar', team.file);
        }
        formData.append('name', team.name);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
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
