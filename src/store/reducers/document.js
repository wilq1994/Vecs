import { CREATE_DOCUMENT, LOAD_FILE, NEW_FILE, SAVE_AS_PNG, SAVE_AS_SVG, SAVE_TO_CLOUD, SET_DOCUMENT_DIMENSIONS, SET_DOCUMENT_NAME } from '../actions/document';

const initialDocument = {
  name: null,
  width: null,
  height: null
};

export default (state = initialDocument, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT:
      return state;
      
    case SET_DOCUMENT_NAME:
      if(!/\w/.test(action.name)) return state;
      return Object.assign({}, state, { name: action.name });
      
    case SET_DOCUMENT_DIMENSIONS:
    case NEW_FILE:
      return Object.assign({}, state, { width: action.width, height: action.height });
      
    case LOAD_FILE:
      
    case SAVE_AS_PNG:
      
    case SAVE_AS_SVG:
      
    case SAVE_TO_CLOUD:
      
    default:
      return state;
  }
};