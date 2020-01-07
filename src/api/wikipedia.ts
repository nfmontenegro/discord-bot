import axios from 'axios'
import {join, has} from 'ramda'

import {Embed, Wikipedia} from '../interfaces'
import {embedMessage} from '../lib'

export default async (queryParameter): Promise<Embed> => {
  const response = await axios({
    method: 'GET',
    url: `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${queryParameter}`
  })

  if (!has('query', response.data)) {
    let errorMessage
    if (has('warning', response.data)) {
      errorMessage = response.data.warnings.search[0]
    }

    const embedMessageFields = {
      authorName: 'Wikipedia',
      authorIconUrl:
        'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
      authorUrl: 'https://es.wikipedia.org/wiki/Wikipedia:Portada',
      fields: [{name: 'Error', value: 'Page not found'}],
      thumbnailUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
      footerText: `Search  with parameter ${queryParameter}`,
      footerIconUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg'
    }

    return embedMessage(embedMessageFields)
  }

  const querySearch = response.data.query.pages

  const mapUrls = Object.values(querySearch).map(async (queryValues: any) => {
    const response = await axios({
      method: 'GET',
      url: `https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${queryValues.pageid}&inprop=url&format=json`
    })

    const {title, fullurl: url} = response.data.query.pages[queryValues.pageid]
    return {
      title,
      url
    }
  })

  const wikipediaUrls = await Promise.all(mapUrls)
  const mapWikipediaFields = wikipediaUrls.map((data: Wikipedia) => {
    const {title, url} = data
    return {
      name: title,
      value: url
    }
  })

  const embedMessageFields = {
    authorName: 'Wikipedia',
    authorIconUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
    authorUrl: 'https://es.wikipedia.org/wiki/Wikipedia:Portada',
    fields: mapWikipediaFields,
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
    footerText: `Search  with parameter ${queryParameter}`,
    footerIconUrl: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg'
  }

  return embedMessage(embedMessageFields)
}
