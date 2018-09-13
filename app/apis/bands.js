import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/bands';

export default class BandsAPI {
    static pair(headers = {}, action) {
        return axios({
            method: 'post',
            url: `${host}${root}/pair/${action.id}`,
            headers: {
                ...headers
            },
            data: {
                uuid: action.uuid
            }
        });
    }

    static sync(headers = {}, action) {
        return axios({
            method: 'post',
            url: `${host}${root}/sync`,
            headers: {
                ...headers
            },
            data: {
                uuid: action.uuid,
                total_steps: action.totalSteps,
                steps: action.steps
            }
        });
    }
}
