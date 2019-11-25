import axios from 'axios'

import {Embed} from '../interfaces'

export default async (queryParameter: string): Promise<Embed> => {
  const response = await axios(
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${queryParameter}`
  )

  const querySearch = response.data.query.pages

  const mapUrls = Object.values(querySearch).map(async (queryValues: any) => {
    const response = await axios(
      `https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${queryValues.pageid}&inprop=url&format=json`
    )

    const {title, fullurl} = response.data.query.pages[queryValues.pageid]
    return {
      title,
      url: fullurl
    }
  })

  const resolveUrlPromises = await Promise.all(mapUrls)
  return {
    embed: {
      color: '0x0099ff',
      author: {
        name: 'Wikipedia',
        icon_url: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
        url: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
      },
      fields: resolveUrlPromises.map((data: any) => {
        return {
          name: data.title,
          value: data.url
        }
      }),
      thumbnail: {
        url: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg'
      },
      timestamp: new Date(),
      footer: {
        text: `Search made with parameter ${queryParameter}`,
        icon_url: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg'
      }
    }
  }
}
