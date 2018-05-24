import { createStore } from 'redux';

const initialState  = {
  document: {
    name: 'Siusiaki',
    width: 500,
    height: 500
  },
  user: {
    name: 'wilq',
    hue: 15,
    active: true,
    isAuthenticated: true
  },
  members: [
    {
      name: 'Vlad',
      hue: 160,
      active: true
    },
    {
      name: 'Michał',
      hue: 40,
      active: false
    },
    {
      name: 'Tomasz',
      hue: 80,
      active: false
    }
  ],
  modal: {
    visible: false,
    title: null,
    content: null,
    closeButton: true,
    cancelButton: true,
    buttonValue: null,
    buttonAction: null
  }
}

function App(state = initialState, action) {
  return state;
}


export default createStore(App, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());