import Youtube from 'youtube-node'

function requestYoutube(params) {
  return new Promise((resolve, reject) => {
    const youtube = new Youtube();
    youtube.setKey(process.env.YOUTUBE)

    youtube.search(params, 1, (error, data) => {
      if (error) {
        reject('No se pudo encontrar el video 📼')
      } else {
        const response = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`
        resolve(response)
      }
    })
  })
}

export async function youtube(params) {
  try {
    const search = await requestYoutube(params)
    return search
  } catch (err) {
    console.log('Youtube Error:', err)
  }
}

