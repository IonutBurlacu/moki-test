export default (state = { show: false, message: '' }, action) => {
    switch (action.type) {
        case 'SHOW_CONFIRM':
            return {
                show: true,
                message: action.message,
                doConfirm: action.doConfirm
            };
        case 'HIDE_CONFIRM':
            return {
                show: false
            };
        default:
            return state;
    }
};
