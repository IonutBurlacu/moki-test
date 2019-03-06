import axios from 'axios';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/auth';

export default class AuthAPI {
    static login(headers = {}, email, password) {
        const encrypted = encrypt({
            email,
            password
        });
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${host}${root}/login`,
                headers: {
                    ...headers
                },
                data: {
                    encrypted
                }
            })
                .then(response => {
                    resolve({ error: false, data: response.data });
                    return true;
                })
                .catch(error => {
                    reject({
                        error: true,
                        message: error.response.data
                    });
                });
        });
    }

    static changePassword(headers = {}, oldPassword, newPassword) {
        const encrypted = encrypt({
            old_password: oldPassword,
            new_password: newPassword
        });
        return axios({
            method: 'post',
            url: `${host}${root}/change_password`,
            headers: {
                ...headers
            },
            data: {
                encrypted
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

    static changeSetting(headers = {}, settingName, settingValue) {
        const encrypted = encrypt({
            [settingName]: settingValue
        });
        return axios({
            method: 'post',
            url: `${host}${root}/change_setting`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static getSettings(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/get_settings`,
            headers: {
                ...headers
            }
        });
    }
}
