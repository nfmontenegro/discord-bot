import Discord from 'discord.io'
import { configBot } from './config/config'
import { cleanCommand } from './utils/util'
import { bip } from './libs/bip'
import { weather } from './libs/weather'
import { rut } from './libs/rut'

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

    bip(code)
      .then(({ saldoTarjeta }) => {
        bot.sendMessage({
          to: channelID,
          message: !saldoTarjeta
            ? 'El código de la tarjeta no existe'
            : `El saldo 💵  de tu tarjeta es ${saldoTarjeta}`
        })
      })
      .catch(e => e)
  }

  //get weather info
  if (message.includes('!clima')) {
    const city = cleanCommand('!clima', message)

    weather(city)
      .then(({ nextWeather, location }) => {
        bot.sendMessage({
          to: channelID,
          message: `El clima para ${location} \n\n ${nextWeather}`
        })
      })
      .catch(e => console.log(e))
  }

  if (message.includes('!rut')) {
    const digits = cleanCommand('!rut', message)

    rut(digits)
      .then(({ servel, nombre, rut, sexo }) => {
        sexo === 1 ? (sexo = 'Masculino') : 'Femenino'
        const {
          region,
          comuna,
          provincia,
          circunscripcion,
          mesa,
          pais
        } = servel
        bot.sendMessage({
          to: channelID,
          message: `Rut: ${rut} \nNombre: ${nombre.toUpperCase()} \nSexo: ${sexo} \nRegión: ${region} \nComuna: ${comuna} \nProvincia: ${provincia}  \nCircunscripción: ${circunscripcion} \nMesa: ${mesa} \nPaís: ${pais}`
        })
      })
      .catch(e => console.log(e))
  }
})
