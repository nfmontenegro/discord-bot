const onMessagge = client => {
  client.on('message', message => {
    console.log('Message from discord', message.author.username)
  })
}

export default onMessagge
