import {methodFetch} from '../helpers/fetch'

export async function translate(text) {
  try {
    const lang = 'en'
    const yandexApi = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${
      process.env.YANDEX
    }&text=${text}&lang=${lang}`

    const data = await methodFetch(yandexApi)
    return `🤖 Traducción: ${datatext[0]} `
  } catch (err) {
    console.log('Err:', err)
  }
}
