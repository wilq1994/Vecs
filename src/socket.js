import io from 'socket.io-client';

export const socket = io();

export function emit(action){
  socket.emit('action', action);
}

export function broadcast(userId, action){
  socket.emit('broadcast_action', { userId, action });
}