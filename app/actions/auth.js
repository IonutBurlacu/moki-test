export const loginRequest = (email, password) => ({
	type: 'LOGIN_REQUEST',
	email,
	password
});

export const login = token => ({
	type: 'LOGIN',
	token
});

export const logout = () => ({
	type: 'LOGOUT'
});
