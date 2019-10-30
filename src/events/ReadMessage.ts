import {Client, Message, GuildMember} from 'discord.js';

import logger from '../utils/Logger';
import mapCommands from '../utils/MapCommands';

export default class ReadMessage {
  private message: Message;

  constructor(message: any) {
    this.message = message;
  }

   public async read(): Promise<any> {
    const message = this.message;
    if (message.author.bot) return;
    logger('### Author: ', message.author.username);
    logger('### Message: ', message.content);
    logger('\n\n')

    //TODO fiilter by roles
    const commandService = await  mapCommands(message.content);
    if(commandService) {
      await this.replyMessage(commandService)
    }
  }

  private async replyMessage(messageData: any[]): Promise<any> {
    const mapData = messageData.map(elem => {
      return {
        name: elem.title,
        value: elem.snippet
      }
    })

    return await this.message.reply('hola', {
      embed: {
        color: 3447003,
        description: "A very simple Embed!",
        fields: mapData
      }
    })
  }
}
