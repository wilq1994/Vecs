import { CHANGE_MEMBER_ACTIVITY, JOIN_MEMBER, LEAVE_MEMBER } from "../actions/members";

export default (state = [], action) => {
  switch (action.type) {
    case JOIN_MEMBER:
      if(!action.member) return state;
      return [...state, Object.assign({}, action.member, { active: true })];

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