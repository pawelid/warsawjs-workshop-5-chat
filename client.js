const readline = require('readline');
const util = require('util');
const connection = require('socket.io-client')('http://localhost:3000');
const EOL = require('os').EOL;

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


const commandHandlers = {
  login: function handleLogin(login, password) {
    clientData = {login, password};
    sendLogin();
  }
}

rl.on('line', function(line) {

  if(line[0] === '/') {
    const commandParts = line.slice(1).split(' ').filter((part) => part.length > 0);
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);
    if(commandHandlers[commandName]) {
      commandHandlers[commandName](commandArgs[0], commandArgs[1]);
    }    
  } else {
    connection.emit('message', { body: line });
  }
  rl.prompt();
})

// ### Authentication ###

let clientData = null;

function sendLogin() {
  connection.emit('login', clientData);
};

// ### Message handling ###

connection.on('connect', function() {
  writeLine('* connected');
  if(clientData) {
    sendLogin();
  }
});

connection.on('message', function ( { from, body }) {
  writeLine('%s: %s', from, body);
});

connection.on('login', function( { result }){
  if (result === true) {
    writeLine('* user logged in');
  } else {
    writeLine('! failed to login');
  }
});