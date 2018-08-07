import Discord from 'discord.io'
import { configBot } from './config/config'

import { cleanCommand } from './utils/util'
import { commands } from './utils/util'

import { bip } from './libs/bip'
import { weather } from './libs/weather'
import { rut } from './libs/rut'
import { wikipedia } from './libs/wikipedia'
import { kiosko } from './libs/kiosko'
import { giphy } from './libs/gif'
import { translate } from './libs/translate'
import { youtube } from './libs/youtube';

require('dotenv').config()

const bot = new Discord.Client({
  token: process.env.TOKEN,
  autorun: true
})

bot.on('ready', () => {
  console.log('Init Bot ....')
  console.log('Ready!  ✨')
  console.log('___________________')
  console.log('\n')
  console.log(`${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  const { type } = event.d
  const { id, bot } = event.d.author

  if (type === 7 && id !== configBot.discordIdBot) {
    bot.sendMessage({
      to: channelID,
      message: `Hola 👋! ${user}, Bienvenido a la comunidad de Javascript en Español 🍻`
    })
  }

  if (id === configBot.discordIdAdmin || id === configBot.discordIdBot ) {
    console.log('type by:', event.d.author)
    console.log('\n')
    console.log('user id:', userID)
    console.log('\n')

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
          case '!youtube':
            lib = youtube
            break
        }

        lib(argument)
          .then(message => {
            bot.sendMessage({
              to: channelID,
              message
            })
          })
          .catch(error => console.log('Err:', error))
      }
    })

    if (message === '!createinvite') {
      bot.createInvite({ channelID }, (err, { code }) => {
        if (!err) {
          bot.sendMessage({
            to: channelID,
            message: `https://discord.gg/${code}`
          })
        } else {
          console.log('Hubo un error al crear la invitación')
        }
      })
    }
  } else {
    console.log('No tienes permiso: ', event.d.author)
  }
})
