import {combineReducers} from 'redux'
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {routerReducer as routing} from 'react-router-redux';
import mapLocation from './mapLocation'
import mapDirections from './mapDirections';
import dom from './dom'

export default combineReducers({routing, reduxAsyncConnect, mapLocation, mapDirections, dom});
