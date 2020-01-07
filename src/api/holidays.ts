import axios from 'axios'

import {logger, embedMessage} from '../lib'

const upperCaseLetter = word => word[0].charAt(0).toUpperCase() + word[0].slice(1)

const getCountryHolidays = async countryCode => {
  const toDay = new Date()
  const year = toDay.getUTCFullYear()
  const month = toDay.getUTCMonth()
  const {data} = await axios({
    url: `https://getfestivo.com/v1/holidays?source=api-caller&country=${countryCode}&month=${month}&year=${year}&upcoming=1&api_key=${process.env.HOLIDAY_API_KEY}`,
    method: 'GET'
  })

  logger.debug('Get holidays data', data.holidays.holidays)
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

    const mapHolidays = holidays
      .map(({date, name}) => ({
        name: 'Holiday',
        value: `Date: ${date}, ${name}`
      }))
      .slice(0, 6)

    const upperCaseCountry = upperCaseLetter(country[0])

    const embedMessageFields = {
      authorName: `Upcoming Holidays in ${upperCaseCountry}`,
      authorIconUrl:
        'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
      authorUrl: 'https://es.wikipedia.org/wiki/Wikipedia:Portada',
      fields: mapHolidays,
      thumbnailUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
      footerText: `Search with parameter ${upperCaseCountry}`,
      footerIconUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg'
    }

    return embedMessage(embedMessageFields)
  } else {
    return 'Country not found'
  }
}
