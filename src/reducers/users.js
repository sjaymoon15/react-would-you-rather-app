import { RECEIVE_USERS } from '../actions';

const users = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
