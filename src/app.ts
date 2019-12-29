import {Client, ErrorEvent} from 'discord.js'

import {logger as initLogger} from './lib'
import {connect, onMessage, guildMemberAdd, userTyping} from './events'

export const globalState = (): any => {
  const logger = initLogger()
  return {
    logger
  }
}

const run = () => {
  const logger = initLogger()

  const client: Client = new Client()
  client.on('ready', () => {
    logger.info(`Bot has started ${client.user.tag}`)
  })

  client.on('error', (error: ErrorEvent) => {
    logger.info('Discord client error!', error.message)
  })

  client.on('message', onMessage)
  client.on('guildMemberAdd', guildMemberAdd)
  client.on('typingStart', userTyping)

  connect(client, process.env.DISCORD_TOKEN)
}

export default run
