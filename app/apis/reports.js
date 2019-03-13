import axios from 'axios';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/reports';

export default class ReportsAPI {
    static index(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/index`,
            headers: {
                ...headers
            }
        });
    }

    static playerAverages(
        headers = {},
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) {
        const encrypted = encrypt({
            team_id: teamId,
            type: dateByType,
            start_date: dateByStartDate,
            end_date: dateByEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/player_averages`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static groupAverages(
        headers = {},
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) {
        const encrypted = encrypt({
            team_id: teamId,
            type: dateByType,
            start_date: dateByStartDate,
            end_date: dateByEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/group_averages`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static totalSteps(
        headers = {},
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) {
        const encrypted = encrypt({
            team_id: teamId,
            type: dateByType,
            start_date: dateByStartDate,
            end_date: dateByEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/total_steps`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }
}
