const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuidv1 = require('uuid/v1');
const mustacheExpress = require('mustache-express');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);


if(webpackConfig.mode === 'development'){
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index', { state: null }))
app.get('/:room', (req, res) => {
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i] && req.params.room === rooms[i].url) {
      return res.render('index', { state: JSON.stringify({ documentId: rooms[i].id, documentUrl: rooms[i].url, documentName: rooms[i].name }) })
    }
  }
  return res.redirect('/');
})
server.listen(3000, () => console.log('Example app listening on port 3000!'));


let nextRoomId = 0;
let nextUserId = 0;
let rooms = [];
let users = [];

io.on('connection', socket => {
  const userId = nextUserId;
  users.push({
    id: userId,
    login: null,
    hue: null,
    room: null,
    socket
  });
  nextUserId++;
  
  socket.on('action', (action) => {
    switch(action.type){
      case 'CREATE_DOCUMENT':
        rooms.push({
          id: nextRoomId,
          url: uuidv1(),
          name: action.name,
          users: [userId]
        });

        updateUser(userId, null, null, nextRoomId);

        socket.emit('action', {
          type: 'DOCUMENT_CREATED',
          document: {
            id: rooms[nextRoomId].id,
            url: rooms[nextRoomId].url
          }
        });

        nextRoomId++;
        break;
      case 'AUTHENTICATE_USER':
        socket.emit('action', {
          type: 'USER_AUTHENTICATED',
          user: Object.assign({}, action.user, { id: userId })
        });
        
        if(action.roomId !== null){
          updateUser(userId, action.user.login, action.user.hue, action.roomId);
          rooms.map(room => {
            if(room && room.id === action.roomId){
              room.users.map(id => {
                users[id].socket.emit('action', {
                  type: 'JOIN_MEMBER',
                  member: {
                    id: userId,
                    login: action.user.login,
                    hue: action.user.hue
                  }
                });
                
                users[userId].socket.emit('action', {
                  type: 'JOIN_MEMBER',
                  member: {
                    id: id,
                    login: users[id].login,
                    hue: users[id].hue
                  }
                });
              })
              room.users.push(userId);
            }
            return room;
          })
        }else{
          updateUser(userId, action.user.login, action.user.hue, null);
        }
        break;
    }
  });
  
  socket.on('broadcast_action', (msg) => {
    users.map(user => {
      if(user && user.id !== msg.userId) {
        user.socket.emit('action', msg.action);
      }
    })
  });

  socket.on('disconnect', () => {
    users = users.map(user => {
      if(user && user.id === userId && user.room !== null && rooms[user.room] !== null){
        rooms[user.room].users = rooms[user.room].users.filter(id => {
          if(id == userId) {
            return false;
          }else if(users[id]){
            users[id].socket.emit('action', {
              type: 'LEAVE_MEMBER',
              id: userId
            })
          }
          return true;
        })
        if(rooms[user.room].users.length === 0) rooms[user.room] = null;
        return null;
      }
      return user;
    });
  })
});

function updateUser(id, login, hue, room){
  users.map(user => {
    if(user && user.id === id){
      user.login = login;
      user.hue = hue;
      user.room = (room !== null) ? room : user.room;
    }
    return user;
  })
}