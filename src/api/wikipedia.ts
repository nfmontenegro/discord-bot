import axios from 'axios'

import {Embed} from '../interfaces'

export default async (queryParameter: string): Promise<Embed> => {
  const response = await axios(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${queryParameter}`
  )

  const querySearch = response.data.query.search
  //TODO: fix embed title
  return {
    embed: {
      color: '0x0099ff',
      title: 'Wikipedia',
      author: {
        name: 'Wikipedia',
        icon_url: 'https://pbs.twimg.com/profile_images/1018552942670966784/0Zflj6Y__400x400.jpg',
        url: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
      },
      fields: querySearch.map(query => {
        return {
          name: query.title,
          value: query.snippet
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
