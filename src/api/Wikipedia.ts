export default class Wikipedia {
  public run(message: string) {
    return `https://es.wikipedia.org/wiki/${message}`
  }
}
