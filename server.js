const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuidv1 = require('uuid/v1');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const { Buffer } = require('buffer');
const stream = require('stream');
const { google } = require('googleapis');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);


let oAuth2Client;
let googleAuthUrl = null;
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content));
});

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const scopes = ['https://www.googleapis.com/auth/drive'];
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  googleAuthUrl = url;
}


if(webpackConfig.mode === 'development'){
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/', (req, res) => { 
  return res.render('index', { state: JSON.stringify({ googleAuthUrl, new: true }) });
});
app.get('/google_auth_callback', (req, res) => {
  return res.render('googleAuthCallback', { code: req.query.code });
});
app.get('/room', (req, res) => { 
  return res.render('index', { state: JSON.stringify({ documentId: 1, documentUrl: 'room', documentName: 'test', googleAuthUrl }) }) 
});
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
      
      case 'SAVE_TO_CLOUD':
        oAuth2Client.getToken(action.token.replace('&#x2F;', '/')).then(({tokens}) => {
          oAuth2Client.setCredentials(tokens);
          const drive = google.drive({
            version: 'v3',
            auth: oAuth2Client
          });

          var image = 'iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4Xu3dC7SsZ10e8OednYTEHCBF5SIGUAgXrUItyNWSIC3WpUWwRIoWzdnbxhYUV6tV8ELwQmhZrYpFpTk7VFtsjTfKWi6sBRNBQC7aYhUvBBSCQhQlhiTEcPZ8XbNzIGdfzjn77LO/b/7zzW/WOuuwkpn3/b+/51t5mNl7ZlrcCBAgQIAAgYUXaAt/AgcgQIAAAQIEotBdBAQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBT6CEJ0BAIECBAgoNBdAwQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBT6CEJ0BAIECBAgoNBdAwQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBT6CEJ0BAIECBAgoNBdAwQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBT6CEJ0BAIECBAgoNBdAwQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBT6CEJ0BAIECBAgoNBdAwQIECBAYAQCCn0EIToCAQIECBBQ6K4BAgQIECAwAgGFPoIQHYEAAQIECCh01wABAgQIEBiBgEIfQYiOQIAAAQIEFLprgAABAgQIjEBAoY8gREcgQIAAAQIK3TVAgAABAgRGIKDQRxCiIxAgQIAAAYXuGiBAgAABAiMQUOgjCNERCBAgQICAQncNECBAgACBEQgo9BGE6AgECBAgQEChuwYIECBAgMAIBBR6gRAvfvm1F2eaiwuMYgQCiyEwyXXXfecl1y3GsKYkMIyAQh/G+aS7XPzvrr0iLS8uMIoRCCyGQJeXXPddl1yxGMOaksAwAgp9GGeFXsDZCCMSUOgjCtNRDkpAoR+U5Bms4xn6GeB56HIKKPTlzN2pTyqg0AtcIAq9QAhGWCwBhb5YeZl2EAGFPgjzyTfZrdBvuvD83HThoQLTGYHAfAUuuOHWXHDDLVuHUOjzDcXuJQUUeoFYdiv0P33CffOnT7xPgemMQGC+Ag9660fyoLfcqNDnG4PdF0BAoRcISaEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgMVkxAoRcIRKEXCMEIZQUUetloDFZMQKEXCEShFwjBCGUFFHrZaAxWTEChFwhEoRcIwQhlBRR62WgM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';
          var buffer = new Buffer(image, 'base64');
          let readStream = new stream.PassThrough();
          readStream.end(buffer);

          var fileMetadata = {
            'name': 'vecs.png'
          };
          var media = {
            mimeType: 'image/png',
            body: readStream
          };
          drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err, file) {
            if (err) {
              console.error(err);
            } else {
              console.log('File Id: ', file.data.id);
            }
          });
        });
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