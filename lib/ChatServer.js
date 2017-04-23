class ChatServer {
  constructor({ io }) {
    this._io = io;
  }

  init() {
    const io = this._io;
    io.on('connection', function (socket) {
      const clientData = {
        login: null
      };

      socket.on('message', function ({ body }) {
        // TODO: require a 'login' to be set before allowing to send message
        io.sockets.emit('message', { body, from: clientData.login });
      });
     
      socket.on('login', function( {login, password}) {
        // TODO: set login in our context
      });

    })
  }

}

module.exports = ChatServer;
// usage: require('./ChatServer')