import {Message, Channel, User, MessageAttachment} from 'discord.js'

import fileConfig from '../../config.json'
import {Config} from '../interfaces'
import {splitMessage, commandHandler} from '../lib'

const onMessage = (message: Message): Promise<Message> => {
  const config: Config = JSON.parse(fileConfig)
  debugger
  if (message.author.bot) {
    return null
  }

  if (!message.content.startsWith('!')) {
    return null
  }

  const commandWithArguments = splitMessage(message.content)
  const handleMessage = commandHandler(commandWithArguments)
  return message.channel.send(handleMessage)
}

const userTyping = (channel: Channel, user: User): void => {
  if (user.bot) {
    return null
  }
  console.log(`### ${user.tag} has started typing`)
}

export {onMessage, userTyping}
