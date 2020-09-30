import reducer from './saveInProgress';
import {
  SAVE_PROGRESS_FINISHED,
  SAVE_PROGRESS_STARTED,
} from '../actions/types';

describe('saveInProgress reducer', () => {
  const INITIAL_STATE = false;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle SAVE_PROGRESS_STARTED', () => {
    const currentState = false;
    expect(
      reducer(currentState, {
        type: SAVE_PROGRESS_STARTED,
      })
    ).toEqual(true);
  });

  it('should handle SAVE_PROGRESS_FINISHED', () => {
    const currentState = true;
    expect(
      reducer(currentState, {
        type: SAVE_PROGRESS_FINISHED,
      })
    ).toEqual(false);
  });
});
