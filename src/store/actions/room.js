export const CREATE_ROOM = 'CREATE_ROOM';
export const ROOM_CREATED = 'ROOM_CREATED';
export const SET_ROOM_NAME = 'SET_ROOM_NAME';


export function createRoom(name){
  return {
    type: CREATE_ROOM,
    name
  }
}

export function roomCreated(room){
  return {
    type: ROOM_CREATED,
    room
  }
}

export function setRoomName(name){
  return {
    type: SET_ROOM_NAME,
    name
  }
}