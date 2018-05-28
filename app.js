import Discord from 'discord.io'
import fs from 'fs'
import { toDay } from './utils/util'
import { configBot } from './config/config'
import { cleanCommand } from './utils/util'
import { bip } from './libs/bip'
import { weather } from './libs/weather'
import { rut } from './libs/rut'
import { wikipedia } from './libs/wikipedia'
import { kiosko } from './libs/kiosko'
import { commands } from './utils/util'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
  console.log('✨ Ready!')
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  let lib
  commands.map(command => {
    if (message.includes(command)) {
      const argument = cleanCommand(command, message)
      switch (command) {
        case '!wikipedia':
          lib = wikipedia
          break
        case '!bip':
          lib = bip
          break
        case '!diario':
          lib = kiosko
          break
        case '!clima':
          lib = weather
          break
        case '!rut':
          lib = rut
          break
      }

      lib(argument)
        .then(message => {
          bot.sendMessage({
            to: channelID,
            message
          })
        })
        .catch(e => e)
    }
  })
})
