import { combineReducers } from 'redux';
import manager from './manager';
import alert from './alert'
import auth from './auth'

export default combineReducers({
  manager,
  alert,
  auth
});
