import { SET_TOOL, SET_FILL, SET_STROKE } from "../actions/toolbar";

const initialToolbar = {
  tool: 'select',
  fill: null,
  stroke: null
};

export default (state = initialToolbar, action) => {
  switch (action.type) {
    case SET_TOOL:
      return Object.assign({}, state, { tool: action.tool });

    case SET_FILL:
      return Object.assign({}, state, { fill: action.fill });

    case SET_STROKE:
      return Object.assign({}, state, { stroke: action.stroke });

    default:
      return state;
  }
};