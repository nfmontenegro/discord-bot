import {Message, Channel, User} from 'discord.js'

const onMessage = (message: Message): void => {
  if (message.author.bot) {
    return null
  }
}

const userTyping = (channel: Channel, user: User): void => {
  debugger
  if (user.bot) {
    return null
  }
  console.log(`### ${user.tag} has started typing`)
}

export {onMessage, userTyping}
