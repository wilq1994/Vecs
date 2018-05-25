import { AUTHENTICATE_USER, CHANGE_USER_ACTIVITY } from "../actions/user";

const initialUser = {
  name: null,
  hue: null,
  active: true,
  isAuthenticated: false
};

export default (state = initialUser, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      
    case CHANGE_USER_ACTIVITY:
      
    default:
      return state;
  }
};