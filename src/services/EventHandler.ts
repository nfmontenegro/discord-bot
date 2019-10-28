import {Client, Message, GuildMember} from 'discord.js';

import logger from '../utils/Logger';
import {ReadMessage} from '../events';

export default class EventHandler {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public init() {
    this.client.on('ready', this.onReady);
    this.client.on('message', msg => new ReadMessage(msg).read());
    this.client.on('guildMemberAdd', this.newUser);
  }

  private onReady(): void {
    logger('Bot on ready! ~~~');
  }

  private newUser(member: GuildMember): void {
    logger(`### New User "${member.user.username}" has joined "${member.guild.name}"`);
    const guild = member.guild;
  }

}