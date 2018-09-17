import axios from 'axios';
import host from '../constants/serverUrl';

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

    static stats(headers = {}, teamIdsA, teamIdsB, chartType) {
        return axios({
            method: 'post',
            url: `${host}${root}/stats`,
            headers: {
                ...headers
            },
            data: {
                team_ids_a: teamIdsA,
                team_ids_b: teamIdsB,
                type: chartType
            }
        });
    }
}
