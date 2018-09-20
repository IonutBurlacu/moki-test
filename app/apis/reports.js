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

    static stats(
        headers = {},
        teamIdsA,
        teamIdsB,
        chartType,
        filterByA,
        filterByValueA,
        filterByB,
        filterByValueB
    ) {
        return axios({
            method: 'post',
            url: `${host}${root}/stats`,
            headers: {
                ...headers
            },
            data: {
                team_ids_a: teamIdsA,
                team_ids_b: teamIdsB,
                filter_by_a: filterByA,
                filter_by_value_a: filterByValueA,
                filter_by_b: filterByB,
                filter_by_value_b: filterByValueB,
                type: chartType
            }
        });
    }
}
