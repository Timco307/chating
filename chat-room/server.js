const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.broadcast.to(room).emit('message', `${username} has joined the room`);
  });

  socket.on('chatMessage', (msg) => {
    const { room, username, message } = msg;
    io.to(room).emit('message', `${username}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));