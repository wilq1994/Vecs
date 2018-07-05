import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from './socket';

import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import store from './store/store';
import { setGoogleToken } from './store/actions/document';

import NewRoom from './views/NewRoom';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';


socket.on('action', (action) => {
  store.dispatch(action);
})

window.googleAuthCallback = function(message){
  store.dispatch(setGoogleToken(message));
}

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
        <Route path="/new" component={ JoinRoom } />
        <Route path="/:room" render={ withRouter(connect(mapStateToProps)(RoomRoute)) } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);