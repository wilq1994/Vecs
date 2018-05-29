import { CHANGE_MEMBER_ACTIVITY, JOIN_MEMBER, LEAVE_MEMBER } from "../actions/members";

// Test
const initialMembers = [
  {
    id: 3,
    name: 'Vlad',
    hue: 20,
    active: true,
    speak: true
  },
  {
    id: 5,
    name: 'Tomasz',
    hue: 80,
    active: false,
    speak: false
  }
];

export default (state = [], action) => {
  switch (action.type) {
    case JOIN_MEMBER:
      if(!action.member) return state;
      console.log(action.member);
      return [...state, Object.assign({}, action.member, { speak: false, active: true })];

    case CHANGE_MEMBER_ACTIVITY:
      if(!action.id) return state;
      return state.map(item =>
                (item.id === action.id ) ? 
                  Object.assign({}, item, { active: action.active}) 
                : item
              );

    case LEAVE_MEMBER:
      if(!action.id) return state;
      return state.filter(item =>
                item.id !== action.id
              );

    default:
      return state;
  }
};