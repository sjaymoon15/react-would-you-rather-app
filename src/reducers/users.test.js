import reducer from './users';
import { RECEIVE_USERS, SAVE_QUESTION_ANSWER_USERS } from '../actions/types';
import { users } from '../utils/_DATA';

describe('users reducer', () => {
  const INITIAL_STATE = null;
  const authedUser = 'sarahedo';
  const qid = 'vthrdm985a262al8qx3do';
  const answer = 'optionOne';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle RECEIVE_USERS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: RECEIVE_USERS,
        payload: users,
      })
    ).toEqual(users);
  });

  it('should handle SAVE_QUESTION_ANSWER_USERS', () => {
    const currentState = users;
    expect(
      reducer(currentState, {
        type: SAVE_QUESTION_ANSWER_USERS,
        payload: { authedUser, qid, answer },
      })
    ).toEqual({
      ...currentState,
      [authedUser]: {
        ...currentState[authedUser],
        answers: {
          ...currentState[authedUser].answers,
          [qid]: answer,
        },
      },
    });
  });
});
