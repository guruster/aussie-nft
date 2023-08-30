import api from '../utils/api';
// import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_UPDATED
} from './types';


// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    console.log('loaduser',res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData, enqueueSnackbar) => async dispatch => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => enqueueSnackbar(error.msg, { variant: 'error' }));
    }
  }
};

// Login User
export const login = (user, enqueueSnackbar) => async dispatch => {
  try {
    const res = await api.post('/auth', user);
    console.log('login', res.data);
    enqueueSnackbar('Login success', { variant: 'success', autoHideDuration: 2000 });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => enqueueSnackbar(error.msg, { variant: 'error' }));
    }
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

export const saveDetail = (user, enqueueSnackbar) => async dispatch => {
  console.log('avatar',user.avatar);
  const formData = new FormData();
  formData.append('avatar', user.avatar);
  formData.append('name', user.name);
  formData.append('email', user.email);
  formData.append('phone', user.phone);
  const res = await api.post('/users/savedetail', formData);
  console.log('saveDetail', res.data);
  if (res.data) {
    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
    enqueueSnackbar('Update Success', { variant: 'success' });
  }
}

export const resetPassword = (passwords, enqueueSnackbar) => async dispatch => {
  try {
    const res = await api.post('/users/resetpassword', passwords);
    console.log('resetPassword', res.data);
    enqueueSnackbar('Reset password Success', { variant: 'success' });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => enqueueSnackbar(error.msg, { variant: 'error' }));
    }
  }
}
