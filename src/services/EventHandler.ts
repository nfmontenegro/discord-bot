import {Client, Message, GuildMember} from 'discord.js';

import Logger from '../services/Logger';
import ILogger from '../interfaces/ILogger';
export default class EventHandler {
  private client: Client;
  public logger: ILogger;

  constructor(client: Client) {
    this.client = client;
    this.logger = new Logger();
  }

  public init() {
   this.client.on('ready', this.onReady);
   this.client.on('message', this.readMessage);
   this.client.on('guildMemberAdd', this.memberAdd);
  }

  public onReady(client: Client): void {
    try {
      this.logger.debug("Bot on ready! ~~~");
    } catch (err) {
      console.log('Error:', err)
    }
  }

  private readMessage(message: Message): void {
    if(message.author.bot) return;
    // this.logger.debug('###Author', message.author.username)
    // this.logger.debug('###Message', message.content)
  }

  private memberAdd(member: GuildMember): void {
    // this.logger.debug('message')
  }

}