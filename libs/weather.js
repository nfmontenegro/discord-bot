import fetch from 'node-fetch'

export const weather = async city => {
  const url = `https://www.meteored.cl/peticionBuscador.php?lang=cl&texto=${city}`
  const getCity = await fetch(url)
  const { localidad } = await getCity.json()

  const urlCity = `http://api.meteored.cl/index.php?api_lang=cl&localidad=${
    localidad[0].id
  }&affiliate_id=qyl6w675gozw&v=3.0`
  const getCityWeather = await fetch(urlCity)
  const { location, day } = await getCityWeather.json()

  const nextWeather = day.map(
    ({ name, tempmin, tempmax, symbol_description }) =>
      `Para el día ${name} ${symbol_description}, la mínima sera ${tempmin}º y la máxima ${tempmax}º \n`
  )

  const message = `El clima 🌤 ☁️ 🌞 para ${location} \n\n ${nextWeather}`

  return message
}
