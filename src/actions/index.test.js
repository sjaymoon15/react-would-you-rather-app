import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as types from './types';
import { users, questions } from '../utils/_DATA';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('actions creators', () => {
  it('fetchUsers', () => {
    const expectedActions = [{ type: types.RECEIVE_USERS, payload: users }];
    const store = mockStore({ users: null });

    return store.dispatch(actions.fetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('signIn', () => {
    const userId = 'userId';
    const expectedAction = { type: types.SIGN_IN, payload: userId };

    expect(actions.signIn(userId)).toEqual(expectedAction);
  });

  it('logout', () => {
    const expectedAction = { type: types.LOG_OUT, payload: '' };

    expect(actions.logout()).toEqual(expectedAction);
  });

  it('setRedirectUrl', () => {
    const redirectUrl = 'redirectUrl';
    const expectedAction = {
      type: types.SET_REDIRECT_URL,
      payload: redirectUrl,
    };

    expect(actions.setRedirectUrl(redirectUrl)).toEqual(expectedAction);
  });

  it('fetchQuestions', () => {
    const expectedActions = [
      { type: types.RECEIVE_QUESTIONS, payload: questions },
    ];
    const store = mockStore({ questions: null });

    return store.dispatch(actions.fetchQuestions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('saveQuestionAnswer', () => {
    const authedUser = users.sarahedo.id;
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionOne';

    const expectedActions = [
      { type: types.SAVE_PROGRESS_STARTED },
      {
        type: types.SAVE_QUESTION_ANSWER_USERS,
        payload: { authedUser, qid, answer },
      },
      {
        type: types.SAVE_QUESTION_ANSWER_QUESTIONS,
        payload: { authedUser, qid, answer },
      },
      { type: types.SAVE_PROGRESS_FINISHED },
    ];
    const store = mockStore({ users: null, questions: null });

    return store
      .dispatch(actions.saveQuestionAnswer({ authedUser, qid, answer }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('saveQuestion', () => {
    const question = questions['8xf0y6ziyjabvozdd253nd'];
    const history = { push: () => {} };
    const expectedActions = [
      { type: types.SAVE_PROGRESS_STARTED },
      { type: types.SAVE_PROGRESS_FINISHED },
    ];
    const store = mockStore({ users: null, questions: null });

    return store.dispatch(actions.saveQuestion(question, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
