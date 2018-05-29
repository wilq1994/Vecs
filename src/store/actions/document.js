export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const DOCUMENT_CREATED = 'DOCUMENT_CREATED';
export const SET_DOCUMENT_NAME = 'SET_DOCUMENT_NAME';
export const SET_DOCUMENT_DIMENSIONS = 'SET_DOCUMENT_DIMENSIONS';
export const NEW_FILE = 'NEW_FILE';
export const LOAD_FILE = 'LOAD_FILE';
export const SAVE_AS_PNG = 'SAVE_AS_PNG';
export const SAVE_AS_SVG = 'SAVE_AS_SVG';
export const SAVE_TO_CLOUD = 'SAVE_TO_CLOUD';


export function createDocument(name){
  return {
    type: CREATE_DOCUMENT,
    name
  }
}

export function documentCreated(document){
  return {
    type: DOCUMENT_CREATED,
    document
  }
}

export function setDocumentName(name) {
  return {
    type: SET_DOCUMENT_NAME,
    name
  }
}

export function setDocumentDimensions(width, height) {
  return {
    type: SET_DOCUMENT_DIMENSIONS,
    width,
    height
  }
}

export function newFile(width, height) {
  return {
    type: NEW_FILE,
    width,
    height
  }
}

export function loadFile(file) {
  return {
    type: LOAD_FILE,
    file
  }
}

export function saveAsPNG(background){
  return {
    type: SAVE_AS_PNG,
    background
  }
}

export function saveAsSVG(minification, seperateStyles){
  return {
    type: SAVE_AS_SVG,
    minification,
    seperateStyles
  }
}

export function saveToCloud(){
  return {
    type: SAVE_TO_CLOUD
  }
}