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

    static stats(
        headers = {},
        teamIdsA,
        teamIdsB,
        chartType,
        chartStartDate,
        chartEndDate,
        filterByA,
        filterByB
    ) {
        const encrypted = encrypt({
            team_ids_a: teamIdsA,
            team_ids_b: teamIdsB,
            filter_by_a: filterByA.length ? filterByA.join(',') : '',
            filter_by_b: filterByB.length ? filterByB.join(',') : '',
            type: chartType,
            start_date: chartStartDate,
            end_date: chartEndDate
        });
        return axios({
            method: 'post',
            url: `${host}${root}/stats`,
            headers: {
                ...headers
            },
            data: {
                encrypted
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
}
