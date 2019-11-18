import {Client, Message, ErrorEvent} from 'discord.js'

const run = () => {
  const client: Client = new Client()
  client.on('ready', () => {
    console.log(`Bot has started ${client.user.tag}`)
  })

  client.on('message', (message: Message) => {
    console.log('Message from discord', message.author.username)
  })

  client.on('error', (error: Error) => {
    console.log('Discord client error!', error.message)
  })

  client.login(process.env.DISCORD_TOKEN)
}

export default run
