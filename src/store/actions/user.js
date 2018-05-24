export const AUTHENTICATE = 'AUTHENTICATE';
export const CHANGE_ACTIVITY = 'CHANGE_ACTIVITY';


export function authenticateUser(name, hue) {
  return {
    type: AUTHENTICATE,
    user: {
      name,
      hue
    }
  }
}

export function changeUserActivity(active) {
  return {
    type: CHANGE_ACTIVITY,
    active
  }
}