export default (state = { active: 'players' }, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_MENU':
            return {
                ...state,
                active: action.menu
            };
        default:
            return state;
    }
};
