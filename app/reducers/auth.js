export default (
    state = {
        ignore_weekend: false,
        hide_totals: false,
        min_hour_id: null,
        max_hour_id: null,
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
                ignore_weekend: action.ignoreWeekend,
                min_hour_id: action.minHourId,
                max_hour_id: action.maxHourId,
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
