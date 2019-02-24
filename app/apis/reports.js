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

    static playerVariation(
        headers = {},
        teamId,
        chartType,
        chartStartDate,
        chartEndDate
    ) {
        const encrypted = encrypt({
            team_id: teamId,
            type: chartType,
            start_date: chartStartDate,
            end_date: chartEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/player_variation`,
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
        chartType,
        chartStartDate,
        chartEndDate
    ) {
        const encrypted = encrypt({
            team_id: teamId,
            type: chartType,
            start_date: chartStartDate,
            end_date: chartEndDate
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
}
