export default (
    state = { ignore_weekend: false, hide_totals: false, loading: true },
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
                [action.settingName]: !state[action.settingName]
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
                ignore_weekend: action.ignoreWeekend,
                loading: false
            };
        default:
            return state;
    }
};
