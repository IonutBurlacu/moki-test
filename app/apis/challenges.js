import axios from 'axios';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/challenges';

export default class ChallengesAPI {
    static get(headers = {}, dateByType, startDate, endDate) {
        return axios({
            method: 'get',
            url: `${host}${root}/index?type=${dateByType}&start_date=${startDate}&end_date=${endDate}`,
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

    static create(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/create`,
            headers: {
                ...headers
            }
        });
    }

    static insert(headers = {}, challenge) {
        const formData = new FormData();
        if (challenge.file) {
            formData.append('avatar', challenge.file);
        } else {
            formData.append('default_avatar', challenge.default_avatar);
        }
        const encrypted = encrypt({
            name: challenge.name,
            type: challenge.type,
            target_steps: challenge.target_steps,
            players: challenge.players.map(player => player.id),
            teams: challenge.teams.map(team => team.id)
        });
        formData.append('encrypted', encrypted);
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
        const encrypted = encrypt({
            name: challenge.name,
            type: challenge.type,
            target_steps: challenge.target_steps
        });
        formData.append('encrypted', encrypted);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static attachToTeam(headers = {}, teamId, challengeId) {
        const encrypted = encrypt({
            team_id: teamId,
            challenge_id: challengeId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_team`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static detachFromTeam(headers = {}, teamId, challengeId) {
        const encrypted = encrypt({
            team_id: teamId,
            challenge_id: challengeId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_team`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static attachToPlayer(headers = {}, playerId, challengeId) {
        const encrypted = encrypt({
            player_id: playerId,
            challenge_id: challengeId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_player`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static detachFromPlayer(headers = {}, playerId, challengeId) {
        const encrypted = encrypt({
            player_id: playerId,
            challenge_id: challengeId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_player`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }
}
