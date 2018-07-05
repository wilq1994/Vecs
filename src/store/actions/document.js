export const SET_DOCUMENT_DIMENSIONS = 'SET_DOCUMENT_DIMENSIONS';
export const NEW_DOCUMENT = 'NEW_DOCUMENT';
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT';
export const SET_DOCUMENT_BACKGROUND = 'SET_DOCUMENT_BACKGROUND';
export const SET_DOCUMENT_MINIFICATION = 'SET_DOCUMENT_MINIFICATION';
export const SET_DOCUMENT_DESTINATION = 'SET_DOCUMENT_DESTINATION';

// Destinations
export const LOCAL_DISK = 'LOCAL_DISK';
export const GOOGLE_DRIVE = 'GOOGLE_DRIVE';


export function setDocumentDimensions(width, height) {
  return {
    type: SET_DOCUMENT_DIMENSIONS,
    width,
    height
  }
}

export function newDocument(width, height) {
  return {
    type: NEW_DOCUMENT,
    width,
    height
  }
}

export function loadDocument(document) {
  return {
    type: LOAD_DOCUMENT,
    document
  }
}

export function setDocumentBackground(background) {
  return {
    type: SET_DOCUMENT_BACKGROUND,
    background
  }
}

export function setDocumentMinification(minification) {
  return {
    type: SET_DOCUMENT_MINIFICATION,
    minification
  }
}

export function setDocumentDestination(destination){
  return {
    type: SET_DOCUMENT_DESTINATION,
    destination
  }
}