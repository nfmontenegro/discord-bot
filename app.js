import Discord from 'discord.io'

import utils from './utils'

require('dotenv').config()

const bot = new Discord.Client({
  token: process.env.TOKEN,
  autorun: true,
  autoreconnect: true
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

  utils.commands.map(command => {
    if (message.includes(command)) {
      const argument = utils.cleanCommand(command, message)
      if (
        id === process.env.DISCORDIDADMIN ||
        id === process.env.DISCORDIDBOT
      ) {
        console.log('=> type by:', event.d.author)
        console.log('\n')
        console.log('=> message:', message)
        console.log('\n')
        console.log('=> user id:', userID)
        console.log('\n')

        const lib = utils.requestLib(command)

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

bot.on('disconnect', (erMsg, code) => {
  console.log(
    '----- Bot disconnected from Discord with code',
    code,
    'for reason:',
    erMsg,
    '-----'
  )
  bot.connect()
})
