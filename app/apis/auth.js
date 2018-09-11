import axios from 'axios';
import host from '../constants/serverUrl';

const root = '/api/auth';

export default class AuthAPI {
    static login(headers = {}, email, password) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${host}${root}/login`,
                headers: {
                    ...headers
                },
                data: {
                    email,
                    password
                }
            })
                .then(response => {
                    resolve({ error: false, data: response.data });
                })
                .catch(error => {
                    reject({
                        error: true,
                        message: error.response.data.message
                    });
                });
        });
    }
}
