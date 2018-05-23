import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NewRoom from './views/NewRoom';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';

const isAuthenticated = true;

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={ NewRoom }/>
      <Route
        path="/:room"
        render={
          props => isAuthenticated ?
                  <Room {...props} /> :
                  <JoinRoom {...props} />
        }
      />
    </Switch>
  </Router>,
  document.getElementById('root')
);