const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 3000;

let rooms = {};

io.on('connection', (socket)=>{
  let currentRoom;
  socket.on('join-room', (user)=>{
    currentRoom = user.room;
    socket.join(currentRoom);
    if(rooms[currentRoom]){
      rooms[currentRoom].push(socket.id)
    } else{
      rooms[currentRoom] = [];
      rooms[currentRoom].push(socket.id);
    }
    io.to(currentRoom).emit('new-user', {username: 'Admin', body:'there is a new user'});
    io.to(currentRoom).emit('online', rooms[currentRoom].length);
    socket.to(currentRoom).on('message', (msg)=>{
      io.to(currentRoom).emit('new-msg', msg)
    })
  })


  // disconnected
  socket.on('disconnect', ()=>{
    socket.leaveAll();
    Object.keys(rooms).forEach(key=>{
      userIndex = rooms[key].indexOf(socket.id);
      if(userIndex > -1){
        rooms[key].splice(userIndex, 1);
        io.to(currentRoom).emit('new-user', {username: 'Admin', body:'one user left'});

      }
      if(rooms[key].length <= 0){
        delete rooms[key]
      }
    })
    io.to(currentRoom).emit('online', (rooms[currentRoom] && rooms[currentRoom].length) || 0);
  })
})

server.listen(PORT, ()=>{
  console.log('app is running... catch it -_-');
})
