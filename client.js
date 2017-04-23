const connection = require('socket.io-client')('http://localhost:3000');

connection.on('message', function ( { body }) {
  console.log('server said: %s', body);
});