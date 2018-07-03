export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const SET_DESTINATION = 'SET_DESTINATION';

// Destinations
export const LOCAL_DISK = 'LOCAL_DISK';
export const GOOGLE_DRIVE = 'GOOGLE_DRIVE';


export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function openModal(modal) {
  return {
    type: OPEN_MODAL,
    modal
  }
}

export function setDestination(destination){
  return {
    type: SET_DESTINATION,
    destination
  }
}