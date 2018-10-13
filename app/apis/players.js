import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/players';

export default class PlayersAPI {
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

    static stats(headers = {}, id, chartType, chartStartDate, chartEndDate) {
        return axios({
            method: 'post',
            url: `${host}${root}/stats/${id}`,
            headers: {
                ...headers
            },
            data: {
                type: chartType,
                start_date: chartStartDate,
                end_date: chartEndDate
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
        const formData = new FormData();
        if (player.file) {
            formData.append('avatar', player.file);
        } else {
            formData.append('default_avatar', player.default_avatar);
        }
        formData.append('first_name', player.first_name);
        formData.append('last_name', player.last_name);
        formData.append('gender', player.gender);
        formData.append('birthday', player.birthday);
        formData.append('grade_id', player.grade_id);
        formData.append('grade', player.grade);
        formData.append('year_id', player.year_id);
        formData.append('year', player.year);
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

    static update(headers = {}, player, id) {
        const formData = new FormData();
        if (player.file) {
            formData.append('avatar', player.file);
        }
        formData.append('first_name', player.first_name);
        formData.append('last_name', player.last_name);
        formData.append('gender', player.gender);
        formData.append('birthday', player.birthday);
        formData.append('grade_id', player.grade_id);
        formData.append('grade', player.grade);
        formData.append('year_id', player.year_id);
        formData.append('year', player.year);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
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

    static deleteDatabase(headers = {}, password) {
        return axios({
            method: 'post',
            url: `${host}${root}/delete_database`,
            headers: {
                ...headers
            },
            data: {
                password
            }
        });
    }

    static importDatabase(headers = {}, file) {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${host}${root}/import`, formData, {
            headers: {
                ...headers,
                'content-type': 'multipart/form-data'
            }
        });
    }
}
