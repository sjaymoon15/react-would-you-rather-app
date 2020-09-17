import * as API from '../utils/_DATA';
import Cookies from 'universal-cookie';
import { AUTH_COOKIE } from '../constants/variables';
import * as routes from '../constants/routes';

const cookies = new Cookies();

export const SIGN_IN = 'SIGN_IN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOG_OUT = 'LOG_OUT';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_PROGRESS_STARTED = 'SAVE_PROGRESS_STARTED';
export const SAVE_PROGRESS_FINISHED = 'SAVE_PROGRESS_FINISHED';
export const SAVE_QUESTION_ANSWER_USERS = 'SAVE_QUESTION_ANSWER_USERS';
export const SAVE_QUESTION_ANSWER_QUESTIONS = 'SAVE_QUESTION_ANSWER_QUESTIONS';

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
  dispatch({ type: SAVE_PROGRESS_STARTED });
  await API._saveQuestionAnswer({ authedUser, qid, answer });
  dispatch({
    type: SAVE_QUESTION_ANSWER_USERS,
    payload: { authedUser, qid, answer },
  });
  dispatch({
    type: SAVE_QUESTION_ANSWER_QUESTIONS,
    payload: { authedUser, qid, answer },
  });
  dispatch({ type: SAVE_PROGRESS_FINISHED });
};

export const saveQuestion = (question, history) => async (dispatch) => {
  dispatch({ type: SAVE_PROGRESS_STARTED });
  await API._saveQuestion(question);
  dispatch({ type: SAVE_PROGRESS_FINISHED });
  history.push(routes.HOME);
};
