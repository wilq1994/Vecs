import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal";

const initialModal = {
  visible: false,
  title: null,
  content: null,
  closeButton: null,
  cancelButton: null,
  buttonValue: null,
  buttonAction: null
};

export default (state = initialModal, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      
    case OPEN_MODAL:
      
    default:
      return state;
  }
};