import {
  SAVE_PROGRESS_FINISHED,
  SAVE_PROGRESS_STARTED,
} from '../actions/types';

const saveInProgress = (state = false, action) => {
  switch (action.type) {
    case SAVE_PROGRESS_STARTED:
      return true;
    case SAVE_PROGRESS_FINISHED:
      return false;
    default:
      return state;
  }
};

export default saveInProgress;
