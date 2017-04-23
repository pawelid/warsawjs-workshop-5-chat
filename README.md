# warsawjs-workshop-5-chat 

## Message format
### message

{
  body: 'string',
  from: 'string'  //not sent from client
}

### login request

{
  login: 'string',
  password: 'string'
}

### login response

{
  result: boolean
}

### register request

{
  login: 'string',
  password: 'string'
}

### register response

{
  result: boolean
}

### join

{
  login: 'string'
}

### leave

{
  login: 'string'
}


## commands format
/login user password

# API
Authenticator {
  validate(login, password) : Promise<boolean>;
  register(login, password) : Promise<undefined>;
}

## think later
chat refresh on reconnect
join/leave for multiusers

