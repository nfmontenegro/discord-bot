import Discord from 'discord.io'
import { configBot } from './config'
import { cleanCommand } from './utils/util'
import { bip } from './libs/bip'

const bot = new Discord.Client({
  token: configBot.token,
  autorun: true
})

bot.on('ready', () => {
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

    bip(code).then(res => {
      bot.sendMessage({
        to: channelID,
        message: !res.saldoTarjeta
          ? 'El código de la tarjeta no existe'
          : `El saldo 💵  de tu tarjeta es ${res.saldoTarjeta}`
      })
    })
  }
})
