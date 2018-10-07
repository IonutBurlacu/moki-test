export default (state = { loading: false, timeout: 10000 }, action) => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                ...state,
                loading: true,
                timeout: action.timeout ? action.timeout : 10000
            };
        case 'HIDE_LOADER':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
