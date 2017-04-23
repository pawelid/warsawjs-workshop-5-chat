const io = require('socket.io')(3000);

io.on('connection', function (socket) {
  socket.emit('message', {
    body: 'world'
  });
});