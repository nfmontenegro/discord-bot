import Youtube from 'youtube-node'

function requestYoutube(params) {
  return new Promise((resolve, reject) => {
    const youtube = new Youtube()
    youtube.setKey(process.env.YOUTUBE)

    youtube.search(params, 30, (error, data) => {
      if (error) {
        reject('No se pudo encontrar el video 📼')
      } else {
        resolve(data)
      }
    })
  })
}

export async function youtube(params) {
  try {
    const { items } = await requestYoutube(params)
    const videosId = items.map(item => item.id.videoId).filter(data => data)

    const randomVideo = videosId[Math.floor(Math.random() * videosId.length)]
    return `https://www.youtube.com/watch?v=${randomVideo}`
  } catch (err) {
    return err
  }
}
