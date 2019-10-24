import {Client} from 'discord.js';

import EventHandler from './services/EventHandler';
import IConfiguration from './interfaces/IConfiguration'

export default class Bot {
  public client: Client;
  public eventHandler: EventHandler;
  public configuration: IConfiguration;

  constructor(configuration: IConfiguration) {
    this.configuration = configuration;

    this.client = new Client()
    this.eventHandler = new EventHandler(this.client)

    this.client.login(this.configuration.discordToken)
  }

  public init(): void {
    this.eventHandler.init()
  }
}
