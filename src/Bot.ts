import {Client} from 'discord.js';

import EventHandler from './services/EventHandler'
import IConfiguration from './interfaces/IConfiguration'

export default class Bot {
  private readonly client: Client;
  private readonly configuration: IConfiguration;
  private readonly eventHandler: EventHandler;

  public constructor(configuration: IConfiguration, eventHandler: EventHandler) {
    this.configuration = configuration;
    this.client = new Client();
    this.eventHandler = new EventHandler();

    this.client.login(this.configuration.discordToken);

  }

  public async run(): Promise<void> {
    console.log('Bot running')
    this.eventHandler.registerEvents();
  }
}
