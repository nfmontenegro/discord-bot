export default interface ILogger {
  debug(message: string, ...supportData: any[]): void
}