import { CHANGE_MEMBER_ACTIVITY, JOIN_MEMBER, LEAVE_MEMBER } from "../actions/members";

const memeber = {
  name: 'Vlad',
  hue: 160,
  active: true
};

export default (state = [], action) => {
  switch (action.type) {
    case JOIN_MEMBER:

    case CHANGE_MEMBER_ACTIVITY:

    case LEAVE_MEMBER:

    default:
      return state;
  }
};