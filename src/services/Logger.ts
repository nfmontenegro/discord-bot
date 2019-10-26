import ILogger from '../interfaces/ILogger'

export default class Logger implements ILogger {
  public debug(message: string, ...supportData: any[]): void {
    this.emitLogMessage(message, supportData)
  }

  private emitLogMessage(message: string, supportData: any[]) {
    if(supportData.length > 0) {
      console.log(`### DEBUG`, message, supportData)
    } else {
      console.log(message)
    }
  }
}