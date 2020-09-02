import { SIGN_IN, AUTH_ERROR } from '../actions';

const INITIAL_STATE = {
  authedUser: '',
  errorMessage: '',
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, authedUser: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
