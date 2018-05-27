import { ADD_ELEMENT, DELETE_ELEMENT, SELECT_ELEMENT, SET_ELEMENT_ORDER, SET_ELEMENT_VISIBILITY, SET_ELEMENTS_VISIBILITY, SET_ELEMENT_STYLE, SET_ELEMENT_ATTRIBUTES, SET_ELEMENT_DRAGGING } from "../actions/elements";

// Test
const initialElements = {
  currentId: 1,
  selectedElementId: null,
  elementsVisible: true,
  list:[
    {
      id: 0,
      type: 'image',
      attrs: {
        width: 100,
        height: 100
      },
      style: {},
      selected: 3,
      visible: true,
      dragging: false
    },
    {
      id: 1,
      type: 'rect',
      attrs: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      },
      style: {
        fill: '#ff0000',
        stroke: null
      },
      selected: false,
      visible: true,
      dragging: false
    },
    {
      id: 2,
      type: 'circle',
      attrs: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      },
      style: {
        fill: '#ff0000',
        stroke: null
      },
      selected: false,
      visible: true,
      dragging: false
    }
  ]
};

export default (state = initialElements, action) => {
  switch (action.type) {
    case ADD_ELEMENT:
      return Object.assign({}, state, {
                currentId: state.currentId + 1,
                list: [...state.list, Object.assign({}, action.element, { id: state.currentId + 1, selected: false, visible: true, dragging: false })]
              });
    
    case DELETE_ELEMENT:
      return Object.assign({}, state, { 
                list: state.list.filter(item => item.id !== action.elementId)
              });

    case SELECT_ELEMENT:
      let selectedElementId = state.selectedElementId;
      if(!action.userId){
        selectedElementId = (selectedElementId === action.elementId) ? null : action.elementId; 
      }
      return Object.assign({}, state, { 
                selectedElementId: selectedElementId,
                list: state.list.map(item => {
                  if(item.id == action.elementId) {
                    let selected = item.selected;
                    if(!selected) {
                      selected = action.userId ? action.userId : true;
                    } else {
                      selected = false;
                    }
                    item.selected = selected;
                  }
                  return item;
                })
              });

    case SET_ELEMENT_ORDER:
      let element = null;
      const elements = state.list.filter(item => {
        if(item.id === action.elementId) element = item;
        return item.id !== action.elementId;
      });
      elements.splice(action.position, 0, element);
      return Object.assign({}, state, { 
                list: elements
              });

    case SET_ELEMENT_VISIBILITY:
      return Object.assign({}, state, { 
                list: state.list.map(item => {
                  if(item.id === action.elementId) {
                    item.visible = action.visible;
                  }
                  return item;
                })
              });

    case SET_ELEMENT_ATTRIBUTES:
      return Object.assign({}, state, { 
                list: state.list.map(item => {
                  if(item.id === action.elementId) {
                    item.attrs = Object.assign({}, item.attrs, action.attrs);
                  }
                  return item;
                })
              });

    case SET_ELEMENT_STYLE:
      return Object.assign({}, state, { 
                list: state.list.map(item => {
                  if(item.id === action.elementId) {
                    item.style = Object.assign({}, item.style, action.style);
                  }
                  return item;
                })
              });

    case SET_ELEMENT_DRAGGING:
      return Object.assign({}, state, { 
                list: state.list.map(item => {
                  if(item.id === action.elementId) {
                    item.dragging = action.dragging
                  }
                  return item;
                })
              });

    case SET_ELEMENTS_VISIBILITY:
      return Object.assign({}, state, {
                elementsVisible: !state.elementsVisible,
                list: state.list.map(item => {
                  item.visible = action.visible;
                  return item;
                })
              });

    default:
      return state;
  }
};