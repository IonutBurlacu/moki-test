import axios from 'axios';
import moment from 'moment';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

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
        const encrypted = encrypt({
            type: chartType,
            start_date: chartStartDate,
            end_date: chartEndDate
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

    static insert(headers = {}, player) {
        const formData = new FormData();
        if (player.file) {
            formData.append('avatar', player.file);
        } else {
            formData.append('default_avatar', player.default_avatar);
        }
        const encrypted = encrypt({
            first_name: player.first_name,
            last_name: player.last_name,
            gender: player.gender,
            birthday: moment(player.birthday).format('YYYY-MM-DD'),
            grade_id: player.grade_id,
            grade: player.grade,
            year_id: player.year_id,
            year: player.year,
            free_school_meals: player.free_school_meals,
            pupil_premium: player.pupil_premium,
            sen: player.sen,
            tags: player.tags
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

    static update(headers = {}, player, id) {
        const formData = new FormData();
        if (player.file) {
            formData.append('avatar', player.file);
        }
        const encrypted = encrypt({
            first_name: player.first_name,
            last_name: player.last_name,
            gender: player.gender,
            birthday: moment(player.birthday).format('YYYY-MM-DD'),
            grade_id: player.grade_id,
            grade: player.grade,
            year_id: player.year_id,
            year: player.year,
            free_school_meals: player.free_school_meals,
            pupil_premium: player.pupil_premium,
            sen: player.sen,
            tags: player.tags
        });
        formData.append('encrypted', encrypted);
        return axios.post(`${host}${root}/update/${id}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static attachToTeam(headers = {}, teamId, playerId) {
        const encrypted = encrypt({
            team_id: teamId,
            player_id: playerId
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

    static detachFromTeam(headers = {}, teamId, playerId) {
        const encrypted = encrypt({
            team_id: teamId,
            player_id: playerId
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

    static attachToChallenge(headers = {}, challengeId, playerId) {
        const encrypted = encrypt({
            challenge_id: challengeId,
            player_id: playerId
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

    static detachFromChallenge(headers = {}, challengeId, playerId) {
        const encrypted = encrypt({
            challenge_id: challengeId,
            player_id: playerId
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

    static deleteDatabase(headers = {}, password) {
        const encrypted = encrypt({
            password
        });
        return axios({
            method: 'post',
            url: `${host}${root}/delete_database`,
            headers: {
                ...headers
            },
            data: {
                encrypted
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
