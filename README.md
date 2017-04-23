# warsawjs-workshop-5-chat 

This is chat application build during [WarsawJS](https://www.meetup.com/WarsawJS/) [workshop](https://www.meetup.com/WarsawJS/events/238992698/).

## How to run
You can run run server and any number of clients using:

    node server.js
    node client.js

### commands format (on client)
    
    /register user password
    /login user password

## Internals
### Message format
#### message

{
  body: 'string',
  from: 'string'  //not sent from client
}

#### login request

{
  login: 'string',
  password: 'string'
}

#### login response

{
  result: boolean
}

#### register request

{
  login: 'string',
  password: 'string'
}

#### register response

{
  result: boolean
}

#### join

{
  login: 'string'
}

#### leave

{
  login: 'string'
}


### API
Authenticator {
  validate(login, password) : Promise<boolean>;
  register(login, password) : Promise<undefined>;
}

## think later
chat refresh on reconnect  
join/leave for multiconnected users  
