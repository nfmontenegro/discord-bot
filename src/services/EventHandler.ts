import {Client} from 'discord.js';
export default class EventHandler {
  public client: Client;

  constructor(client: Client) {
    this.client = client
  }

  public hello() {
    this.readyOn(this.client)
  }

  public readyOn(client: Client) {
    client.on('ready', () => {
      console.log('Im ready beep beep!~~~~')
    })
  }
}