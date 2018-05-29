import { AUTHENTICATE_USER, USER_AUTHENTICATED } from "../actions/user";

const initialUser = {
  id: null,
  name: null,
  hue: null,
  speak: false,
  isAuthenticated: false
};

// // Test
// const initialUser = {
//   id: 2,
//   name: 'Bartosz',
//   hue: 180,
//   speak: true,
//   isAuthenticated: false
// };

export default (state = initialUser, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
    if(!action.user) return state;
      return state;
      
    case USER_AUTHENTICATED:
    if(!action.user) return state;
      return Object.assign({}, state, action.user, { speak: false, isAuthenticated: true });
      
    default:
      return state;
  }
};