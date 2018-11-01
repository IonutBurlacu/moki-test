import axios from 'axios';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/bands';

export default class BandsAPI {
    static pair(headers = {}, action) {
        const encrypted = encrypt({
            uuid: action.uuid
        });
        return axios({
            method: 'post',
            url: `${host}${root}/pair/${action.id}`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static sync(headers = {}, action) {
        const encrypted = encrypt({
            uuid: action.uuid,
            all_steps: action.allSteps
        });
        console.log(action.allSteps);
        return axios({
            method: 'post',
            url: `${host}${root}/sync`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }
}
