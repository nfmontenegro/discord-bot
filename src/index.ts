import Bot from './Bot'

const bot: Bot = new Bot({
  discordToken: process.env.DISCORD_TOKEN
})

bot.run()
