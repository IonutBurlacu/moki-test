export const loginRequest = (email, password) => ({
    type: 'LOGIN_REQUEST',
    email,
    password
});

export const login = (token, schoolName, fullName, email) => ({
    type: 'LOGIN',
    token,
    schoolName,
    fullName,
    email
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const changePasswordRequest = (oldPassword, newPassword) => ({
    type: 'CHANGE_PASSWORD_REQUEST',
    oldPassword,
    newPassword
});

export const deleteAccountRequest = () => ({
    type: 'DELETE_ACCOUNT_REQUEST'
});

export const deleteAccount = () => ({
    type: 'DELETE_ACCOUNT'
});

export const changeSettingRequest = settingName => ({
    type: 'CHANGE_SETTING_REQUEST',
    settingName
});

export const changeSetting = settingName => ({
    type: 'CHANGE_SETTING',
    settingName
});

export const getSettingsRequest = () => ({
    type: 'GET_SETTINGS_REQUEST'
});

export const getSettings = (ignoreWeekend, hideTotals) => ({
    type: 'GET_SETTINGS',
    ignoreWeekend,
    hideTotals
});
