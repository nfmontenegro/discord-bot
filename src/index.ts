import Bot from './Bot';

require('dotenv').config();

const bot: Bot = new Bot({
  discordToken: process.env['DISCORD_TOKEN']
});

bot.init();
