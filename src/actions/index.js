import * as API from '../utils/_DATA';

export const SIGN_IN = 'SIGN_IN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOG_OUT = 'LOG_OUT';

export const fetchUsers = () => async (dispatch) => {
  const users = await API._getUsers();
  console.log(users);
  dispatch({ type: RECEIVE_USERS, payload: users });
};

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
});

export const logout = () => ({
  type: LOG_OUT,
  payload: '',
});
