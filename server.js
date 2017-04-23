const fs = require('fs');
const yaml = require('js-yaml');
const socketio = require('socket.io');
const ChatServer = require('./lib/ChatServer');
const LevelAuthenticator = require('./lib/LevelAuthenticator');

config = yaml.safeLoad(fs.readFileSync(__dirname + '/config/server.yaml', 'utf8'));

const io = socketio(config.socketPort);

const authenticator = new LevelAuthenticator({ path: __dirname + '/users.db'});

const server = new ChatServer ({ io, authenticator });
server.init();