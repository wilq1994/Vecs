export const JOIN_MEMBER = 'JOIN_MEMBER';
export const CHANGE_MEMBER_ACTIVITY = 'CHANGE_MEMBER_ACTIVITY';
export const LEAVE_MEMBER = 'LEAVE_MEMBER';


export function joinMember(member) {
  return {
    type: JOIN_MEMBER,
    member
  }
}

export function changeMemberActivity(id, active) {
  return {
    type: CHANGE_MEMBER_ACTIVITY,
    id,
    active
  }
}

export function leaveMember(id) {
  return {
    type: LEAVE_MEMBER,
    id
  }
}