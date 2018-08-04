import { configBot } from '../config/config'
import { methodFetch } from '../helpers/fetch'

export async function giphy(querySearch) {
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${
    configBot.giphyKey
  }& q=${querySearch}`
  const { data } = await methodFetch(url)

  const embedUrls = data.map(list => ({ embed_url: list.embed_url }))
  const { embed_url } = embedUrls[Math.floor(Math.random() * embedUrls.length)]
  return embed_url
}
