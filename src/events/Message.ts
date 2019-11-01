import {Message, Client} from 'discord.js';

export default class Messages {
  constructor() {
    console.log('## this', this)
  }

  public readMessage(): void {
    console.log('## Bind message')
  }
}