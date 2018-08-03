import fetch from 'node-fetch'

import { configBot } from '../config/config'

async function fetchGif(url) {
  const data = await fetch(url)
  return data.json()
}

export async function giphy(querySearch) {
  const { data } = await fetchGif(
    `http://api.giphy.com/v1/gifs/search?api_key=${
      configBot.giphyKey
    }&q=${querySearch}`
  )

  const embedUrls = data.map(list => ({ embed_url: list.embed_url }))
  const { embed_url } = embedUrls[Math.floor(Math.random() * embedUrls.length)]
  return embed_url
}
