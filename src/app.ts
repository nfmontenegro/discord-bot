import {Client, Message, ErrorEvent} from 'discord.js'
import {connect, message} from './events'

const run = () => {
  const client: Client = new Client()
  client.on('ready', () => {
    console.log(`Bot has started ${client.user.tag}`)
  })

  client.on('error', (error: ErrorEvent) => {
    console.log('Discord client error!', error.message)
  })

  message(client)
  connect(client, process.env.DISCORD_TOKEN)
}

export default run
