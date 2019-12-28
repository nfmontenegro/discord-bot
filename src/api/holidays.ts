import axios from 'axios'
import {inspect} from 'util'

// let parameters = {
//   // Required
//   country: 'PL',
//   year: 2019
//   // Optional
//   // month:    7,
//   // day:      4,
//   // previous: true,
//   // upcoming: true,
//   // public:   true,
//   // pretty:   true,
// }

// hApi.holidays(parameters, function(err, data) {
//   // Insert awesome code here...
// })

const getCountryHolidays = async countryCode => {
  const toDay = new Date()
  const year = toDay.getUTCFullYear()
  const month = toDay.getUTCMonth()
  const {data} = await axios({
    url: `https://getfestivo.com/v1/holidays?source=api-caller&country=${countryCode}&month=${month}&year=${year}&upcoming=true&api_key=${process.env.HOLIDAY_API_KEY}`,
    method: 'GET'
  })

  console.log('### Get holidays data', inspect(data.holidays.holidays, true, 10, true))
  return data.holidays
}

const getCountryCode = async (country: string) => {
  try {
    const {data} = await axios({
      url: `https://restcountries.eu/rest/v2/name/${country}`,
      method: 'GET'
    })
    return data[0].alpha2Code
  } catch (error) {
    console.log('Catch Error', inspect(error.response.data, true, 7, true))
    return null
  }
}

export default async (country: Array<string>): Promise<any> => {
  if (country.length > 1) {
    return 'Invalid country'
  }

  const countryCode = await getCountryCode(country[0])
  if (countryCode) {
    const {holidays} = await getCountryHolidays(countryCode)
    //TODO: global embed lib
    return JSON.stringify(holidays)
  } else {
    return 'Country not found'
  }
}
