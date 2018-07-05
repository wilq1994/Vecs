export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';


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