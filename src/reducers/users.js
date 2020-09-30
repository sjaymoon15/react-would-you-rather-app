import { RECEIVE_USERS, SAVE_QUESTION_ANSWER_USERS } from '../actions/types';

const users = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.payload;
    case SAVE_QUESTION_ANSWER_USERS:
      const { authedUser, qid, answer } = action.payload;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
};

export default users;
