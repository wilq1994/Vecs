import { DOCUMENT_CREATED, LOAD_FILE, NEW_FILE, SAVE_AS_PNG, SAVE_AS_SVG, SAVE_TO_CLOUD, SET_DOCUMENT_DIMENSIONS, SET_DOCUMENT_NAME } from '../actions/document';

const initialDocument = {
  id: window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.documentId : null,
  url: window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.documentUrl : null,
  name: window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.documentName : null,
  width: 500,
  height: 500,
  tempWidth: 500,
  tempHeight: 500,
  init: !window.__INITIAL_STATE__ ? false : null
};

export default (state = initialDocument, action) => {
  switch (action.type) {
    case DOCUMENT_CREATED:
      return Object.assign({}, state, action.document, { init: true });
      
    case SET_DOCUMENT_NAME:
      if(!/\w/.test(action.name)) return state;
      return Object.assign({}, state, { name: action.name });
      
    case SET_DOCUMENT_DIMENSIONS:
      return Object.assign({}, state, { tempWidth: action.width, tempHeight: action.height });

    case NEW_FILE:
      return Object.assign({}, state, { width: state.tempWidth, height: state.tempHeight });
      
    case LOAD_FILE:
      
    case SAVE_AS_PNG:
      
    case SAVE_AS_SVG:
      
    case SAVE_TO_CLOUD:
      
    default:
      return state;
  }
};