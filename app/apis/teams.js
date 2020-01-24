import axios from 'axios';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/teams';

export default class TeamsAPI {
    static get(headers = {}, dateByType, startDate, endDate) {
        return axios({
            method: 'get',
            url: `${host}${root}/index?type=${dateByType}&start_date=${startDate}&end_date=${endDate}`,
            headers: {
                ...headers
            }
        });
    }

    static view(headers = {}, id, dateByType, dateByStartDate, dateByEndDate) {
        const encrypted = encrypt({
            type: dateByType,
            start_date: dateByStartDate,
            end_date: dateByEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/view/${id}`,
            headers: {
                ...headers
            },
            data: {
                encrypted
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

    static stats(headers = {}, id, dateByType, dateByStartDate, dateByEndDate) {
        const encrypted = encrypt({
            type: dateByType,
            start_date: dateByStartDate,
            end_date: dateByEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/stats/${id}`,
            headers: {
                ...headers
            },
            data: {
                encrypted
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

    static insert(headers = {}, team) {
        const formData = new FormData();
        if (team.file) {
            formData.append('avatar', team.file);
        } else {
            formData.append('default_avatar', team.default_avatar);
        }
        const encrypted = encrypt({
            name: team.name,
            players: team.players.map(player => player.id)
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

    static update(headers = {}, team, id) {
        const formData = new FormData();
        if (team.file) {
            formData.append('avatar', team.file);
        }
        const encrypted = encrypt({
            name: team.name
        });
        formData.append('encrypted', encrypted);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static attachToPlayer(headers = {}, playerId, teamId) {
        const encrypted = encrypt({
            player_id: playerId,
            team_id: teamId
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

    static detachFromPlayer(headers = {}, playerId, teamId) {
        const encrypted = encrypt({
            player_id: playerId,
            team_id: teamId
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

    static attachToChallenge(headers = {}, challengeId, teamId) {
        const encrypted = encrypt({
            challenge_id: challengeId,
            team_id: teamId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/attach_to_challenge`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static detachFromChallenge(headers = {}, challengeId, teamId) {
        const encrypted = encrypt({
            challenge_id: challengeId,
            team_id: teamId
        });
        return axios({
            method: 'post',
            url: `${host}${root}/detach_from_challenge`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }
}
