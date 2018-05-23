import Discord from 'discord.io'
import fs from 'fs'
import { toDay } from './utils/util'
import { configBot } from './config/config'
import { cleanCommand } from './utils/util'
import { bip } from './libs/bip'
import { weather } from './libs/weather'
import { rut } from './libs/rut'
import { kiosko } from './libs/kiosko'
import request from 'request'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
  console.log('✨ Ready!')
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  //search this argument in wikipedia
  if (message.includes('!wikipedia')) {
    const argument = cleanCommand('!wikipedia', message)

    bot.sendMessage({
      to: channelID,
      message: `https://es.wikipedia.org/wiki/${argument}`
    })
  }

  //get your money account from BIP
  if (message.includes('!bip')) {
    const code = cleanCommand('!bip', message)

    bip(code)
      .then(message => {
        bot.sendMessage({
          to: channelID,
          message
        })
      })
      .catch(e => e)
  }

  //get weather info
  if (message.includes('!clima')) {
    const city = cleanCommand('!clima', message)
    weather(city)
      .then(message => {
        bot.sendMessage({
          to: channelID,
          message
        })
      })
      .catch(e => console.log(e))
  }

  if (message.includes('!rut')) {
    const digits = cleanCommand('!rut', message)

    rut(digits)
      .then(message => {
        bot.sendMessage({
          to: channelID,
          message
        })
      })
      .catch(e => console.log(e))
  }

  if (message.includes('!diario')) {
    const news = cleanCommand('!diario', message)
    kiosko(news)
      .then(message => {
        bot.sendMessage({
          to: channelID,
          message
        })
      })
      .catch(e => console.log(e))
  }
})
