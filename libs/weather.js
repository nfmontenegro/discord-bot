import {methodFetch} from '../helpers/fetch'

export async function weather(city) {
  const url = `https://www.meteored.cl/peticionBuscador.php?lang=cl&texto=${city}`
  const {localidad} = await methodFetch(url)

  const urlCity = `http://api.meteored.cl/index.php?api_lang=cl&localidad=${
    localidad[0].id
  }&affiliate_id=qyl6w675gozw&v=3.0`
  const {location, day} = await methodFetch(urlCity)

  const nextWeather = day.map(
    ({name, tempmin, tempmax, symbol_description}) =>
      `Para el día ${name} ${symbol_description}, la mínima sera ${tempmin}º y la máxima ${tempmax}º \n`
  )

  return `El clima 🌤 ☁️ 🌞 para ${location} \n\n ${nextWeather.join('\n')}`
}
