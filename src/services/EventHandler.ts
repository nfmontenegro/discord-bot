import {Client, Message} from 'discord.js';
export default class EventHandler {
  public client: Client;

  constructor(client: Client) {
    this.client = client
  }

  public init() {
    const client = this.client
    client.on('ready', this.onReady)
    client.on('message', this.readMessage)
  }

  private onReady(client: Client) {
    console.log('Bot on ready! ~~~')
  }

  private readMessage(message: Message) {
    console.log('Client', message)
  }

}