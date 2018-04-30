import fetch from 'node-fetch'

export const rut = async digits => {
  const url = `https://api.rutify.cl/rut/${digits}`
  return fetch(url)
    .then(response => response.json())
    .catch(e => console.log(e))
}
