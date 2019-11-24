const connect = (client, token): string => {
  if (!token) {
    throw new Error('You need provide a token')
  }

  return client.login(token)
}

export default connect
