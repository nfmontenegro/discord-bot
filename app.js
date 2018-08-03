import Discord from 'discord.io'
import { configBot } from './config/config'
import { cleanCommand } from './utils/util'
import { bip } from './libs/bip'
import { weather } from './libs/weather'
import { rut } from './libs/rut'
import { wikipedia } from './libs/wikipedia'
import { kiosko } from './libs/kiosko'
import { giphy } from './libs/gif'
import { translate } from './libs/translate'
import { commands } from './utils/util'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
  console.log('Init Bot ....')
  console.log('Ready!  ✨')
  console.log('======================')
  console.log('\n')
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  console.log('type by:', event.d.author)
  console.log('\n')

  const { id } = event.d.author

  if (id === configBot.discordIdAdmin) {
    const { type } = event.d
    if (type === 7) {
      bot.sendMessage({
        to: channelID,
        message: `Hola 👋! ${user}, Bienvenido al servidor de Javascript en Español 🍻`
      })
    }

    let lib
    commands.map(command => {
      if (message.includes(command)) {
        const argument = cleanCommand(command, message)
        switch (command) {
          case '!translate':
            lib = translate
            break
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
          case '!gif':
            lib = giphy
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

    if (message === '!createinvite') {
      bot.createInvite({ channelID }, (err, { code }) => {
        bot.sendMessage({
          to: channelID,
          message: `https://discord.gg/${code}`
        })
      })
    }
  } else {
    if (!configBot.discordIdBot === id) {
      console.log('No tienes permiso: ', event.d.author)
    }
  }
})
