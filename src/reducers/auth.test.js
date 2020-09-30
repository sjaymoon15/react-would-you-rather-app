import reducer, { INITIAL_STATE } from './auth';
import {
  SIGN_IN,
  AUTH_ERROR,
  LOG_OUT,
  SET_REDIRECT_URL,
} from '../actions/types';

describe('auth reducer', () => {
  const authedUser = 'authedUser';
  const errorMessage = 'errorMessage';
  const redirectUrl = 'redirectUrl';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle SIGN_IN', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SIGN_IN,
        payload: authedUser,
      })
    ).toEqual({ ...INITIAL_STATE, authedUser });
  });

  it('should handle LOG_OUT', () => {
    const currentState = { ...INITIAL_STATE, authedUser };
    expect(
      reducer(currentState, {
        type: LOG_OUT,
      })
    ).toEqual(INITIAL_STATE);
  });

  it('should handle AUTH_ERROR', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: AUTH_ERROR,
        payload: errorMessage,
      })
    ).toEqual({ ...INITIAL_STATE, errorMessage });
  });

  it('should handle SET_REDIRECT_URL', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_REDIRECT_URL,
        payload: redirectUrl,
      })
    ).toEqual({ ...INITIAL_STATE, redirectUrl });
  });
});
