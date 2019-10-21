import {Client as DiscordClient} from 'discord.js';

import Bot from './Bot'
import IConfiguration from './interfaces/IConfiguration';

export default class Client {
  private bot: Bot;
  private client: DiscordClient;
  private configuration: IConfiguration;


  public constructor(bot: Bot, configuration: IConfiguration) {
    this.bot = bot;
    this.client = new DiscordClient();
    this.configuration = configuration;
  };

  public async login(): Promise<void> {
    console.log('Login BOT')
    await this.client.login(this.configuration.discordToken)
  }
};