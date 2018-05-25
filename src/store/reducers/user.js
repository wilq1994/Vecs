import { AUTHENTICATE_USER, USER_AUTHENTICATED } from "../actions/user";

const initialUser = {
  id: null,
  name: null,
  hue: null,
  isAuthenticated: false
};

export default (state = initialUser, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
    if(!action.user) return state;
      return state;
      
    case USER_AUTHENTICATED:
    if(!action.user) return state;
      return Object.assign({}, state, action.user, { isAuthenticated: true });
      
    default:
      return state;
  }
};