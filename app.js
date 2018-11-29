import Discord from 'discord.io'

import libs from './libs'
import utils from './utils'

require('dotenv').config()

const bot = new Discord.Client({
  token: process.env.TOKEN,
  autorun: true
})

bot.on('ready', () => {
  console.log('=> Init Bot ....')
  console.log('=> Ready!  ✨')
  console.log('___________________')
  console.log('\n')
  console.log(`=> ${bot.username.toUpperCase()} Connected! 🤖`)
})

bot.on('message', (user, userID, channelID, message, event) => {
  const {
    type,
    author: {id}
  } = event.d

  if (type === 7 && id !== process.env.DISCORDIDBOT) {
    bot.sendMessage({
      to: channelID,
      message: `Hola 👋! ${user}, Bienvenido a la comunidad de Javascript en Español 🍻`
    })
  }

  const {bip, weather, rut, wikipedia, kiosko, giphy, translate, youtube} = libs

  const {cleanCommand, commands} = utils

  commands.map(command => {
    if (message.includes(command)) {
      const argument = cleanCommand(command, message)
      if (
        id === process.env.DISCORDIDADMIN ||
        id === process.env.DISCORDIDBOT
      ) {
        console.log('=> type by:', event.d.author)
        console.log('\n')
        console.log('=> user id:', userID)
        console.log('\n')

        let lib
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
      } else {
        console.log('=> Message', message)
        console.log('=> Dont have permission!: ', event.d.author)
      }
    }
  })

  if (message === '!createinvite') {
    bot.createInvite({channelID}, (err, {code}) => {
      if (!err) {
        bot.sendMessage({
          to: channelID,
          message: `https://discord.gg/${code}`
        })
      }
    })
  }

  if (message === '!help' || message === '!ayuda') {
    bot.sendMessage({
      to: channelID,
      message: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
  }
})

require('http')
  .createServer()
  .listen(3000)
