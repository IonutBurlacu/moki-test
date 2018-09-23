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
                    return true;
                })
                .catch(error => {
                    reject({
                        error: true,
                        message: error.response.data.message
                    });
                });
        });
    }

    static changePassword(headers = {}, oldPassword, newPassword) {
        return axios({
            method: 'post',
            url: `${host}${root}/change_password`,
            headers: {
                ...headers
            },
            data: {
                old_password: oldPassword,
                new_password: newPassword
            }
        });
    }

    static deleteAccount(headers = {}) {
        return axios({
            method: 'post',
            url: `${host}${root}/delete_account`,
            headers: {
                ...headers
            }
        });
    }

    static changeSetting(headers = {}, settingName) {
        return axios({
            method: 'post',
            url: `${host}${root}/change_setting`,
            headers: {
                ...headers
            },
            data: {
                [settingName]: true
            }
        });
    }
}
