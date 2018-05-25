export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const CHANGE_USER_ACTIVITY = 'CHANGE_USER_ACTIVITY';


export function authenticateUser(name, hue) {
  return {
    type: AUTHENTICATE_USER,
    user: {
      name,
      hue
    }
  }
}

export function changeUserActivity(active) {
  return {
    type: CHANGE_USER_ACTIVITY,
    active
  }
}