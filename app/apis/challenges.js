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

    static delete(headers = {}, id) {
        return axios({
            method: 'post',
            url: `${host}${root}/delete/${id}`,
            headers: {
                ...headers
            }
        });
    }

    static insert(headers = {}, challenge) {
        const formData = new FormData();
        if (challenge.file) {
            formData.append('avatar', challenge.file);
        }
        formData.append('name', challenge.name);
        formData.append('type', challenge.type);
        formData.append('target_steps', challenge.target_steps);
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

    static update(headers = {}, challenge, id) {
        const formData = new FormData();
        if (challenge.file) {
            formData.append('avatar', challenge.file);
        }
        formData.append('name', challenge.name);
        formData.append('type', challenge.type);
        formData.append('target_steps', challenge.target_steps);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
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
