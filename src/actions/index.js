import * as API from '../utils/_DATA';
import Cookies from 'universal-cookie';
import { AUTH_COOKIE } from '../constants/variables';

const cookies = new Cookies();

export const SIGN_IN = 'SIGN_IN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOG_OUT = 'LOG_OUT';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

export const fetchUsers = () => async (dispatch) => {
  const users = await API._getUsers();
  dispatch({ type: RECEIVE_USERS, payload: users });
};

export const signIn = (userId) => {
  cookies.set(AUTH_COOKIE, userId, { path: '/', maxAge: '604800' });
  return { type: SIGN_IN, payload: userId };
};

export const logout = () => {
  cookies.remove(AUTH_COOKIE);
  return { type: LOG_OUT, payload: '' };
};

export const setRedirectUrl = (redirectUrl) => ({
  type: SET_REDIRECT_URL,
  payload: redirectUrl,
});
