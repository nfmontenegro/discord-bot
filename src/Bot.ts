import {Client} from 'discord.js';

import EventHandler from './services/EventHandler';
import IConfiguration from './interfaces/IConfiguration';

export default class Bot {
  private eventHandler: EventHandler;
  private configuration: IConfiguration;

  constructor(configuration: IConfiguration) {
    this.configuration = configuration;
    const client = new Client();

    this.eventHandler = new EventHandler(client)

    client.login(this.configuration.discordToken)
  }

  public init(): void {
    this.eventHandler.init()
  }
}
