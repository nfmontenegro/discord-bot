import {join} from 'ramda'

import {wikipedia, giphy} from '../api'
import {CommandHandler} from '../interfaces'

const splitMessage = text => {
  const args = text
    .slice('!'.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()
  return {command, args}
}

const switchCommand = (command, args) => {
  const discordCommand = {
    wikipedia: params => wikipedia(params),
    gif: params => giphy(params)
  }

  const mapKeys = Object.keys(discordCommand)
  const matchCommand = mapKeys.some(commandKey => commandKey === command)

  if (matchCommand) {
    return discordCommand[command](args)
  } else {
    return 'Command not found'
  }
}

const commandHandler = ({command, args}: CommandHandler) => {
  const joinQueryParameter = join(' ', args)
  return switchCommand(command, args)
}

export {splitMessage, commandHandler}
