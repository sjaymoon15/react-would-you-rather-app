import { SAVE_ANSWER_FINISHED, SAVE_ANSWER_STARTED } from '../actions';

const saveInProgress = (state = false, action) => {
  switch (action.type) {
    case SAVE_ANSWER_STARTED:
      return true;
    case SAVE_ANSWER_FINISHED:
      return false;
    default:
      return state;
  }
};

export default saveInProgress;
