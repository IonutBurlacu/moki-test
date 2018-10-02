import { combineReducers } from 'redux';
import authReducer from './auth';
import loaderReducer from './loader';
import challengesReducer from './challenges';
import teamsReducer from './teams';
import playersReducer from './players';
import alertReducer from './alert';
import bandsReducer from './bands';
import reportsReducer from './reports';
import soundsReducer from './sounds';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    loader: loaderReducer,
    challenges: challengesReducer,
    bands: bandsReducer,
    teams: teamsReducer,
    players: playersReducer,
    reports: reportsReducer,
    sounds: soundsReducer,
});
