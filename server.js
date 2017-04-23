const fs = require('fs');
const yaml = require('js-yaml');
const socketio = require('socket.io');
const ChatServer = require('./lib/ChatServer');

config = yaml.safeLoad(fs.readFileSync(__dirname + '/config/server.yaml', 'utf8'));

const io = socketio(config.socketPort);

const server = new ChatServer ({ io });
server.init();