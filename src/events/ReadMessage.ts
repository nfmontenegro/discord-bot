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

    const commandService = mapCommands(message.content);
    if(commandService) {
      await this.replyMessage(commandService)
    }
    // await message.reply('Hey im reply', {
    //   embed: {
    //     color: 3447003,
    //     description: "A very simple Embed!",
    //     fields: [{
    //       name: "Fields",
    //       value: "They can have different fields with small headlines."
    //     },
    //     {
    //       name: "Masked links",
    //       value: "You can put [masked links](http://google.com) inside of rich embeds."
    //     },
    //     {
    //       name: "Markdown",
    //       value: "You can put all the *usual* **__Markdown__** inside of them."
    //     }
    //     ],
    //   }
    // })
  }

  private async replyMessage(message: string): Promise<any> {
    return await this.message.reply(message)
  }
}
