import fetch from 'node-fetch'

export async function translate(text) {
  try {
    const lang = 'en'
    const yandexApi = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${
      process.env.YANDEX
    }&text=${text}&lang=${lang}`

    const response = await fetch(yandexApi)
    const parseData = await response.json()
    return `🤖 Traducción: ${parseData[0]} `
  } catch (err) {
    console.log('Err:', err)
  }
}
