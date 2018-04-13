import Discord from 'discord.io'
import { configBot } from './config'
import { wikipedia } from './libs/wikipedia'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  //search argument in wikipedia
  if (message.includes('!wikipedia')) {
    const argument = message
      .split('!wikipedia')
      .pop()
      .trim()

    bot.sendMessage({
      to: channelID,
      message: `https://es.wikipedia.org/wiki/${argument}`
    })
  }
})
