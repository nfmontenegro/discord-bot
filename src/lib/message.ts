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

const commandHandler = ({command, args}: CommandHandler) => {
  const joinQueryParameter = join(' ', args)

  switch (command) {
    case 'wikipedia':
      return wikipedia(joinQueryParameter)
      break
    case 'gif':
      return giphy(joinQueryParameter)
    default:
      return 'Command not found'
  }
}

export {splitMessage, commandHandler}
