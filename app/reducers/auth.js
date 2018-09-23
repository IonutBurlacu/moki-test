export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                token: action.token,
                schoolName: action.schoolName,
                fullName: action.fullName,
                email: action.email,
                hide_totals: action.hide_totals,
                ignore_weekend: action.ignore_weekend
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
        default:
            return state;
    }
};
