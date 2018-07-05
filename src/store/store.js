import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import document from './reducers/document';
import members from './reducers/members';
import user from './reducers/user';
import modal from './reducers/modal';
import toolbar from './reducers/toolbar';
import elements from './reducers/elements';

const reducers = {
  document,
  members,
  user,
  modal,
  toolbar,
  elements
}

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());