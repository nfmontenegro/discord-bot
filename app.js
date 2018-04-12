import Discord from 'discord.io'
import { configBot } from './config'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  console.log(user, channelID, message)
  if (message === 'Nicolas') {
    bot.sendMessage({
      to: channelID,
      message: `Your message is ${message}`
    })
  }
})
