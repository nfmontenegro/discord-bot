import {Message, Channel, User, MessageAttachment} from 'discord.js'
import {compose} from 'ramda'

import {Config} from '../interfaces'
import {splitMessage, commandHandler, logger} from '../lib'

import * as fileConfig from '../../config.json'
import {globalState} from '../app'

const onMessage = async (message: Message): Promise<Message> => {
  const {content, channel, author} = message
  const userConfig: Config = fileConfig
  if (author.bot) {
    return null
  }

  if (!content.startsWith(userConfig.prefix)) {
    return null
  }

  const handleMessage = await compose(commandHandler, splitMessage)(content)
  return channel.send(handleMessage)
}

const userTyping = (channel: Channel, user: User): void => {
  if (user.bot) {
    return null
  }
  logger.info(`${user.tag} has started typing`)
}

export {onMessage, userTyping}
