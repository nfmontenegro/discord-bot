import axios from 'axios'

export default async (queryParameter: string): Promise<any> => {
  //TODO: refact array two parameters
  const response = await axios({
    url: `http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY_GIPHY}&q=${queryParameter}`,
    method: 'GET'
  })

  const randomIndex = Math.floor(Math.random() * response.data.data.length)
  return response.data.data[randomIndex].embed_url
}
