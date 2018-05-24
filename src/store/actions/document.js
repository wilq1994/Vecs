export const SET_DOCUMENT_NAME = 'SET_DOCUMENT_NAME';
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const SET_DOCUMENT_DIMENSIONS = 'SET_DOCUMENT_DIMENSIONS';


export function setDocumentName(name) {
  return {
    type: SET_DOCUMENT_NAME,
    name
  }
}

export function createDocument(){
  return {
    type: CREATE_DOCUMENT
  }
}

export function setDocumentDimensions(width, height) {
  return {
    type: SET_DOCUMENT_DIMENSIONS,
    width,
    height
  }
}