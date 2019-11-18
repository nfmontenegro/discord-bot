const connect = (client, token) => {
  if (!token) {
    throw new Error('You need provide a token')
  }

  return client.login(token)
}

export default connect
