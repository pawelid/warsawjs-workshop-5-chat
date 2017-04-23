# warsawjs-workshop-5-chat 

# Format wiadomości
## message

{
  body: 'string',
  from: 'string'  //not sent from client
}

## login request

{
  login: 'string',
  password: 'string'
}

## login response

{
  result: boolean
}

## commands format
/login user password

## think later
chat refresh on reconnect