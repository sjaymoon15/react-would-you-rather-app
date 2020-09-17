import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER_QUESTIONS } from '../actions';

const questions = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.payload;
    case SAVE_QUESTION_ANSWER_QUESTIONS:
      const { authedUser, qid, answer } = action.payload;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    default:
      return state;
  }
};

export default questions;
