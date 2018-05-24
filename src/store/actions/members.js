export const JOIN_MEMBER = 'JOIN_MEMBER';
export const CHANGE_MEMBER_ACTIVITY = 'CHANGE_MEMBER_ACTIVITY';


export function joinMember(member) {
  return {
    type: JOIN_MEMBER,
    member: {
      name: member.name,
      hue: member.hue,
      active: true
    }
  }
}

export function changeMemberActivity(id, active) {
  return {
    type: CHANGE_MEMBER_ACTIVITY,
    id,
    active
  }
}