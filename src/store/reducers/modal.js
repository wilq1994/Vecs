import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal";

const initialModal = {
  visible: false,
  title: null,
  content: null,
  closeButton: null,
  cancelButton: null,
  confirmButton: null,
  buttonAction: null
};

export default (state = initialModal, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return initialModal;  

    case OPEN_MODAL:
      if(!action.modal) return state;
      return Object.assign({}, state, action.modal);
    
    default:
      return state;
  }
};