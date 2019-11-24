import {Message} from 'discord.js'

const onMessage = (message: Message) => {
  if (message.author.bot) {
    return null
  }
}

const userTyping = (channel, user) => {
  debugger
  if (user.bot) {
    return null
  }
  console.log(`### ${user.tag} has started typing`)
}

export {onMessage, userTyping}
