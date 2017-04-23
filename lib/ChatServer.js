class ChatServer {

  constructor({ io, authenticator }) {
    this._io = io;
    this._authenticator = authenticator;
  }

  init() {
    const io = this._io;
    const authenticator = this._authenticator;
    io.on('connection', function (socket) {
      const clientData = {
        login: null
      };

      socket.on('message', function ({ body }) {
        // TODO: require a 'login' to be set before allowing to send message
        if(clientData.login) {
          io.sockets.emit('message', { body, from: clientData.login });
        }
        
      });
     
      socket.on('login', function( {login, password}) {
        // set login in our context
        authenticator.validate(login, password)
          .then(function validationFinished(result){
            if(result) {
              clientData.login = login;
              socket.emit('login', { result: true });
            } else {
              socket.emit('login', { result: false });
            }
          })
          .catch(function validationError(error){
            socket.emit('login', {result: false, error: error})
          })
      });

      socket.on('register', function( {login, password}) {
        authenticator.register(login, password)
          .then(function() {
            socket.emit('register', {result: true})
          })
          .catch(function(error) {
            socket.emit('register', {result: false, error: error})
          })
      });

    })
  }

}

module.exports = ChatServer;