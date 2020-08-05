export default (state = { show: false, message: '' }, action) => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return {
                show: true,
                message: action.message
            };
        case 'HIDE_TOAST':
            return {
                show: false
            };
        default:
            return state;
    }
};
