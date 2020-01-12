import axios from 'axios'

import {logger, embedMessage} from '../lib'

const upperCaseLetter = word => word[0].charAt(0).toUpperCase() + word.slice(1)

const getCountryHolidays = async countryCode => {
  const toDay = new Date()
  const year = toDay.getUTCFullYear()
  const month = toDay.getUTCMonth()
  const {data} = await axios({
    url: `https://getfestivo.com/v1/holidays?source=api-caller&country=${countryCode}&month=${month}&year=${year}&upcoming=1&api_key=${process.env.HOLIDAY_API_KEY}`,
    method: 'GET'
  })
  return data.holidays.holidays
}

const getCountryCode = async (country: string) => {
  try {
    const {data} = await axios({
      url: `https://restcountries.eu/rest/v2/name/${country}`,
      method: 'GET'
    })

    return data[0].alpha2Code
  } catch (error) {
    logger.debug('Catch error', error.response.data)
    return null
  }
}

export default async (country: Array<string>): Promise<any> => {
  if (country.length > 1) {
    return 'Invalid country'
  }

  const countryCode = await getCountryCode(country[0])
  if (countryCode) {
    const holidays = await getCountryHolidays(countryCode)
    const upperCaseCountry = upperCaseLetter(country[0])

    const mapHolidays = holidays
      .map(({date, name}) => ({
        name: `Holidays ${upperCaseCountry}`,
        value: `Date: ${date}, ${name}`
      }))
      .slice(0, 6)

    const urlImage =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIqgHnHdrdr45ULtohY282GJrnUipntvaMP5WJ4Fudzqn2CAb&s'

    const embedMessageFields = {
      authorName: `Upcoming Holidays`,
      authorIconUrl: urlImage,
      fields: mapHolidays,
      thumbnailUrl: urlImage,
      footerText: upperCaseCountry,
      footerIconUrl: urlImage
    }

    return embedMessage(embedMessageFields)
  } else {
    return 'Country not found'
  }
}
