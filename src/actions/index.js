import * as API from '../utils/_DATA';
import * as types from './types';
import Cookies from 'universal-cookie';
import { AUTH_COOKIE } from '../constants/variables';
import * as routes from '../constants/routes';

const cookies = new Cookies();

export const fetchUsers = () => async (dispatch) => {
  const users = await API._getUsers();
  dispatch({ type: types.RECEIVE_USERS, payload: users });
};

export const signIn = (userId) => {
  cookies.set(AUTH_COOKIE, userId, { path: '/', maxAge: '604800' });
  return { type: types.SIGN_IN, payload: userId };
};

export const logout = () => {
  cookies.remove(AUTH_COOKIE);
  return { type: types.LOG_OUT, payload: '' };
};

export const setRedirectUrl = (redirectUrl) => ({
  type: types.SET_REDIRECT_URL,
  payload: redirectUrl,
});

export const fetchQuestions = () => async (dispatch) => {
  const questions = await API._getQuestions();
  dispatch({ type: types.RECEIVE_QUESTIONS, payload: questions });
};

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => async (
  dispatch
) => {
  dispatch({ type: types.SAVE_PROGRESS_STARTED });
  await API._saveQuestionAnswer({ authedUser, qid, answer });
  dispatch({
    type: types.SAVE_QUESTION_ANSWER_USERS,
    payload: { authedUser, qid, answer },
  });
  dispatch({
    type: types.SAVE_QUESTION_ANSWER_QUESTIONS,
    payload: { authedUser, qid, answer },
  });
  dispatch({ type: types.SAVE_PROGRESS_FINISHED });
};

export const saveQuestion = (question, history) => async (dispatch) => {
  dispatch({ type: types.SAVE_PROGRESS_STARTED });
  await API._saveQuestion(question);
  dispatch({ type: types.SAVE_PROGRESS_FINISHED });
  history.push(routes.HOME);
};
