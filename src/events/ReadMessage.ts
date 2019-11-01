import {Client, Message, GuildMember} from 'discord.js';

import logger from '../utils/Logger';
import mapCommands from '../utils/MapCommands';
import IMessage from '../interfaces/IMessage';

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
    console.log('\n')

    //TODO fiilter by roles
    const response = await mapCommands(message.content);
    if (response) {
      const {type, messageData} = response;
      if (type === 'embed') {
        this.replyEmbedMessage(messageData)
      } else {
        this.replyMessage(messageData)
      }
    }
  }

  private replyEmbedMessage(messageData: any[]): Promise<any> {
    const formatMessage = messageData.map(elem => {
      return {
        name: elem.title,
        value: elem.snippet
      }
    })

    return this.message.reply('hola', {
      embed: {
        color: 15105570,
        description: "Some items!",
        fields: formatMessage
      }
    })
  }

  private replyMessage(messageData: string): Promise<any> {
    return this.message.reply(messageData)
  }
}
