import Client from './Client'
import IConfiguration from './interfaces/IConfiguration'

export default class Bot {
  private readonly client: Client
  private readonly configuration: IConfiguration

  public constructor(configuration: IConfiguration) {
    this.configuration = configuration
    this.client = new Client(this, {
      discordToken: configuration.discordToken
    })
  }

  public async run(): Promise<void> {
    await this.client.login()
    await this.client.onReady()

    await this.client.readMessage()
  }
}
