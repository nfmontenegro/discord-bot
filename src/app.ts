import {Client, ErrorEvent} from 'discord.js'
import {connect, onMessage, guildMemberAdd, userTyping} from './events'

const run = () => {
  const client: Client = new Client()
  client.on('ready', () => {
    console.log(`Bot has started ${client.user.tag}`)
  })

  client.on('error', (error: ErrorEvent) => {
    console.log('Discord client error!', error.message)
  })

  client.on('message', onMessage)
  client.on('guildMemberAdd', guildMemberAdd)
  client.on('typingStart', userTyping)

  connect(client, process.env.DISCORD_TOKEN)
}

export default run
