import axios from 'axios';
import { isBoolean } from 'util';
import host from '../constants/serverUrl';
import encrypt from '../utils/encrypt';

const root = '/api/auth';

export default class AuthAPI {
    static login(headers = {}, email, password, timezone) {
        const encrypted = encrypt({
            email,
            password,
            timezone
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

    static deleteAccount(headers = {}, password) {
        const encrypted = encrypt({
            password
        });
        return axios({
            method: 'post',
            url: `${host}${root}/delete_account`,
            headers: {
                ...headers
            },
            data: {
                encrypted
            }
        });
    }

    static updateAvatar(headers = {}, school) {
        const formData = new FormData();
        formData.append('avatar', school.file);
        const encrypted = encrypt({
            test: 'test'
        });
        formData.append('encrypted', encrypted);
        // if (school.file) {

        // } else {
        //     formData.append('default_avatar', school.default_avatar);
        // }
        return axios.post(`${host}${root}/update_avatar`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static changeSetting(headers = {}, settingName, settingValue) {
        if (isBoolean(settingValue)) {
            settingValue = settingValue ? 1 : 0;
        }
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

    static forgotPassword(headers = {}, email) {
        const encrypted = encrypt({
            email
        });
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${host}${root}/reset_password`,
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

    static getVersion(headers = {}) {
        return axios({
            method: 'get',
            url: `${host}${root}/app_version`,
            headers: {
                ...headers
            }
        });
    }
}
