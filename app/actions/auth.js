export const loginRequest = (email, password) => ({
    type: 'LOGIN_REQUEST',
    email,
    password
});

export const login = (
    token,
    schoolName,
    schoolId,
    fullName,
    email,
    avatar
) => ({
    type: 'LOGIN',
    token,
    schoolName,
    schoolId,
    fullName,
    email,
    avatar
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const changePasswordRequest = (oldPassword, newPassword) => ({
    type: 'CHANGE_PASSWORD_REQUEST',
    oldPassword,
    newPassword
});

export const deleteAccountRequest = password => ({
    type: 'DELETE_ACCOUNT_REQUEST',
    password
});

export const deleteAccount = () => ({
    type: 'DELETE_ACCOUNT'
});

export const updateAvatarRequest = school => ({
    type: 'UPDATE_AVATAR_REQUEST',
    school
});

export const updateAvatar = school => ({
    type: 'UPDATE_AVATAR',
    school
});

export const changeSettingRequest = (settingName, settingValue) => ({
    type: 'CHANGE_SETTING_REQUEST',
    settingName,
    settingValue
});

export const changeSetting = (settingName, settingValue) => ({
    type: 'CHANGE_SETTING',
    settingName,
    settingValue
});

export const getSettingsRequest = () => ({
    type: 'GET_SETTINGS_REQUEST'
});

export const getSettings = (
    hideTotals,
    schoolName,
    schoolId,
    fullName,
    email,
    avatar
) => ({
    type: 'GET_SETTINGS',
    hideTotals,
    schoolName,
    schoolId,
    fullName,
    email,
    avatar
});

export const forgotPasswordRequest = email => ({
    type: 'FORGOT_PASSWORD_REQUEST',
    email
});

export const getVersionRequest = () => ({
    type: 'GET_VERSION_REQUEST'
});

export const getVersion = version => ({
    type: 'GET_VERSION',
    version
});
