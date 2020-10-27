import reducer from './questions';
import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER_QUESTIONS,
} from '../actions/types';
import { questions, authedUser, qid } from '../utils/_DATA';

describe('questions reducer', () => {
  const INITIAL_STATE = null;
  const answer = 'optionOne';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle RECEIVE_QUESTIONS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: RECEIVE_QUESTIONS,
        payload: questions,
      })
    ).toEqual(questions);
  });

  it('should handle SAVE_QUESTION_ANSWER_QUESTIONS', () => {
    const currentState = questions;
    expect(
      reducer(currentState, {
        type: SAVE_QUESTION_ANSWER_QUESTIONS,
        payload: { authedUser, qid, answer },
      })
    ).toEqual({
      ...currentState,
      [qid]: {
        ...currentState[qid],
        [answer]: {
          ...currentState[qid][answer],
          votes: currentState[qid][answer].votes.concat([authedUser]),
        },
      },
    });
  });
});
