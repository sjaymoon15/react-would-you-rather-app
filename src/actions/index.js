import * as API from '../utils/_DATA';
import Cookies from 'universal-cookie';
import { AUTH_COOKIE } from '../constants/variables';

const cookies = new Cookies();

export const SIGN_IN = 'SIGN_IN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOG_OUT = 'LOG_OUT';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_STARTED = 'SAVE_ANSWER_STARTED';
export const SAVE_ANSWER_FINISHED = 'SAVE_ANSWER_FINISHED';

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

export const fetchQuestions = () => async (dispatch) => {
  const questions = await API._getQuestions();
  dispatch({ type: RECEIVE_QUESTIONS, payload: questions });
};

export const saveQeustionAnswer = ({ authedUser, qid, answer }) => async (
  dispatch
) => {
  dispatch({ type: SAVE_ANSWER_STARTED });
  const res = await API._saveQuestionAnswer({ authedUser, qid, answer });
  const questions = await API._getQuestions();
  dispatch({ type: RECEIVE_QUESTIONS, payload: questions });
  const users = await API._getUsers();
  dispatch({ type: RECEIVE_USERS, payload: users });
  dispatch({ type: SAVE_ANSWER_FINISHED });
};
