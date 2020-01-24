export default (
    state = {
        hide_totals: false,
        loading: true,
        version: ''
    },
    action
) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                token: action.token,
                schoolName: action.schoolName,
                fullName: action.fullName,
                email: action.email
            };
        case 'LOGOUT':
            return {};
        case 'DELETE_ACCOUNT':
            return {};
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
