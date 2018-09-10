export default (state = { show: false, message: '' }, action) => {
	switch (action.type) {
		case 'SHOW_ALERT':
			return {
				show: true,
				message: action.message
			};
		case 'HIDE_ALERT':
			return {
				show: false
			};
		default:
			return state;
	}
};
