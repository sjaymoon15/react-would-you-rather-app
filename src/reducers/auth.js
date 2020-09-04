import { SIGN_IN, AUTH_ERROR, LOG_OUT } from '../actions';

const INITIAL_STATE = {
  authedUser: '',
  errorMessage: '',
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, authedUser: action.payload };
    case LOG_OUT:
      return { ...state, authedUser: '' };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
