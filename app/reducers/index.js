import { combineReducers } from 'redux';
import authReducer from './auth';
import loaderReducer from './loader';
import challengesReducer from './challenges';
import teamsReducer from './teams';
import playersReducer from './players';
import alertReducer from './alert';

export default combineReducers({
	auth: authReducer,
	alert: alertReducer,
	loader: loaderReducer,
	challenges: challengesReducer,
	teams: teamsReducer,
	players: playersReducer
});
