import { CREATE_DOCUMENT, LOAD_FILE, NEW_FILE, SAVE_AS_PNG, SAVE_AS_SVG, SAVE_TO_CLOUD, SET_DOCUMENT_DIMENSIONS, SET_DOCUMENT_NAME } from '../actions/document';

const initialDocument = {
  name: null,
  width: null,
  height: null
};

export default (state = initialDocument, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT:
      
    case SET_DOCUMENT_NAME:
      
    case SET_DOCUMENT_DIMENSIONS:
      
    case NEW_FILE:
      
    case LOAD_FILE:
      
    case SAVE_AS_PNG:
      
    case SAVE_AS_SVG:
      
    case SAVE_TO_CLOUD:
      
    default:
      return state;
  }
};