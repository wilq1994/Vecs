export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const SET_ELEMENT_ORDER = 'SET_ELEMENT_ORDER';
export const SET_ELEMENT_VISIBILITY = 'SET_ELEMENT_VISIBILITY';
export const SET_ELEMENT_ATTRIBUTES = 'SET_ELEMENT_ATTRIBUTES';
export const SET_ELEMENT_STYLE = 'SET_ELEMENT_STYLE';
export const SET_ELEMENTS_VISIBILITY = 'SET_ELEMENTS_VISIBILITY';
export const SET_ELEMENT_DRAGGING = 'SET_ELEMENT_DRAGGING';


export function addElement(element) {
  return {
    type: ADD_ELEMENT,
    element
  }
}

export function deleteElement(elementId) {
  return {
    type: DELETE_ELEMENT,
    elementId
  }
}

export function selectElement(elementId, userId) {
  return {
    type: SELECT_ELEMENT,
    elementId,
    userId
  }
}

export function setElementOrder(elementId, position) {
  return {
    type: SET_ELEMENT_ORDER,
    elementId,
    position
  }
}

export function setElementVisibility(elementId, visible) {
  return {
    type: SET_ELEMENT_VISIBILITY,
    elementId,
    visible
  }
}

export function setElementAttributes(elementId, attrs) {
  return {
    type: SET_ELEMENT_ATTRIBUTES,
    elementId,
    attrs
  }
}

export function setElementStyle(elementId, style) {
  return {
    type: SET_ELEMENT_STYLE,
    elementId,
    style
  }
}

export function setElementDragging(elementId, dragging) {
  return {
    type: SET_ELEMENT_DRAGGING,
    elementId,
    dragging
  }
}

export function setElementsVisibility(visible) {
  return {
    type: SET_ELEMENTS_VISIBILITY,
    visible
  }
}