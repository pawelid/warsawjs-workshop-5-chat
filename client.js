const readline = require('readline');
const util = require('util');
const connection = require('socket.io-client')('http://localhost:3000');
const EOL = require('os').EOL;

let connected = null;
let clientData = null;

// ### Input handling ###

function writeLine(line, ...args) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(util.format(line, ...args) + EOL);
  rl.prompt(true);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line) {

  if(line[0] === '/') {
    // commands handling
    const commandParts = line.slice(1).split(' ').filter((part) => part.length > 0);
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);
    if(commandHandlers[commandName]) {
      commandHandlers[commandName](commandArgs[0], commandArgs[1]);
    }    
  } else {
    // just normal message
    connection.emit('message', { body: line });
  }
  rl.prompt();
})


// ### Command handlers ###

const commandHandlers = {

  login: function handleLogin(login, password) {
    clientData = {login, password};
    if(connected){
      connection.emit('login', clientData);
    }
  },

  register: function handleRegister(login, password) {
    clientData = {login, password};
    if(connected) {
      connection.emit('register', clientData);
    }
  }
}


// ### Message handling ###

connection.on('connect', function() {
  writeLine('* connected');
  connected = true;
  if(clientData) {
    sendLogin();
  }
});

connection.on('disconnect', function() {
  writeLine('! disconnected');
  connected = false;
})

connection.on('message', function ( { from, body }) {
  writeLine('%s: %s', from, body);
});

connection.on('login', function( { result }){
  if (result === true) {
    rl.setPrompt(`${clientData.login}>`);
    writeLine('* user logged in');
  } else {
    writeLine('! failed to login');
  }
});

connection.on('register', function( { result }) {
  if(result === true) {
    rl.setPrompt(`${clientData.login}>`);
    writeLine('* user registered');
    connection.emit('login', clientData);
  } else {
    writeLine('! failed to register');
  }
});

connection.on('join', function( {login}) {
  writeLine(`* joined: ${login}`);
});

connection.on('leave', function( {login}) {
  writeLine(`* left: ${login}`);
});

writeLine('commands:');
writeLine('   /login user password');
writeLine('   /register user password');
writeLine('');