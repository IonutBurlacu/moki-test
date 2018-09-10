import axios from 'axios';

const host = 'http://local.moki.com';
const root = '/api/auth';

export default class AuthAPI {
	static login(headers = {}, email, password) {
		return axios({
			method: 'post',
			url: `${host}${root}/login`,
			headers: {
				...headers
			},
			data: {
				email,
				password
			}
		});
	}
}
