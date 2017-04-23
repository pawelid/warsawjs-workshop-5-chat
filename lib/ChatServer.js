class ChatServer {
  constructor({ io }) {
    this._io = io;
  }

  init() {
    const io = this._io;
    io.on('connection', function (socket) {
      socket.on('message', function ({ body }) {
        io.sockets.emit('message', { body });
      })
    })
  }

}

module.exports = ChatServer;
// usage: require('./ChatServer')