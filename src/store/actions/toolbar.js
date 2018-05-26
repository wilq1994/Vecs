export const SET_TOOL = 'SET_TOOL';
export const SET_FILL = 'SET_FILL';
export const SET_STROKE = 'SET_STROKE';

export function setTool(tool) {
  return {
    type: SET_TOOL,
    tool
  }
}

export function setFill(fill) {
  return {
    type: SET_FILL,
    fill
  }
}

export function setStroke(stroke) {
  return {
    type: SET_STROKE,
    stroke
  }
}