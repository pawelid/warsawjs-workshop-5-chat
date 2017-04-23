const fs = require('fs');
const yaml = require('js-yaml');
const socketio = require('socket.io');
const ChatServer = require('./lib/ChatServer');
const DummyAuthenticator = require('./lib/DummyAuthenticator');

config = yaml.safeLoad(fs.readFileSync(__dirname + '/config/server.yaml', 'utf8'));

const io = socketio(config.socketPort);

const authenticator = new DummyAuthenticator({
    pawel: 'test',
    ola: 'test1'  
});

const server = new ChatServer ({ io, authenticator });
server.init();