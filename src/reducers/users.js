import { RECEIVE_USERS } from '../actions';

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
