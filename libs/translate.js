import { configBot } from '../config/config'
import fetch from 'node-fetch'

export const translate = async text => {
  const lang = 'en'
  const yandexApi = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${
    configBot.yandexKey
  }&text=${text}&lang=${lang}`

  return fetch(yandexApi)
    .then(response => response.json())
    .then(({ code, text }) => {
      if (code === 200) {
        return `🤖 Traducción: ${text} `
      } else {
        return `Hubo un problema al tratar de traducir el texto`
      }
    })
    .catch(e => console.log(e))
}
