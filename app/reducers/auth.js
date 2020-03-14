export default (
    state = {
        hide_totals: false,
        loading: true,
        version: '',
        token: null
    },
    action
) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                token: action.token,
                schoolName: action.schoolName,
                fullName: action.fullName,
                email: action.email,
                avatar: action.avatar
            };
        case 'LOGOUT':
            return {};
        case 'DELETE_ACCOUNT':
            return {};
        case 'UPDATE_AVATAR':
            return {
                ...state,
                avatar: action.avatar
            };
        case 'CHANGE_SETTING':
            return {
                ...state,
                [action.settingName]: action.settingValue
            };
        case 'GET_SETTINGS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_SETTINGS':
            return {
                ...state,
                hide_totals: action.hideTotals,
                schoolName: action.schoolName,
                fullName: action.fullName,
                email: action.email,
                avatar: action.avatar,
                loading: false
            };
        case 'GET_VERSION':
            return {
                ...state,
                version: action.version
            };
        default:
            return state;
    }
};
