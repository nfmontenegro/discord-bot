import fetch from 'node-fetch'

export async function weather(city) {
  const url = `https://www.meteored.cl/peticionBuscador.php?lang=cl&texto=${city}`
  const responseLocality = await fetch(url)
  const {localidad} = await responseLocality.json()

  const urlCity = `http://api.meteored.cl/index.php?api_lang=cl&localidad=${
    localidad[0].id
  }&affiliate_id=qyl6w675gozw&v=3.0`

  const response = await fetch(urlCity)
  const {location, day} = await response.json()

  const commingWeather = Object.values(day).map(
    ({name, tempmin, tempmax, symbol_description}) =>
      `Para el día ${name} ${symbol_description}, la mínima sera ${tempmin}º y la máxima ${tempmax}º \n`
  )

  return `El clima 🌤 ☁️ 🌞 para ${location} \n\n ${commingWeather.join('\n')}`
}
