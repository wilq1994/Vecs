import {
  ROOM_CREATED,
  SET_ROOM_NAME
} from '../actions/room';

const initialRoom = {
  id: window.__INITIAL_STATE__.roomId ? window.__INITIAL_STATE__.roomId : null,
  url: window.__INITIAL_STATE__.roomUrl ? window.__INITIAL_STATE__.roomUrl : null,
  name: window.__INITIAL_STATE__.roomName ? window.__INITIAL_STATE__.roomName : null,
  init: window.__INITIAL_STATE__.newRoom ? false : null
}

export default (state = initialRoom, action) => {
  switch (action.type) {
    case ROOM_CREATED:
      return Object.assign({}, state, action.room, { init: true });
      
    case SET_ROOM_NAME:
      if(!/\w/.test(action.name)) return state;
      return Object.assign({}, state, { name: action.name });
      
    default:
      return state;
  }
}