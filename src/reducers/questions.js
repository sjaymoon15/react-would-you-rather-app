import { RECEIVE_QUESTIONS } from '../actions';

const questions = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.payload;
    default:
      return state;
  }
};

export default questions;
