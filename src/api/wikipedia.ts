import axios from 'axios'

import {Embed} from '../interfaces'

export default async (queryParameter: string): Promise<Embed> => {
  const response = await axios(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${queryParameter}`
  )

  const {title, snippet, id} = response.data.query.search[0]
  return {
    embed: {
      color: '0x0099ff',
      title,
      url: `https://es.wikipedia.org/?curid=${id}`,
      description: snippet,
      timestamp: new Date()
    }
  }
}
