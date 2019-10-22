import Bot from '../Bot'

export default class EventHandler extends Bot {
  public registerEvents() {
    this.client.on('ready', this.readyOn);
  }

  public readyOn() {
    console.log('Bot ready ON');
  }
}