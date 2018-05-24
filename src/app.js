import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store/store';

import NewRoom from './views/NewRoom';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ NewRoom }/>
        <Route
          path="/:room"
          render={
            props => store.getState().user.isAuthenticated ?
                    <Room {...props} /> :
                    <JoinRoom {...props} />
          }
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);