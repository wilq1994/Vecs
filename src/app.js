import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import store from './store/store';

import NewRoom from './views/NewRoom';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';


const RoomRoute = props => {
  if(props.isAuthenticated) {
    return <Room {...props} />
  } else {
    return <JoinRoom {...props} />
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={NewRoom} />
        <Route path="/:room" render={ withRouter(connect(mapStateToProps)(RoomRoute)) } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);