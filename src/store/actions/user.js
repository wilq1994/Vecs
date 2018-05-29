export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';


export function authenticateUser(roomId, user) {
  return {
    type: AUTHENTICATE_USER,
    roomId,
    user
  }
}

export function userAuthenticated(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  }
}