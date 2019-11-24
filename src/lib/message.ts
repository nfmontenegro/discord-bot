import {CommandHandler} from '../interfaces'
import {wikipedia} from '../api'

const splitMessage = text => {
  const args = text
    .slice('!'.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()
  return {command, args}
}

const commandHandler = ({command, args}: CommandHandler) => {
  switch (command) {
    case 'wikipedia':
      return wikipedia(args)
      break
    default:
      return 'Command not found'
  }
}

export {splitMessage, commandHandler}
