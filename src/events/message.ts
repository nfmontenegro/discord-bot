import {Message, Channel, User, MessageAttachment} from 'discord.js'

import * as fileConfig from '../../config.json'
import {Config} from '../interfaces'
import {splitMessage, commandHandler} from '../lib'

const onMessage = async (message: Message): Promise<Message> => {
  const userConfig: Config = fileConfig
  if (message.author.bot) {
    return null
  }

  if (!message.content.startsWith(userConfig.prefix)) {
    return null
  }

  const commandWithArguments = splitMessage(message.content)
  const handleMessage = await commandHandler(commandWithArguments)
  return message.channel.send(handleMessage)
}

const userTyping = (channel: Channel, user: User): void => {
  if (user.bot) {
    return null
  }
  console.log(`### ${user.tag} has started typing`)
}

export {onMessage, userTyping}
