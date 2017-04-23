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

rl.on('line', function(line) {
  connection.emit('message', { body: line });
  rl.prompt();
})

// ### Message handling ###

connection.on('connect', function() {
  writeLine('* connected')
});

connection.emit('login', { 
  login: 'user-'+ Math.round(Math.random() * 100), 
  password: 'password'});

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