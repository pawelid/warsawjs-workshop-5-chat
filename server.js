const io = require('socket.io')(3000);

io.on('connection', function (socket) {
  socket.on('message', function ({ body }) {
    io.sockets.emit('message', { body });
  })
})