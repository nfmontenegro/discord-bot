import fetch from 'node-fetch'

export const bip = async code => {
  const url = await `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
  return fetch(url)
    .then(res => res.json())
    .catch(err => err)
}
