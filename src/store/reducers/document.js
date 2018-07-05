import {
  SET_DOCUMENT_DIMENSIONS,
  NEW_DOCUMENT,
  LOAD_DOCUMENT,
  SET_DOCUMENT_BACKGROUND,
  SET_DOCUMENT_MINIFICATION,
  SET_DOCUMENT_DESTINATION, 
  LOCAL_DISK
} from '../actions/document';

const initialDocument = {
  width: null,
  height: null,
  background: null,
  minification: false,
  destination: LOCAL_DISK
};

export default (state = initialDocument, action) => {
  switch (action.type) {            
    case NEW_DOCUMENT:
    case SET_DOCUMENT_DIMENSIONS:
      return Object.assign({}, state, { width: action.width, height: action.height });
      
    case LOAD_DOCUMENT:
    
    case SET_DOCUMENT_BACKGROUND:
      return Object.assign({}, state, { background: action.background });
      
    case SET_DOCUMENT_MINIFICATION:
      return Object.assign({}, state, { minification: action.minification });
      
    case SET_DOCUMENT_DESTINATION:
      return Object.assign({}, state, { destination: action.destination });
      
    default:
      return state;
  }
};