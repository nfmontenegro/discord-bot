import {Client, Message, GuildMember} from 'discord.js';

import logger from '../Logger'

export default class EventHandler {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public init() {
    this.client.on('ready', this.onReady);
    this.client.on('message', this.readMessage);
    this.client.on('guildMemberAdd', this.newUser);
  }

  private onReady(): void {
    logger('Bot on ready! ~~~')
  }

  private readMessage(message: Message): void {
    if(message.author.bot) return;
    logger('### Author: ', message.author.username)
    logger('### Message: ', message.content)
  }

  private newUser(member: GuildMember): void {
    logger(`### New User "${member.user.username}" has joined "${member.guild.name}"`)
    const guild = member.guild;
  }

}