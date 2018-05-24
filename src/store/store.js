import { createStore } from 'redux';

const initialState  = {
  user: {
    name: 'wilq',
    hue: 15,
    active: true,
    isAuthenticated: true
  },
  users: [
    {
      name: 'Vlad',
      hue: 160,
      active: true
    }
  ]
}

function App(state = initialState, action) {
  return state;
}


export default createStore(App, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());