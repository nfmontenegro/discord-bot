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
  switch (command) {
    case 'wikipedia':
      return 'test'
      break
    default:
      return 'Command not found'
  }
}

export {splitMessage, commandHandler}
